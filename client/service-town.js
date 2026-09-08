import * as THREE from "three";
import { batchStaticScenery } from "./render-batch.js";


// Architecture is an illustration of public service identity, never a resource
// utilization measurement. Identity seeds survive health polls and route ordering.
export const TOWN_ASSETS = Object.freeze(Object.fromEntries([
  ...["c", "f", "i", "k", "p", "u"].map(letter => [`town/house-${letter}`, `suburban/building-type-${letter}.glb`]),
  ["town/planter", "suburban/planter.glb"],
  ["town/stones", "suburban/path-stones-long.glb"],
  ["town/fence", "suburban/fence-low.glb"],
  ["town/parasol-a", "commercial/detail-parasol-a.glb"],
  ["town/parasol-b", "commercial/detail-parasol-b.glb"],
  ["town/awning", "commercial/detail-awning.glb"],
].map(([key, path]) => [key, `/assets/kenney/${path}`])));

export function townHash(value) {
  let hash = 2166136261;
  for (const character of String(value)) hash = Math.imul(hash ^ character.codePointAt(0), 16777619);
  return hash >>> 0;
}

export function serviceDistrict(entity) {
  if (entity.kind === "datastore") return "reservoir";
  if (entity.id === "deploy-manager") return "townhall";
  if (entity.id === "caddy" || /valet|auth|gateway/.test(entity.id)) return "gatehouse";
  if (entity.id === "docker" || entity.id === "git") return "workshop";
  const identity = `${entity.id} ${entity.name} ${entity.serviceKind ?? ""}`.toLowerCase();
  if (/galaxy|space|observatory/.test(identity)) return "observatory";
  if (/fish|aquarium|water/.test(identity)) return "aquarium";
  if (/bird|aviary|bonsai|garden/.test(identity)) return "conservatory";
  if (/herald|castle/.test(identity)) return "castle";
  if (/worm|celegans|elegans|lab|agar/.test(identity)) return "laboratory";
  if (/animat|frame|studio|art/.test(identity)) return "studio";
  if (/hell|factory|build|worker/.test(identity)) return "workshop";
  return "village";
}

export function planServiceLot(entity) {
  const seed = townHash(entity.id);
  const district = serviceDistrict(entity);
  const house = ["c", "f", "i", "k", "p", "u"][seed % 6];
  // Every plot fronts an existing street toward the town center.
  const rotation = Math.abs(entity.x ?? 0) > Math.abs(entity.z ?? 0)
    ? (entity.x > 0 ? -Math.PI / 2 : Math.PI / 2)
    : (entity.z > 0 ? Math.PI : 0);
  const buildings={townhall:'commercial/skyscraper-e',gatehouse:'commercial/building-a',
    workshop:entity.modelKey?.startsWith('industrial/')?entity.modelKey:'industrial/building-p',
    observatory:'commercial/building-n',aquarium:'suburban/building-h',conservatory:'suburban/building-r',
    castle:'town/house-u',laboratory:'industrial/building-c',studio:'town/house-i',
    village:`town/house-${house}`,reservoir:'industrial/tank'};
  return { seed, district, house, rotation, buildingKey:buildings[district],
    height: entity.id==='deploy-manager'?6.4:4.4,
    props: ["town/planter", "town/stones", "town/fence", seed % 2 ? "town/parasol-a" : "town/parasol-b"],
  };
}

export function planTownInfill(layout, reserved = 3) {
  const cells=layout.cells.filter(cell=>!layout.occupiedCellKeys.has(`${cell.col}:${cell.row}`));
  return cells.slice(reserved,reserved+64).map(cell=>{
    const nearest=[...layout.entities].sort((a,b)=>Math.hypot(a.x-cell.x,a.z-cell.z)-Math.hypot(b.x-cell.x,b.z-cell.z)||a.id.localeCompare(b.id))[0];
    const seed=townHash(`park:${cell.x}:${cell.z}`);
    const district=nearest?serviceDistrict(nearest):"village";
    const variant=district==="conservatory"?1:district==="aquarium"?0:seed%5;
    return {cell,seed,variant,neighbor:nearest?.id??null};
  });
}

export function footprintsOverlap(a,b,gap=.12) {
  return a.minX < b.maxX+gap && a.maxX > b.minX-gap && a.minZ < b.maxZ+gap && a.maxZ > b.minZ-gap;
}

function footprint(object) {
  const b=new THREE.Box3().setFromObject(object);
  return {minX:b.min.x,maxX:b.max.x,minZ:b.min.z,maxZ:b.max.z};
}

// All placed objects are original Kenney models. Reserve their full measured
// bounds, including roof eaves and tree canopies, plus a pedestrian corridor.
async function placeAsset(group, cloneAsset, spec, occupied, required=false) {
  const model=await cloneAsset(spec.key,{width:spec.w,depth:spec.d,height:spec.h});
  model.position.set(spec.x,0,spec.z);model.rotation.y=spec.rotation??0;
  const bounds=footprint(model);
  const inside=bounds.minX>=-2.45 && bounds.maxX<=2.45 && bounds.minZ>=-2.45 && bounds.maxZ<=2.45;
  if(!inside || occupied.some(other=>footprintsOverlap(bounds,other))) {
    if(required)throw new Error(`Building ${spec.key} does not fit its reserved plot`);
    return null;
  }
  group.add(model);occupied.push({...bounds,key:spec.key});return model;
}

export async function buildServiceCampus(entity,cloneAsset) {
  const plan=planServiceLot(entity),group=new THREE.Group(),occupied=[];
  group.name=`campus:${entity.id}:${plan.buildingKey}`;
  const building=await placeAsset(group,cloneAsset,{key:plan.buildingKey,w:3.25,d:2.85,h:plan.height,x:0,z:-.35},occupied,true);
  const front=footprint(building).maxZ;
  const entrance={minX:-.42,maxX:.42,minZ:front+.14,maxZ:2.45,key:'reserved entrance'};
  // This corridor stays empty: no decorative path crosses an authored doorstep,
  // driveway, garage or wall. The original building keeps its own entrance.
  occupied.push(entrance);
  const props=[
    {key:'town/fence',w:3.6,d:.12,h:.46,x:0,z:-2.27},
    {key:'suburban/tree-small',w:.55,d:.55,h:1.45,x:-2.08,z:-.7},
    {key:'suburban/tree-small',w:.55,d:.55,h:1.2,x:2.08,z:.25},
    {key:plan.props[3],w:.95,d:.95,h:1.1,x:1.55,z:1.72},
    {key:'town/planter',w:.6,d:.5,h:.58,x:-1.5,z:1.8},
  ];
  // Cargo has reserved slots too; it can never be layered over a factory.
  if(entity.id==='docker')props.splice(3,1,{key:'industrial/container-a',w:.85,d:.9,h:.65,x:1.55,z:1.72});
  for(const spec of props)await placeAsset(group,cloneAsset,spec,occupied);
  group.userData={district:plan.district,buildingKey:plan.buildingKey,footprints:occupied};
  batchStaticScenery(group);group.rotation.y=plan.rotation;
  return group;
}

export async function buildPocketPark(cell,index,cloneAsset) {
  const group=new THREE.Group(),occupied=[];
  group.name=`kenney-garden:${cell.col}:${cell.row}`;
  await placeAsset(group,cloneAsset,{key:'town/stones',w:.6,d:4.6,h:.08,x:0,z:0},occupied,true);
  const placements=(index===2 || index===4)
    ? [{key:index===2?'town/house-f':'town/house-c',w:1.6,d:2.5,h:2.8,x:-1.3,z:-.4},
       {key:index===2?'town/house-p':'town/house-k',w:1.6,d:2.5,h:2.8,x:1.3,z:-.4},
       {key:'town/planter',w:.65,d:.5,h:.5,x:-1.3,z:1.9},
       {key:'suburban/tree-small',w:.75,d:.75,h:1.4,x:1.3,z:1.9}]
    : index%2===0
    ? [{key:'suburban/tree',w:1.1,d:1.1,h:2.2,x:-1.3,z:-1.1},
       {key:'suburban/tree-small',w:.85,d:.85,h:1.5,x:1.35,z:1.15},
       {key:'town/parasol-a',w:1,d:1,h:1.1,x:1.35,z:-1.15},
       {key:'town/planter',w:.8,d:.5,h:.6,x:-1.3,z:1.25}]
    : [-1.35,1.35].flatMap(x=>[-1.3,0,1.3].map(z=>({key:index===3?'suburban/tree-small':'town/planter',w:.8,d:.72,h:index===3?1.5:.65,x,z})));
  for(const spec of placements)await placeAsset(group,cloneAsset,spec,occupied);
  group.userData.footprints=occupied;
  batchStaticScenery(group);group.position.set(cell.x,.12,cell.z);return group;
}
