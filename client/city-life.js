import * as THREE from "three";
import { coastXAt } from "./ocean.js";

const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;
export const PORT_CYCLE = 120;
export function createHarborApproach(harbor,shoreX) {
  return new class extends THREE.Curve {
    getPoint(t,target=new THREE.Vector3()) {
      const z=lerp(harbor.z-62,harbor.z-1.8,t);
      const berthOffset=harbor.x+2.6-coastXAt(harbor.z-1.8,shoreX);
      return target.set(coastXAt(z,shoreX)+lerp(4.4,berthOffset,smoothProgress(t,.65,1)),.02,z);
    }
  }();
}
export function smoothProgress(time, start, end) {
  const t=clamp((time-start)/(end-start),0,1);return t*t*(3-2*t);
}

export function portSchedule(time) {
  const t=((time%PORT_CYCLE)+PORT_CYCLE)%PORT_CYCLE;
  return {t,phase:t<24?"arriving":t<46?"unloading":t<74?"delivering":t<106?"returning":"waiting",
    inbound:smoothProgress(t,0,24),outbound:smoothProgress(t,50,80),
    lift:smoothProgress(t,26,32),swing:smoothProgress(t,32,39),lower:smoothProgress(t,39,45),
    truckOut:smoothProgress(t,48,69),truckBack:smoothProgress(t,78,100)};
}

export function railSchedule(time, length, stationDistance, phase=0) {
  const dwell=8,travel=length/1.2,period=dwell+travel;
  const t=((time+phase*period)%period+period)%period;
  const progress=clamp((t-dwell)/travel,0,1);
  const distance=(stationDistance+(0.5-0.5*Math.cos(progress*Math.PI))*length)%length;
  return {distance,dwelling:t<dwell,dwellProgress:clamp(t/dwell,0,1),travelTime:Math.max(0,t-dwell),period};
}

export function warmVillageWindows(model, dusk) {
  model.traverse(node=>{
    if(!node.isMesh)return;
    const copies=(Array.isArray(node.material)?node.material:[node.material]).map(material=>{
      const copy=material.clone();delete copy.userData.deployManagerSharedAsset;
      copy.onBeforeCompile=shader=>{
        shader.uniforms.cityDusk=dusk;
        shader.fragmentShader="uniform float cityDusk;\n"+shader.fragmentShader;
        shader.fragmentShader=shader.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
          float windowMask = step(diffuseColor.r * 1.12, diffuseColor.b) * step(diffuseColor.g * 0.95, diffuseColor.b) * (1.0-step(0.32,max(diffuseColor.r,max(diffuseColor.g,diffuseColor.b))));
          totalEmissiveRadiance += vec3(0.65,0.28,0.055) * windowMask * cityDusk;
        `);
      };
      copy.customProgramCacheKey=()=>"village-windows-v1";
      return copy;
    });
    node.material=Array.isArray(node.material)?copies:copies[0];
  });
}

export function healthScenery(group) {
  const warning=new THREE.Group();warning.name="service-unavailable-barrier";
  const orange=new THREE.MeshStandardMaterial({color:0xd7773d,roughness:1});
  for(const x of [-.65,.65]) {
    const cone=new THREE.Mesh(new THREE.ConeGeometry(.14,.42,5),orange);cone.position.set(x,.21,-2.12);warning.add(cone);
  }
  const board=new THREE.Mesh(new THREE.BoxGeometry(1.15,.18,.07),new THREE.MeshStandardMaterial({color:0xeee0af}));
  board.position.set(0,.32,-2.12);warning.add(board);
  for(let i=0;i<4;i++) {
    const stripe=new THREE.Mesh(new THREE.BoxGeometry(.12,.18,.075),orange);stripe.position.set(-.42+i*.28,.32,-2.12);stripe.rotation.z=-.35;warning.add(stripe);
  }
  warning.visible=false;group.add(warning);group.userData.healthBarrier=warning;
}

export async function addPortLife(city, world, harbor, generation) {
  const [boat,truck]=await Promise.all([
    city.cloneAsset("watercraft/fishing",{width:.85,depth:1.85,height:1.1}),
    city.cloneAsset("cars/delivery",{width:.68,depth:1.4,height:.8}),
  ]);
  if(generation!==city.worldGeneration)return;
  const actors=new THREE.Group();actors.name="ambient-port-shift";world.add(actors);city.storyActors.push(actors);
  actors.add(boat,truck);
  const metal=new THREE.MeshStandardMaterial({color:0xe5b64f,roughness:.85});
  const boom=new THREE.Group();boom.position.set(harbor.x-.1,0,harbor.z-1.8);actors.add(boom);
  const jib=new THREE.Mesh(new THREE.BoxGeometry(4,.12,.12),metal);jib.position.set(1.2,3,0);boom.add(jib);
  const weight=new THREE.Mesh(new THREE.BoxGeometry(.48,.36,.35),new THREE.MeshStandardMaterial({color:0x4e6967}));weight.position.set(-.5,2.85,0);boom.add(weight);
  const cable=new THREE.Mesh(new THREE.CylinderGeometry(.014,.014,1,5),new THREE.MeshStandardMaterial({color:0x3d4f4d}));actors.add(cable);
  const crate=new THREE.Mesh(new THREE.BoxGeometry(.4,.38,.4),new THREE.MeshStandardMaterial({color:0xb98548}));actors.add(crate);
  const courier=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(.065,.17,2,5),new THREE.MeshStandardMaterial({color:0xe1b24c}));body.position.y=.2;courier.add(body);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.066,6,4),new THREE.MeshStandardMaterial({color:0xd1a17a}));head.position.y=.4;courier.add(head);actors.add(courier);
  const route=createHarborApproach(harbor,city.perimeter.coast.shoreX);
  city.portLife={actors,boat,truck,boom,cable,crate,courier,route,harbor};
}

export function updatePortLife(life,time,waterHeight) {
  if(!life)return;
  const {boat,truck,boom,cable,crate,courier,route,harbor:h}=life,s=portSchedule(time);
  const boatProgress=s.t<50?s.inbound:1-s.outbound;
  const position=route.getPointAt(boatProgress),tangent=route.getTangentAt(Math.min(.9999,boatProgress));
  boat.position.copy(position);boat.position.y+=waterHeight(position.x,position.z,time);
  boat.rotation.y=Math.atan2(tangent.x,tangent.z)+(s.t>=50?Math.PI:0);
  const truckX=lerp(h.x-2.55,-11,s.t<74?s.truckOut:1-s.truckBack);
  truck.position.set(truckX,.2,h.z+(s.t>=78&&s.t<100?.42:-.42));
  truck.rotation.y=s.t>=78&&s.t<100?Math.PI/2:-Math.PI/2;
  if(s.t>=74&&s.t<78){const turn=(s.t-74)/4;truck.position.set(-11-.8*Math.sin(turn*Math.PI),.2,h.z-.42*Math.cos(turn*Math.PI));truck.rotation.y=Math.atan2(-.8*Math.cos(turn*Math.PI),.42*Math.sin(turn*Math.PI));}
  if(s.t>=100&&s.t<106){const turn=smoothProgress(s.t,100,106);truck.position.set(h.x-2.55+.8*Math.sin(turn*Math.PI),.2,h.z+.42*Math.cos(turn*Math.PI));truck.rotation.y=Math.atan2(.8*Math.cos(turn*Math.PI),-.42*Math.sin(turn*Math.PI));}
  truck.position.y+=.17*smoothProgress(truck.position.x,h.x-2.5,h.x-1.5);
  const target=new THREE.Vector3(h.x-2.55,.96,h.z-.42),pickup=new THREE.Vector3(h.x+2.6,.93,h.z-1.8);
  const hook=pickup.clone().lerp(target,s.swing);
  hook.y=lerp(.93,2.55,s.lift)-s.lower*1.59;
  if(s.t<26)hook.y=lerp(2.55,.93,smoothProgress(s.t,24,26));
  if(s.t>=46)hook.y=lerp(.96,2.55,smoothProgress(s.t,46,48));
  if(s.t>=48)hook.lerp(pickup.clone().setY(2.55),smoothProgress(s.t,48,56));
  boom.rotation.y=-Math.atan2(hook.z-boom.position.z,hook.x-boom.position.x);
  cable.position.set(hook.x,(3+hook.y)/2,hook.z);cable.scale.y=3-hook.y;
  crate.visible=s.t<110;
  if(s.t<26){crate.position.copy(boat.position).add(new THREE.Vector3(0,.72,0));}
  else if(s.t<46)crate.position.copy(hook).add(new THREE.Vector3(0,-.19,0));
  else if(s.t<70)crate.position.copy(truck.position).add(new THREE.Vector3(0,.57,0));
  else crate.position.set(lerp(-11,-11.6,smoothProgress(s.t,70,74)),lerp(.77,.35,smoothProgress(s.t,70,74)),lerp(h.z-.42,h.z+2.7,smoothProgress(s.t,70,74)));
  courier.visible=s.t>=70&&s.t<78;courier.position.set(crate.position.x+.2,.18,crate.position.z);courier.scale.setScalar(1-smoothProgress(s.t,76,78));
  life.phase=s.phase;
}

export function addGulls(city,world,harbor) {
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute("position",new THREE.Float32BufferAttribute([0,0,0,.32,.04,-.04,.1,0,.12],3));geometry.computeVertexNormals();
  const wings=new THREE.InstancedMesh(geometry,new THREE.MeshBasicMaterial({color:0xf7f0d8,side:THREE.DoubleSide}),12);
  wings.boundingSphere=new THREE.Sphere(new THREE.Vector3(harbor.x+4,6.6,harbor.z-4),7);
  wings.name="harbor-gulls";world.add(wings);city.storyActors.push(wings);city.gulls={wings,harbor};
}

export function updateGulls(gulls,time) {
  if(!gulls)return;
  const dummy=new THREE.Object3D(),h=gulls.harbor;
  for(let i=0;i<6;i++)for(let side=0;side<2;side++) {
    const angle=time*(.065+i*.004)+i*1.17,r=3+i*.4;
    dummy.position.set(h.x+4+Math.cos(angle)*r,6+i*.24+Math.sin(angle*2)*.3,h.z-4+Math.sin(angle)*r);
    dummy.rotation.set(0,-angle,Math.sin(time*3+i)*.24*(side?1:-1));dummy.scale.set(side?-1:1,1,1);dummy.updateMatrix();gulls.wings.setMatrixAt(i*2+side,dummy.matrix);
  }
  gulls.wings.instanceMatrix.needsUpdate=true;
}
