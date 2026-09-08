import * as THREE from "three";
import { roadStrip } from "./transport.js";
import { addPortLife, addGulls, warmVillageWindows } from "./city-life.js";
import { createFrontage } from "./frontage.js";

// Decorative places are deliberately separate from the real service plot map.
// The same plan reserves level ground, places scenery, and routes its vehicles.
export function createRegionalPlan(perimeter, coastline) {
  const { bounds, rail, highway } = perimeter;
  const villageZ = bounds.maxZ + 9;
  const coastAt = (z) => coastline.getPoint(THREE.MathUtils.clamp(
    (z - perimeter.coast.minZ) / perimeter.coast.length, 0, 1,
  )).x;
  const harbor = { x: coastAt(villageZ), z: villageZ, width: 5.4, depth: 9.8 };
  const road = [
    [0, bounds.maxZ], [0, villageZ],
  ];
  const houses = [-8, -3.7, 4.2, 8.4].map((x, index) => ({
    x, z: villageZ + (index < 2 ? -3.2 : 3.3), radius: 2.25,
    key: ["suburban/building-b", "suburban/building-d", "suburban/building-e", "suburban/building-a"][index],
    rotation: index < 2 ? 0 : Math.PI,
  }));
  houses.push(
    {x:-12,z:villageZ-4,radius:2.25,key:"suburban/building-h",rotation:0},
    {x:-12,z:villageZ+4.2,radius:2.25,key:"suburban/building-r",rotation:Math.PI},
    {x:-7.6,z:villageZ+4.2,radius:2.25,key:"suburban/building-b",rotation:Math.PI},
  );
  const villageStreet = [[-11.5, villageZ], [harbor.x - 2.8, villageZ]];
  const station = { x: rail.x + 1.6, z: 0, radius: 1, length: 10.5 };
  const forecourtX=bounds.minX-2.4;
  const walks=[
    [[station.x+.55,-3],[forecourtX,-3],[forecourtX,villageZ],[-13.4,villageZ]],
    [[-9.9,villageZ-1.14],[harbor.x-2.8,villageZ-1.14]],
    [[-9.9,villageZ+1.14],[harbor.x-2.8,villageZ+1.14]],
  ];
  return {
    harbor, houses, station, walks,
    roads: [road, villageStreet, [[0, highway.z], [0, bounds.minZ]]],
    pads: [...houses, ...[-4,0,4].map(z=>({x:station.x,z,radius:1})), {x:-11.5,z:villageZ,radius:2}, { x: harbor.x - 1.65, z: harbor.z, radius: 4.8 }],
  };
}

export function distanceToRegionalSite(x, z, plan) {
  if (!plan) return Infinity;
  return Math.min(...plan.pads.map((site) => Math.hypot(x - site.x, z - site.z) - site.radius));
}

// Synchronous car-following: no passing through the vehicle ahead, even when
// the frame rate drops. The offscreen ends join only for scheduling purposes.
export function advanceLaneTraffic(items, delta) {
  if (!items.length || delta <= 0) return;
  const steps = items.map((item) => {
    const length = item.curve.getLength();
    const distance = item.distance ?? item.offset * length;
    const sign = Math.sign(item.speed);
    let clearance = length;
    for (const other of items) {
      if (item === other) continue;
      const ahead = ((sign * ((other.distance ?? other.offset * length) - distance)) % length + length) % length;
      clearance = Math.min(clearance, Math.max(0, ahead - (item.vehicleLength + other.vehicleLength) / 2 - 0.55));
    }
    const step = Math.min(item.cruiseSpeed * Math.min(delta, 0.1), clearance);
    return ((distance + sign * step) % length + length) % length;
  });
  items.forEach((item, index) => { item.distance = steps[index]; });
}

export async function buildRegionalScenery(city, generation, { heightAt, siteDistance }) {
  const world = new THREE.Group();
  world.name = "coastal-region-scenery";
  city.world.add(world);
  const plan = city.regionalPlan;
  const { harbor, station } = plan;
  const materials = new Map();
  const material = (color) => {
    if (!materials.has(color)) materials.set(color, new THREE.MeshStandardMaterial({ color, roughness: 0.9 }));
    return materials.get(color);
  };
  const box = (name, x, y, z, width, height, depth, color, rotation = 0) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material(color));
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotation;
    mesh.castShadow = height > 0.15;
    mesh.receiveShadow = true;
    world.add(mesh);
    return mesh;
  };
  const rod = (a, b, radius, color) => {
    const direction = new THREE.Vector3().subVectors(b, a);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 6), material(color));
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    mesh.castShadow = true;
    world.add(mesh);
    return mesh;
  };
  const curve = (points, y = 0.15) => new THREE.CatmullRomCurve3(
    points.map(([x, z]) => new THREE.Vector3(x, y, z)), false, "centripetal",
  );
  const path = (points, width, color, y = 0.15) => {
    // Piecewise strips meet exactly; no smoothing through adjacent house plots.
    for (let i = 1; i < points.length; i += 1) {
      const [ax, az] = points[i - 1];
      const [bx, bz] = points[i];
      box("regional-road", (ax + bx) / 2, y, (az + bz) / 2,
        width, 0.07, Math.hypot(bx - ax, bz - az) + width, color, Math.atan2(bx - ax, bz - az));
    }
  };
  const exactPath=(start,end,width,color,y=.16)=>box("private-frontage",(start.x+end.x)/2,y,(start.z+end.z)/2,
    width,.04,Math.hypot(end.x-start.x,end.z-start.z),color,Math.atan2(end.x-start.x,end.z-start.z));
  const jobs = [];
  const asset = (key, x, y, z, width, depth, height, rotation = 0) => {
    const job = city.cloneAsset(key, { width, depth, height }).then((model) => {
      if (generation !== city.worldGeneration) return null;
      model.position.set(x, y, z);
      model.rotation.y = rotation;
      model.name = `regional:${key}`;
      world.add(model);
      return model;
    });
    jobs.push(job);
    return job;
  };

  // Roadside barriers follow the same curve as the pavement and leave a gap
  // at the city entrance. Instancing keeps their repeating posts inexpensive.
  const barrierPosts = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), material(0xaebeb4), 240);
  barrierPosts.name = "highway-guardrail-posts";
  const postTransform = new THREE.Object3D();
  let postCount = 0;
  for (const side of [-1.22, 1.22]) {
    let run = [];
    const flush = () => {
      if (run.length > 1) {
        const rail = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(run), run.length * 2, 0.045, 4, false), material(0xc5d0c1));
        rail.name = "continuous-highway-guardrail";
        world.add(rail);
      }
      run = [];
    };
    for (let index = 0; index <= 230; index += 1) {
      const t = index / 230;
      const center = city.highwayCurve.getPointAt(t);
      const tangent = city.highwayCurve.getTangentAt(Math.min(t, 0.9999));
      const p = center.clone().addScaledVector(new THREE.Vector3(-tangent.z, 0, tangent.x).normalize(), side);
      p.y = 0.63;
      if (Math.abs(p.x) < 1.5 && Math.abs(p.z - city.highwayZ) < 2) { flush(); continue; }
      run.push(p);
      if (index % 2 === 0) {
        postTransform.position.set(p.x, 0.43, p.z);
        postTransform.updateMatrix(); barrierPosts.setMatrixAt(postCount++, postTransform.matrix);
      }
    }
    flush();
  }
  barrierPosts.count = postCount; barrierPosts.instanceMatrix.needsUpdate = true; world.add(barrierPosts);

  // A compact T-junction with a proper mouth, corner islands and a stop line.
  // The highway sign is upstream of this space; no post sits in a traffic lane.
  const junctionZ = city.highwayZ;
  box("town-junction-asphalt", 0, 0.205, junctionZ + 0.1, 3.25, 0.06, 2.2, 0x535a67);
  box("town-entry-stop-line", 0.4, 0.225, junctionZ + 1.64, 0.6, 0.018, 0.09, 0xf3edcf);
  for (const x of [-1.25, 1.25]) {
    box("junction-corner-island", x, 0.25, junctionZ + 1.37, 0.5, 0.18, 0.55, 0xc5c9bc);
  }
  const signFace = (text, background, width, height) => {
    const canvas = document.createElement("canvas"); canvas.width = 256; canvas.height = 128;
    const ctx = canvas.getContext("2d"); ctx.fillStyle = background; ctx.fillRect(0, 0, 256, 128);
    ctx.strokeStyle = "#f6f0d9"; ctx.lineWidth = 6; ctx.strokeRect(6, 6, 244, 116);
    ctx.fillStyle = "#fff9df"; ctx.font = "bold 48px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(text, 128, 65);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    texture.userData.cityGenerated = true;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }));
    world.add(mesh); return mesh;
  };
  const stopX = -1.16;
  rod(new THREE.Vector3(stopX, 0.2, junctionZ + 1.8), new THREE.Vector3(stopX, 1.32, junctionZ + 1.8), 0.035, 0x71877d);
  const stop = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.045, 8), material(0xb84c38));
  stop.rotation.x = Math.PI / 2; stop.position.set(stopX, 1.34, junctionZ + 1.8); world.add(stop);
  const stopText = signFace("STOP", "#b84c38", 0.34, 0.16);
  stopText.position.set(stopX, 1.34, junctionZ + 1.83);
  const directionSign = signFace("CITY  →", "#266e64", 1.05, 0.48);
  directionSign.position.set(-3.9, 1.25, junctionZ - 1.55); directionSign.rotation.y = -Math.PI / 2;
  rod(new THREE.Vector3(-3.9, 0.2, junctionZ - 1.55), new THREE.Vector3(-3.9, 1.5, junctionZ - 1.55), 0.035, 0x71877d);
  const sites=city.layout.streets.junctions.filter(j=>j.signaled);
  const signal=new THREE.Group();signal.name="four-sided-hover-signals";signal.position.y=2.85;world.add(signal);
  const transform=new THREE.Object3D();
  const bodies=new THREE.InstancedMesh(new THREE.BoxGeometry(.5,.64,.5),material(0x263c38),sites.length);
  const rings=new THREE.InstancedMesh(new THREE.TorusGeometry(.35,.018,5,16),new THREE.MeshBasicMaterial({color:0x7cdbc3}),sites.length);
  sites.forEach((p,i)=>{
    transform.position.set(p.x,0,p.z);transform.rotation.set(0,0,0);transform.updateMatrix();bodies.setMatrixAt(i,transform.matrix);
    transform.position.y=-.36;transform.rotation.x=Math.PI/2;transform.updateMatrix();rings.setMatrixAt(i,transform.matrix);
  });
  signal.add(bodies,rings);
  const lamps=[];
  for(const axis of ["x","z"])for(let index=0;index<3;index++) {
    const hex=[0xe96b4f,0xe7ba51,0x53d4a7][index];
    const mesh=new THREE.InstancedMesh(new THREE.SphereGeometry(.065,6,5),new THREE.MeshBasicMaterial({color:hex}),sites.length*2);
    sites.forEach((p,i)=>[-1,1].forEach((sign,j)=>{
      transform.position.set(p.x+(axis==="x"?sign*.27:0),.2-index*.2,p.z+(axis==="z"?sign*.27:0));
      transform.rotation.set(0,0,0);transform.updateMatrix();mesh.setMatrixAt(i*2+j,transform.matrix);
    }));
    signal.add(mesh);lamps.push({mesh,hex,axis,color:["red","amber","green"][index]});
  }
  city.signalFixtures.push({group:signal,lamps});
  city.stage.dataset.signalJunctions=String(sites.length);
  const roadSource = await city.cloneAsset("roads/straight", {width:1,depth:1,exact:true});
  if (generation !== city.worldGeneration) return;
  for (const road of plan.roads) for (let i=1;i<road.length;i++) {
    const c = new THREE.LineCurve3(new THREE.Vector3(road[i-1][0],0.15,road[i-1][1]),new THREE.Vector3(road[i][0],0.15,road[i][1]));
    const length=c.getLength(); world.add(roadStrip(roadSource,d=>c.getPointAt(d/length),length,1.72));
  }
  asset("roads/crossroad",0,0.17,harbor.z,1.72,1.72,0.2);
  for (const [radius,y,color] of [[1.9,0.14,0xc5c9d4],[1.65,0.19,0x535a67]]) {
    const disc=new THREE.Mesh(new THREE.CircleGeometry(radius,40),material(color)); disc.rotation.x=-Math.PI/2;disc.position.set(-11.5,y,harbor.z);disc.receiveShadow=true;world.add(disc);
  }
  for (const house of plan.houses) {
    box("village-garden", house.x, 0.05, house.z, 3.65, 0.2, 4, 0x9fb278);
    jobs.push(asset(house.key, house.x, 0.17, house.z, 2.65, 2.7, 2.8, house.rotation).then(model=>{
      if(!model)return;
      warmVillageWindows(model,city.windowDusk);
      const frontage=createFrontage(house,harbor.z,new THREE.Box3().setFromObject(model));
      exactPath(frontage.start,frontage.end,frontage.width,frontage.kind==="driveway"?0xa6aaa4:0xd8ceb2);
      box("entrance-step",frontage.start.x,.2,frontage.start.z,frontage.width,.08,.25,0xd4cbb0);
    }));
    for (const dx of [-1.7, 1.7]) {
      box("garden-hedge", house.x + dx, 0.38, house.z, 0.22, 0.5, 3.2, 0x567c52);
    }
    asset("suburban/tree-small", house.x - 1.05, 0.16, house.z - 1.3, 0.8, 0.8, 1.8);
  }

  for(const walk of plan.walks)for(let i=1;i<walk.length;i++)exactPath({x:walk[i-1][0],z:walk[i-1][1]},{x:walk[i][0],z:walk[i][1]},.45,0xd8ceb2,.145);
  // A city-facing halt with a continuous, step-free forecourt connection.
  box("station-platform", station.x, 0.28, station.z, 1.2, 0.45, station.length, 0xc5c4b0);
  box("platform-safety-line", station.x - 0.44, 0.512, 0, 0.07, 0.012, 10.2, 0xf4cf65);
  for (const z of [-3.6, -1.2, 1.2, 3.6]) {
    box("station-canopy-post", station.x + 0.34, 1.15, z, 0.07, 1.5, 0.07, 0x355e5a);
    box("platform-bench", station.x + 0.17, 0.77, z + 0.35, 0.34, 0.12, 0.65, 0x9a684b);
  }
  box("station-canopy", station.x + 0.06, 1.94, 0, 1.42, 0.15, 8.8, 0x438a80);
  box("station-canopy-ridge", station.x + 0.06, 2.05, 0, 0.22, 0.12, 8.8, 0xede6cb);
  const forecourtEdge=city.bounds.minX-1.98;
  box("station-forecourt",(station.x+.6+forecourtEdge)/2,.135,0,forecourtEdge-station.x-.6,.16,11.6,0xd7d1b7);
  box("station-ramp-landing",(station.x+.12+forecourtEdge)/2,.135,5.55,forecourtEdge-station.x+.2,.16,.65,0xd7d1b7);
  const ramp=new THREE.Mesh(new THREE.BoxGeometry(.65,.08,2.4),material(0xc5c4b0));
  ramp.name="station-access-ramp";ramp.position.set(station.x+.12,.32,4.4);ramp.rotation.x=.13;world.add(ramp);
  for(let i=0;i<7;i++)box("station-pedestrian-crossing",city.bounds.minX-1.84+i*.24,.21,0,.12,.012,.55,0xe9e5ce);

  // Quay, two timber fingers, piles and fenders make the boats read as berthed.
  box("harbor-quay", harbor.x - 0.55, 0.12, harbor.z, 2.9, 0.48, harbor.depth, 0xb8b9a5);
  box("quay-coping", harbor.x + 0.84, 0.39, harbor.z, 0.16, 0.12, harbor.depth, 0xe9debd);
  for (const z of [harbor.z - 3.5, harbor.z + 3.5]) {
    box("timber-pier", harbor.x + 2.3, 0.28, z, 3.5, 0.2, 0.78, 0x9b7854);
    for (let x = harbor.x + 0.7; x < harbor.x + 4.1; x += 0.48) {
      box("pier-plank", x, 0.388, z, 0.035, 0.014, 0.76, 0x775c43);
    }
    for (const x of [harbor.x + 1, harbor.x + 3.8]) {
      for (const dz of [-0.32, 0.32]) rod(
        new THREE.Vector3(x, -0.35, z + dz), new THREE.Vector3(x, 0.64, z + dz), 0.075, 0x6c6150,
      );
    }
  }
  for (let i = 0; i < 7; i += 1) {
    const z = harbor.z - 4.1 + i * 1.36;
    box("quay-fender", harbor.x + 0.95, 0.16, z, 0.14, 0.33, 0.3, 0x364544);
    rod(new THREE.Vector3(harbor.x + 0.62, 0.36, z), new THREE.Vector3(harbor.x + 0.62, 0.61, z), 0.07, 0x3a5554);
  }
  asset("industrial/building-p", harbor.x - 2.1, 0.15, harbor.z - 2.7, 2, 2.2, 2.5, Math.PI / 2);
  const portSign=signFace("PORT 443","#266e64",1.45,.5);portSign.position.set(harbor.x-3.13,1.05,harbor.z-2.7);portSign.rotation.y=-Math.PI/2;
  asset("industrial/container-a", harbor.x - 1.1, 0.37, harbor.z + 2.3, 0.85, 1.6, 0.9);
  asset("industrial/container-b", harbor.x - 2.2, 0.37, harbor.z + 2.2, 0.85, 1.6, 0.9);
  // A compact jib crane with a cable and suspended cargo, not a giant gantry.
  box("crane-base", harbor.x - 0.1, 0.55, harbor.z - 1.8, 0.55, 0.38, 0.55, 0x4e6967);
  rod(new THREE.Vector3(harbor.x - 0.1, 0.7, harbor.z - 1.8), new THREE.Vector3(harbor.x - 0.1, 3.0, harbor.z - 1.8), 0.085, 0xe9b951);
  jobs.push(addPortLife(city,world,harbor,generation));
  addGulls(city,world,harbor);
  asset("watercraft/sail", harbor.x + 2.3, 0.02, harbor.z + 2.2, 0.85, 1.75, 2.1, Math.PI / 2);
  for (const dz of [-5.4, 5.4]) asset("watercraft/buoy", harbor.x + 5.5, 0.02, harbor.z + dz, 0.38, 0.38, 0.75);

  // Lighthouse at the harbor head, with a path and stone footing.
  const lighthouseZ = harbor.z + 7.5;
  const lighthouseX = city.coastlineCurve.getPoint((lighthouseZ - city.perimeter.coast.minZ) / city.perimeter.coast.length).x - 1.25;
  path([[harbor.x - 1.3, harbor.z + 4.5], [lighthouseX, lighthouseZ]], 0.5, 0xc9b78d, 0.18);
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.57, 2.7, 10), material(0xf2e6c8));
  tower.position.set(lighthouseX, 1.3, lighthouseZ); tower.castShadow = true; world.add(tower);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.63, 0.52, 10), material(0xb55b44));
  cap.position.set(lighthouseX, 3.18, lighthouseZ); cap.castShadow = true; world.add(cap);
  box("lighthouse-lantern", lighthouseX, 2.78, lighthouseZ, 0.55, 0.45, 0.55, 0xf4c765);
  box("lighthouse-door", lighthouseX - 0.5, 0.39, lighthouseZ, 0.05, 0.6, 0.3, 0x426866);

  // Tiny residents add scale without turning scenery into fictitious services.
  const walkingPaths = [
    [[station.x + 0.08, -4.7], [station.x + 0.08, 4.7], 0.53],
    [[harbor.x - 0.05, harbor.z - 4.5], [harbor.x - 0.05, harbor.z + 4.5], 0.37],
    [[-9.5, harbor.z + 1.15], [harbor.x - 3.5, harbor.z + 1.15], 0.18],
  ];
  for (let index = 0; index < 12; index += 1) {
    const [start, end, y] = walkingPaths[index % walkingPaths.length];
    const person = new THREE.Group(); person.name = "ambient-pedestrian";
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.17, 2, 5), material([0xdc9a54, 0x477d92, 0x9b5652, 0xf0dfb2][index % 4]));
    body.position.y = 0.2;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.067, 6, 4), material(index % 2 ? 0xa87655 : 0xe4b78b));
    head.position.y = 0.39;
    person.add(body, head); world.add(person);
    const walking = curve(index % 2 ? [end, start] : [start, end], y);
    city.motion.push({ object: person, curve: walking, speed: 0.012 + index * 0.001,
      ...(index%3===0?{stationPassenger:{x:station.x-.43,boardX:city.railX+.35,z:-2+index/3*1.6}}:{}),
      offset: (index * 0.233) % 1, pingPong: true, bob: 0.01 });
  }

  // A launch and a yacht cruise seaward of both the working channel and piers.
  for (const [index, key] of ["watercraft/sail", "watercraft/speed"].entries()) {
    const x = harbor.x + 14 + index * 5;
    const boat = await asset(key, x, 0.03, harbor.z, 1.05, 2.35, 2.65);
    if (!boat || generation !== city.worldGeneration) return;
    const sailing = curve([[x, -27], [x + 2, -8], [x - 1, 15], [x + 3, 38], [x + 7, 64]], 0.02);
    city.motion.push({ object: boat, curve: sailing, speed: index ? -0.017 : 0.0055,
      offset: index ? 0.4 : 0.25, rotationOffset: index ? Math.PI : 0, wrap: true, surface: "ocean", bob: 0.025 });
  }

  // Coastal rocks and inland copses are instanced to keep decoration affordable.
  const count = 240;
  const rocks = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), material(0x899789), count);
  rocks.name = "instanced-coastal-and-hillside-rocks";
  rocks.receiveShadow = true; rocks.castShadow = true;
  const matrix = new THREE.Object3D();
  let placed = 0;
  for (let i = 0; i < 1600 && placed < count; i += 1) {
    const random = (salt) => (Math.sin(i * 71.13 + salt * 93.7) * 43147.18 % 1 + 1) % 1;
    const z = THREE.MathUtils.lerp(city.bounds.minZ - 34, city.bounds.maxZ + 43, random(1));
    const shore = city.coastlineCurve.getPoint((z - city.perimeter.coast.minZ) / city.perimeter.coast.length).x;
    const coastal = i % 3 === 0;
    const x = coastal ? shore - random(2) * 1.5 : THREE.MathUtils.lerp(city.bounds.minX - 34, shore - 5, random(2));
    if (siteDistance(x, z) < 2 || distanceToRegionalSite(x, z, plan) < 1.5) continue;
    const y = heightAt(x, z);
    const scale = coastal ? 0.2 + random(3) * 0.45 : 0.2 + random(3) * 0.85;
    matrix.position.set(x, y + scale * 0.12, z);
    matrix.scale.set(scale * 1.4, scale * 0.6, scale);
    matrix.rotation.set(random(4) * 0.6, random(5) * Math.PI, random(6) * 0.5);
    matrix.updateMatrix(); rocks.setMatrixAt(placed++, matrix.matrix);
  }
  rocks.count = placed; rocks.instanceMatrix.needsUpdate = true; world.add(rocks);
  await Promise.all(jobs);
}
