import * as THREE from "three";
import { batchStaticScenery } from "./render-batch.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

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
  const palette = [0xd47c62, 0x71a99c, 0xd9ae60, 0x8c9fbb, 0xae87a1][seed % 5];
  // Every plot fronts an existing street toward the town center.
  const rotation = Math.abs(entity.x ?? 0) > Math.abs(entity.z ?? 0)
    ? (entity.x > 0 ? -Math.PI / 2 : Math.PI / 2)
    : (entity.z > 0 ? Math.PI : 0);
  return { seed, district, house, palette, rotation,
    height: 1.65 + (seed % 4) * .24,
    trees: district === "conservatory" ? 5 : 3,
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

function builder(group, accent) {
  const colors = {wall:0xf4e5c5,roof:accent,trim:0xfcf3dc,wood:0x846454,glass:0x73bfc1,
    leaf:0x68a579,lightLeaf:0xb3c779,path:0xe1ceb0,metal:0x45666c,water:0x63bcbf,flower:0xe99baa};
  const materials = Object.fromEntries(Object.entries(colors).map(([key,color])=>{
    const material=new THREE.MeshStandardMaterial({color,roughness:key === "glass"?.3:.85});
    material.userData.townMaterial=true;return [key,material];
  }));
  const mesh = (geometry, material, x,y,z) => {
    const node = new THREE.Mesh(geometry,materials[material]);
    node.position.set(x,y,z);node.castShadow=true;node.receiveShadow=true;group.add(node);return node;
  };
  const box = (w,h,d,x,y,z,m="wall") => mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z);
  const cylinder = (r,h,x,y,z,m="wall",top=r,sides=16) => mesh(new THREE.CylinderGeometry(top,r,h,sides),m,x,y,z);
  const ball = (r,x,y,z,m="leaf",sy=1) => {const n=mesh(new THREE.IcosahedronGeometry(r,1),m,x,y,z);n.scale.y=sy;return n;};
  const dome = (r,x,y,z,m="roof") => mesh(new THREE.SphereGeometry(r,20,10,0,Math.PI*2,0,Math.PI/2),m,x,y,z);
  const roof = (w,h,d,x,y,z) => {
    const shape=new THREE.Shape();shape.moveTo(-w/2,0);shape.lineTo(0,h);shape.lineTo(w/2,0);shape.closePath();
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:false});geometry.translate(0,0,-d/2);
    return mesh(geometry,"roof",x,y,z);
  };
  const tree=(x,z,size=1)=>{cylinder(.075,.65*size,x,.33*size,z,"wood");ball(.42*size,x,.98*size,z,"leaf",1.35);ball(.28*size,x+.15,.86*size,z+.08,"lightLeaf");};
  const windows=(w,h,d,x,z)=>{
    for(let level=.6;level<h-.15;level+=.65) for(let col=-w/2+.35;col<w/2-.15;col+=.56){
      box(.25,.31,.035,x+col,level,z+d/2+.015,"glass");box(.25,.31,.035,x+col,level,z-d/2-.015,"glass");
    }
    for(let level=.6;level<h-.15;level+=.65)for(let col=-d/2+.35;col<d/2-.15;col+=.56){
      box(.035,.31,.25,x+w/2+.015,level,z+col,"glass");box(.035,.31,.25,x-w/2-.015,level,z+col,"glass");
    }
  };
  return {mesh,box,cylinder,ball,dome,roof,tree,windows,materials};
}

// Bake the small procedural palette into vertex colors. One matte draw and one
// glass draw per campus replace dozens of separately colored primitive draws.
function batchTownGeometry(group) {
  group.updateMatrixWorld(true);
  const inverse=group.matrixWorld.clone().invert(),buckets=new Map();
  group.traverse(node=>{
    if(!node.isMesh || !node.material?.userData.townMaterial)return;
    const roughness=node.material.roughness;
    if(!buckets.has(roughness))buckets.set(roughness,[]);
    buckets.get(roughness).push(node);
  });
  for(const [roughness,nodes] of buckets){
    const parts=nodes.map(node=>{
      const geometry=node.geometry.index?node.geometry.toNonIndexed():node.geometry.clone();
      geometry.applyMatrix4(inverse.clone().multiply(node.matrixWorld));
      const color=node.material.color,colors=new Float32Array(geometry.attributes.position.count*3);
      for(let i=0;i<colors.length;i+=3){colors[i]=color.r;colors[i+1]=color.g;colors[i+2]=color.b;}
      geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));return geometry;
    });
    const merged=mergeGeometries(parts);
    for(const part of parts)part.dispose();
    if(!merged)throw new Error('Unable to batch procedural town geometry');
    const draw=new THREE.Mesh(merged,new THREE.MeshStandardMaterial({vertexColors:true,roughness}));
    draw.castShadow=true;draw.receiveShadow=true;draw.name='town-palette-batch';
    for(const node of nodes){node.removeFromParent();node.geometry.dispose();}
    for(const material of new Set(nodes.map(n=>n.material)))material.dispose();
    group.add(draw);
  }
}

function landmark(group, plan) {
  const b=builder(group,plan.palette),{box,cylinder,ball,dome,roof,tree,windows,mesh}=b;
  const h=plan.height;
  if (["townhall","studio","laboratory","workshop"].includes(plan.district)) {
    box(2.15,h,1.65,-.28,h/2,-.25);roof(2.4,.75,1.94,-.28,h,-.25);windows(2.15,h,1.65,-.28,-.25);
    box(.4,.7,.045,-.28,.36,.59,"wood");
    box(.8,.62,1.08,1.13,.31,-.39);roof(1,.4,1.28,1.13,.62,-.39);
    if(plan.district==="townhall") {
      box(.85,3.75,.85,.42,1.875,-.4);roof(1.08,.65,1.08,.42,3.75,-.4);
      const clock=cylinder(.28,.045,.42,3.27,.05,"trim");clock.rotation.x=Math.PI/2;
      box(.025,.19,.055,.42,3.32,.095,"metal");box(.16,.025,.055,.49,3.27,.095,"metal");
    } else if (plan.district==="laboratory") {
      dome(.67,-.65,h+.39,-.25,"glass");cylinder(.035,.8,1.12,1.37,-.39,"metal");ball(.1,1.12,1.81,-.39,"roof");
    } else if (plan.district==="workshop") {
      cylinder(.18,2.75,1.22,1.375,-.75,"roof");cylinder(.23,.17,1.22,2.73,-.75,"trim");
    } else if (plan.district==="studio") {
      box(1.25,.55,.12,-.28,1.3,.67,"roof");
      for(let i=0;i<5;i++)ball(.055,-.8+i*.26,1.08,.76,"trim");
    }
  } else if (["observatory","aquarium","conservatory"].includes(plan.district)) {
    cylinder(1.23,1.05,-.28,.525,-.3,"wall");
    dome(1.29,-.28,1.05,-.3,plan.district==="observatory"?"roof":"glass");
    cylinder(1.3,.1,-.28,1.06,-.3,"trim");
    for(let i=0;i<8;i++) {
      const angle=i*Math.PI/4;
      cylinder(.055,1.04,-.28+Math.cos(angle)*1.22,.56,-.3+Math.sin(angle)*1.22,"trim");
    }
    if(plan.district==="observatory") {
      const scope=cylinder(.17,1.1,-.28,2.23,-.12,"metal");scope.rotation.x=.75;
      ball(.3,-.28,1.95,-.3,"trim");
    } else {
      for(let meridian=0;meridian<5;meridian++) {
        const points=[];
        for(let step=0;step<=12;step++){
          const theta=step*Math.PI/12,angle=meridian*Math.PI/5;
          points.push(new THREE.Vector3(-.28+Math.cos(theta)*Math.cos(angle)*1.3,1.05+Math.sin(theta)*1.3,-.3+Math.cos(theta)*Math.sin(angle)*1.3));
        }
        mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),16,.026,5,false),"trim",0,0,0);
      }
      for(let i=0;i<4;i++)ball(.25,-.95+i*.43,.83,-.35,"leaf");
      dome(.62,1.26,.48,.18,"glass");cylinder(.6,.48,1.26,.24,.18);
    }
  } else if (plan.district==="castle" || plan.district==="gatehouse") {
    box(1.8,1.35,1.25,0,.675,-.45);roof(2.04,.65,1.5,0,1.35,-.45);
    for(const x of [-1.13,1.13]){
      cylinder(.43,2.35,x,1.175,-.35);cylinder(.58,.85,x,2.775,-.35,"roof",0);
      box(.17,.45,.045,x,1.65,.085,"glass");
    }
    box(.65,.75,.045,0,.38,.2,"wood");
    const arch=mesh(new THREE.TorusGeometry(.34,.10,6,12,Math.PI),"trim",0,.74,.24);
    arch.rotation.z=0;
    cylinder(.025,.8,1.13,3.53,-.35,"metal");box(.46,.25,.035,1.34,3.73,-.35,"roof");
  } else if (plan.district==="reservoir") {
    for(const x of [-.85,.85]){
      for(const z of [-.65,.65])cylinder(.08,1.3,x,.65,z,"wood");
      cylinder(.68,1.15,x,1.68,0,"glass");dome(.71,x,2.25,0,"roof");
    }
  }
  // Human-scale, asymmetric gardens leave the front door and streets clear.
  for(let i=0;i<plan.trees;i++) {
    const x=i<2?-1.92:1.9,z=i<2?-.9+i*1.6:-1.48+(i-2)*.85;
    tree(x,z,.72+(plan.seed+i)%3*.12);
  }
  for(const x of [-1.3,1.32]) {
    box(.56,.14,.38,x,.07,1.8,"wood");
    for(let j=0;j<3;j++)ball(.105,x-.18+j*.18,.2,1.8,"flower");
  }
  box(.43,.035,1.35,0,.025,1.47,"path");
  group.userData.district=plan.district;
  return b;
}

export async function buildServiceCampus(entity, cloneAsset) {
  const plan=planServiceLot(entity),group=new THREE.Group();
  group.name=`campus:${entity.id}:${plan.district}`;
  landmark(group,plan);
  // Actual curated Kenney pieces, with original proportions and palette textures.
  const specs=[
    {key:"town/planter",x:-1.17,z:1.2,w:.52,d:.4,h:.6},
    {key:"town/stones",x:0,z:1.77,w:.42,d:1.1,h:.05},
    {key:"town/fence",x:-.9,z:-2.13,w:2.05,d:.13,h:.48},
    {key:plan.props[3],x:1.43,z:1.28,w:.88,d:.88,h:.95},
  ];
  if(plan.district==="village") specs.push({key:`town/house-${plan.house}`,x:-.18,z:-.35,w:2.9,d:2.4,h:3.2});
  if(plan.district==="studio") specs.push({key:"town/awning",x:-.28,z:.86,y:.9,w:1.45,d:.55,h:.38});
  await Promise.all(specs.map(async p=>{
    const prop=await cloneAsset(p.key,{width:p.w,depth:p.d,height:p.h});
    prop.position.set(p.x,p.y??.02,p.z);group.add(prop);
  }));
  // Merge within each interactive entity, preserving picking and release animation.
  batchTownGeometry(group);batchStaticScenery(group);
  group.rotation.y=plan.rotation;
  return group;
}

export function buildPocketPark(cell, index) {
  const group=new THREE.Group();group.name=`pocket-park:${cell.col}:${cell.row}`;
  const b=builder(group,0xd78978),{box,cylinder,ball,tree}=b;
  if(index===0) {
    cylinder(1,.1,0,.055,0,"path");cylinder(.79,.11,0,.12,0,"water");cylinder(.2,.36,0,.24,0,"trim");ball(.22,0,.51,0,"water");
  } else if(index===1) {
    for(const x of [-.9,.9]) for(const z of [-.65,.65]){
      box(.75,.1,.7,x,.05,z,"wood");for(let i=0;i<3;i++)ball(.16,x-.24+i*.24,.22,z,"flower");
    }
  } else if(index===2) {
    cylinder(1.03,.16,0,.1,0,"path",1.03,6);cylinder(1.18,.65,0,1.65,0,"roof",0,6);
    for(let i=0;i<6;i++){const a=i*Math.PI/3;cylinder(.055,1.25,Math.cos(a)*.82,.8,Math.sin(a)*.82,"wood");}
  } else if(index===3) {
    // A small orchard, with staggered trees instead of another building pad.
    for(const [x,z] of [[-.7,-.7],[.7,-.3],[-.65,.8],[.8,.95]])tree(x,z,.82);
  } else {
    // A little playground: timber swing frame and a sloping slide.
    for(const x of [-.72,.72]) {
      const post=cylinder(.055,1.55,x,.77,0,"wood");post.rotation.z=x*.12;
    }
    box(1.65,.09,.09,0,1.55,0,"wood");
    for(const x of [-.2,.2])cylinder(.016,.84,x,1.07,0,"metal");
    box(.52,.07,.27,0,.62,0,"roof");
    const slide=box(.42,.045,1.2,1.15,.48,-.7,"roof");slide.rotation.x=-.65;
    box(.55,.08,.42,1.15,.88,-1.28,"wood");
  }
  for(const [x,z] of [[-1.75,-1.45],[1.75,1.5],[-1.65,1.45]])tree(x,z,.9);
  for(const z of [-1.52,1.52]){box(.85,.1,.24,0,.3,z,"wood");box(.85,.28,.07,0,.48,z+.1,"wood");}
  box(.48,.028,4.8,0,.014,0,"path");
  batchTownGeometry(group);batchStaticScenery(group);group.position.set(cell.x,.12,cell.z);return group;
}
