import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { readFile } from 'node:fs/promises';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { buildServiceCampus, buildPocketPark, planServiceLot, planTownInfill, serviceDistrict, footprintsOverlap } from '../client/service-town.js';
import { createPlotLayout, ASSET_URLS } from '../client/city3d.js';

// Parse actual authored GLB geometry. Strip material references only so Node
// can measure the models without a browser image decoder or fake empty groups.
globalThis.ProgressEvent ??= class extends Event { constructor(type,init={}){super(type);Object.assign(this,init);} };
const models=new Map();
async function cloneMeasuredAsset(key,fit) {
  if(!models.has(key))models.set(key,(async()=>{
    const bytes=await readFile(new URL(`../public${ASSET_URLS[key]}`,import.meta.url));
    const jsonLength=bytes.readUInt32LE(12),doc=JSON.parse(bytes.toString('utf8',20,20+jsonLength));
    const binStart=20+jsonLength,binLength=bytes.readUInt32LE(binStart);
    doc.buffers[0].uri=`data:application/octet-stream;base64,${bytes.subarray(binStart+8,binStart+8+binLength).toString('base64')}`;
    for(const mesh of doc.meshes)for(const primitive of mesh.primitives)delete primitive.material;
    delete doc.materials;delete doc.textures;delete doc.images;
    return (await new GLTFLoader().parseAsync(JSON.stringify(doc),'' )).scene;
  })());
  const model=(await models.get(key)).clone(true),bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
  model.position.x-=center.x;model.position.z-=center.z;model.position.y-=bounds.min.y;
  const wrapper=new THREE.Group();wrapper.add(model);
  wrapper.scale.setScalar(Math.min(fit.width/size.x,fit.depth/size.z,fit.height/size.y));return wrapper;
}

function assertClear(footprints) {
  for(let i=0;i<footprints.length;i++)for(let j=i+1;j<footprints.length;j++){
    assert.equal(footprintsOverlap(footprints[i],footprints[j],.119),false,`${footprints[i].key} overlaps ${footprints[j].key}`);
  }
}

test('public service identity produces distinct architecture without reacting to health polls',()=>{
  const identities={ 'deploy-manager':'townhall',caddy:'gatehouse',valet:'gatehouse',docker:'workshop',
    'galaxy-menu':'observatory',aquarium:'aquarium',birds:'conservatory',herald:'castle',celegans:'laboratory',animator:'studio',portfolio:'village'};
  for(const [id,district] of Object.entries(identities)) {
    const entity={id,x:3.485,z:-3.485};
    assert.equal(serviceDistrict(entity),district);
    assert.deepEqual(planServiceLot({...entity,status:'healthy'}),planServiceLot({...entity,status:'unhealthy'}));
  }
  assert.equal(serviceDistrict({id:'primary-db',kind:'datastore'}),'reservoir');
});

test('actual Kenney buildings and props fit all frontages without collisions',async()=>{
  const districts=['deploy-manager','caddy','valet','docker','galaxy-menu','aquarium','birds','herald','celegans','animator','portfolio','primary-db'];
  for(const id of districts)for(const [x,z] of [[4,1],[-4,1],[1,4],[1,-4]]) {
    const model=await buildServiceCampus({id,x,z,kind:id==='primary-db'?'datastore':'route'},cloneMeasuredAsset);
    const bounds=new THREE.Box3().setFromObject(model);
    assert.ok(bounds.min.x>=-2.48 && bounds.max.x<=2.48 && bounds.min.z>=-2.48 && bounds.max.z<=2.48,`${id} intrudes on kerb`);
    assert.ok(bounds.max.y<=6.401);
    assert.ok(ASSET_URLS[model.userData.buildingKey]);
    assert.ok(model.userData.footprints.length>=4);
    assertClear(model.userData.footprints);
  }
});

test('Kenney gardens use vacant land and keep actual assets separated',async()=>{
  const routes=Array.from({length:30},(_,i)=>({id:`service-${i}`,name:`Service ${i}`}));
  const layout=createPlotLayout({routes}),reordered=createPlotLayout({routes:[...routes].reverse()});
  const plan=planTownInfill(layout);
  assert.deepEqual(plan,planTownInfill(reordered));
  assert.ok(plan.length<=64);
  for(const {cell,neighbor} of plan){assert.ok(!layout.occupiedCellKeys.has(`${cell.col}:${cell.row}`));assert.ok(neighbor);}
  for(let variant=0;variant<5;variant++){
    const park=await buildPocketPark({x:0,z:0,col:0,row:0},variant,cloneMeasuredAsset),bounds=new THREE.Box3().setFromObject(park);
    assert.ok(bounds.min.x>=-2.48 && bounds.max.x<=2.48 && bounds.min.z>=-2.48 && bounds.max.z<=2.48);
    assertClear(park.userData.footprints);
  }
});
