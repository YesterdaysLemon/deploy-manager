import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { readFile } from 'node:fs/promises';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { buildServiceCampus, buildPocketPark, planServiceLot, planTownInfill, serviceDistrict, footprintsOverlap } from '../client/service-town.js';
import { streetTile } from '../client/town-streets.js';
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
  assert.ok(plan.length<=2);
  for(const {cell,neighbor} of plan){assert.ok(!layout.occupiedCellKeys.has(`${cell.col}:${cell.row}`));assert.ok(neighbor);}
  for(let variant=0;variant<5;variant++){
    const park=await buildPocketPark({x:0,z:0,col:0,row:0},variant,cloneMeasuredAsset),bounds=new THREE.Box3().setFromObject(park);
    assert.ok(bounds.min.x>=-2.48 && bounds.max.x<=2.48 && bounds.min.z>=-2.48 && bounds.max.z<=2.48);
    assertClear(park.userData.footprints);
  }
});


test('growing towns have sparse blocks and a connected street graph around every service',()=>{
  for(const count of [10,30,60]) {
    const routes=Array.from({length:count},(_,i)=>({id:`app-${i}`}));
    const layout=createPlotLayout({routes});
    assert.ok(layout.activeCells.length<=layout.entities.length+5);
    assert.ok(layout.activeCells.length<layout.cells.length || layout.cells.length-layout.entities.length<=5);
    const network=layout.streets, seen=new Set(), queue=[network.nodes.keys().next().value];
    while(queue.length){const id=queue.pop();if(seen.has(id))continue;seen.add(id);queue.push(...network.nodes.get(id).neighbors);}
    assert.equal(seen.size,network.nodes.size);
    for(const {a,b} of network.edges) {
      assert.ok(Math.abs(a.x-b.x)<.001 || Math.abs(a.z-b.z)<.001);
      for(const cell of layout.activeCells)for(let i=0;i<=8;i++) {
        const x=a.x+(b.x-a.x)*i/8,z=a.z+(b.z-a.z)*i/8;
        assert.ok(Math.abs(x-cell.x)>=3.48 || Math.abs(z-cell.z)>=3.48,'street crosses a block');
      }
    }
    assert.ok(network.junctions.some(j=>Math.abs(j.x)>7 || Math.abs(j.z)>7));
    assert.ok(network.junctions.filter(j=>j.signaled).every(j=>j.neighbors.size===4));
  }
});


test('street tiles expose actual Kenney road ports toward connected neighbors',async()=>{
  const layout=createPlotLayout({routes:Array.from({length:25},(_,i)=>({id:`app-${i}`}))});
  const ports=new Map();
  for(const node of layout.streets.nodes.values()) {
    const tile=streetTile(node,layout.streets);
    if(!ports.has(tile.key)) {
      const bytes=await readFile(new URL(`../public${ASSET_URLS[tile.key]}`,import.meta.url));
      const length=bytes.readUInt32LE(12),doc=JSON.parse(bytes.toString('utf8',20,20+length));
      const accessor=doc.accessors[doc.meshes[0].primitives[0].attributes.POSITION],view=doc.bufferViews[accessor.bufferView];
      const positions=Array.from({length:accessor.count},(_,i)=>[0,1,2].map(j=>bytes.readFloatLE(28+length+(view.byteOffset??0)+(accessor.byteOffset??0)+i*(view.byteStride??12)+j*4)));
      // Open asphalt ports have y=.01 vertices at the middle of a tile edge;
      // a closed kerb has only y=.02 geometry there. Read the source GLB.
      const open=[[-1,0],[1,0],[0,-1],[0,1]].filter(([x,z])=>positions.some(p=>Math.abs(p[1]-.01)<.001 && (x?Math.abs(p[0]-x*.5)<.001 && Math.abs(p[2])<.1:Math.abs(p[2]-z*.5)<.001 && Math.abs(p[0])<.1)));
      ports.set(tile.key,open);
    }
    const transformed=ports.get(tile.key).map(([x,z])=>[Math.round(x*Math.cos(tile.rotation)+z*Math.sin(tile.rotation)),Math.round(-x*Math.sin(tile.rotation)+z*Math.cos(tile.rotation))]);
    for(const id of node.neighbors){const p=layout.streets.nodes.get(id);assert.ok(transformed.some(([x,z])=>x===Math.sign(p.x-node.x)&&z===Math.sign(p.z-node.z)),`${tile.key} blocks ${id}`);}
    if(node.neighbors.size>1)assert.equal(transformed.length,node.neighbors.size);
  }
});
