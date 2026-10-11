#!/usr/bin/env node
// Manual root-plane helper. Uses the registered app only, never a caller command.
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {acquireAppLock} from './restic-service-backup.mjs';
import {protectedPath,atomicRecord,validateBackupReceipt,normalizeRuntime} from './stateful-service.mjs';
export async function coldBackup(ops) {
  await ops.preflight(); // Offline Tome must fail before stopping the writer.
  const original = await ops.inspect();
  if (!original?.running) throw Error('Registered service must be running before a cold backup');
  await ops.journal(original);
  let receipt;
  try {
    await ops.stop();
    if ((await ops.inspect())?.running) throw Error('Writer did not stop');
    receipt = validateBackupReceipt(await ops.snapshot());
    await ops.save(receipt,original);
    return receipt;
  } finally {
    const current = await ops.inspect();
    if (!current || current.image !== original.image) throw Error('Service identity changed; explicit recovery required');
    if (!current.running) await ops.start();
    if (!(await ops.inspect())?.running) throw Error('Backup finished but service restart requires recovery');
    await ops.clearJournal();
  }
}
async function main(appId) {
  if (process.platform !== 'linux' || process.getuid() !== 0 || !/^[a-z0-9][a-z0-9_-]{0,63}$/.test(appId || '')) throw Error('Root Linux and one registered app ID required');
  protectedPath(fileURLToPath(import.meta.url));
  const runtimeFile=`/etc/deploy-manager/runtime/${appId}.json`;
  const runtime=normalizeRuntime(JSON.parse(fs.readFileSync(protectedPath(runtimeFile),'utf8')));
  const appEnv=fs.readFileSync(protectedPath(`/etc/deploy-manager/apps/${appId}.env`),'utf8');
  const lines=appEnv.split('\n').filter(line=>/^CONTAINER_NAME=/.test(line));
  const match=lines.length===1 && /^CONTAINER_NAME=(?:"([a-z0-9][a-z0-9_-]{0,63})"|'([a-z0-9][a-z0-9_-]{0,63})'|([a-z0-9][a-z0-9_-]{0,63}))\r?$/.exec(lines[0]);
  if (!match) throw Error('Registered container identity is not a literal');
  const container=match[1]||match[2]||match[3],release=acquireAppLock(appId);
  const work=`/var/lib/deploy-manager-backup/${appId}`;
  protectedPath('/var/lib',true);
  for (const directory of ['/var/lib/deploy-manager-backup',work]) {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory,{mode:0o700});
    protectedPath(directory,true);
  }
  const journal=`${work}/cold-backup.json`;
  const run=(command,args,inheritLock=false)=>new Promise((resolve,reject)=>{
    const stdio=inheritLock?['ignore','pipe','ignore',...Array(6).fill('ignore'),release.fd]:['ignore','pipe','ignore'];
    const child=spawn(command,args,{stdio,env:{PATH:'/usr/local/bin:/usr/bin:/bin',HOME:'/root'},timeout:900000});let result='';
    child.stdout.on('data',chunk=>{result+=chunk;if(result.length>65536)child.kill('SIGKILL');});
    child.once('error',()=>reject(Error('Cold backup command unavailable')));
    child.once('close',code=>code===0?resolve(result.trim()):reject(Error('Cold backup command failed; consult the protected recovery journal')));
  });
  const inspect=async()=>{try{return JSON.parse(await run('docker',['inspect','--format','{"image":{{json .Image}},"running":{{json .State.Running}}}',container]));}catch{return null;}};
  const hook=operation=>run(protectedPath(runtime.backupHook),[operation,appId,runtimeFile,container,''],true).then(JSON.parse);
  try {
    if (fs.existsSync(journal)) {
      const prior=JSON.parse(fs.readFileSync(protectedPath(journal),'utf8')),current=await inspect();
      if(prior.container!==container || !current || current.image!==prior.image)throw Error('Interrupted backup service identity changed; explicit recovery required');
      if(!current.running)await run('docker',['start',container]);
      if(!(await inspect())?.running)throw Error('Interrupted backup restart failed');
      clearJournal();
    }
    const started=Date.now();
    const result=await coldBackup({inspect,preflight:async()=>{const ready=await hook('preflight');if(!ready.ready||!ready.encrypted||!ready.offHost)throw Error('Verified offhost repository unavailable');},
      journal:async state=>atomicRecord(journal,{container,image:state.image,startedAt:new Date().toISOString()}),
      stop:()=>run('docker',['stop','--time',String(runtime.stopTimeoutSeconds),container]),start:()=>run('docker',['start',container]),
      snapshot:()=>hook('snapshot'),save:async(receipt,state)=>atomicRecord(`${work}/freshness.json`,{...receipt,image:state.image,completedAt:new Date().toISOString(),elapsedMs:Date.now()-started}),
      clearJournal:async()=>clearJournal()});
    process.stdout.write(JSON.stringify(result)+'\n');
  } finally {release();}
  function clearJournal() {
    fs.unlinkSync(journal);
    const fd=fs.openSync(work,'r');
    try {fs.fsyncSync(fd);} finally {fs.closeSync(fd);}
  }
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv[2]).catch(()=>{process.stderr.write('Cold backup failed; consult the protected freshness and recovery records. Verify service health without exposing credentials.\n');process.exitCode=1;});
