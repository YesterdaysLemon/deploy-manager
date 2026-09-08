import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { buildServiceCampus, buildPocketPark, planServiceLot, planTownInfill, serviceDistrict } from '../client/service-town.js';
import { createPlotLayout } from '../client/city3d.js';

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

test('every campus fits its plot at all frontages and batches its draw objects',async()=>{
  const districts=['deploy-manager','caddy','valet','docker','galaxy-menu','aquarium','birds','herald','celegans','animator','portfolio','primary-db'];
  for(const id of districts)for(const [x,z] of [[4,1],[-4,1],[1,4],[1,-4]]) {
    const props=[];
    const model=await buildServiceCampus({id,x,z,kind:id==='primary-db'?'datastore':'route'},async(key)=>{props.push(key);return new THREE.Group();});
    const bounds=new THREE.Box3().setFromObject(model);
    assert.ok(bounds.min.x>=-2.48 && bounds.max.x<=2.48 && bounds.min.z>=-2.48 && bounds.max.z<=2.48,`${id} intrudes on kerb`);
    assert.ok(bounds.max.y<5.5);
    let draws=0;model.traverse(node=>{if(node.isMesh)draws++;});assert.ok(draws<=12,`${id}: ${draws} draws`);
    assert.ok(props.includes('town/planter') && props.includes('town/stones'));
  }
});

test('parks use vacant land, respect a bounded budget and remain stable under topology reorder',()=>{
  const routes=Array.from({length:30},(_,i)=>({id:`service-${i}`,name:`Service ${i}`}));
  const layout=createPlotLayout({routes}),reordered=createPlotLayout({routes:[...routes].reverse()});
  const plan=planTownInfill(layout);
  assert.deepEqual(plan,planTownInfill(reordered));
  assert.ok(plan.length<=64);
  for(const {cell,neighbor} of plan){assert.ok(!layout.occupiedCellKeys.has(`${cell.col}:${cell.row}`));assert.ok(neighbor);}
  for(let variant=0;variant<5;variant++){
    const park=buildPocketPark({x:0,z:0,col:0,row:0},variant),bounds=new THREE.Box3().setFromObject(park);
    assert.ok(bounds.min.x>=-2.48 && bounds.max.x<=2.48 && bounds.min.z>=-2.48 && bounds.max.z<=2.48);
  }
});
