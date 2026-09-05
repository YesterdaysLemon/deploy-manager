import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import * as THREE from "three";
import { cityRenderPolicy, renderPixelRatio } from "../client/render-policy.js";

test("phones and touch tablets have bounded pixels, geometry and frame work", () => {
  for (const device of [{width:393,coarsePointer:true},{width:1194,coarsePointer:true},{width:600}]) {
    const profile=cityRenderPolicy(device);
    assert.equal(profile.compact,true);
    assert.equal(profile.shadows,false);
    assert.equal(profile.frameMs,1000/30);
    assert.equal(profile.surfaceResolution,12);
    assert.equal(profile.waterDetail,8);
    const ratio=renderPixelRatio(profile,device.width,852,3);
    assert.ok(device.width*852*ratio**2<=650001);
    assert.ok(ratio<=1);
  }
  const desktop=cityRenderPolicy({width:1440});
  assert.equal(desktop.shadows,true);
  assert.equal(desktop.surfaceResolution,24);
});

import {
  AMBIENT_DELIVERY_COUNT,
  ASSET_URLS,
  CAMERA_HOME,
  CITY_METRICS,
  GHOST_MODEL_KEYS,
  HIGHWAY_APPROACH,
  HIGHWAY_TRAFFIC_PROFILES,
  HIGHWAY_SIGN_ROTATION,
  OCEAN_WAVE_SETTINGS,
  RAIL_APPROACH,
  REDUCED_MOTION_FRAME_MS,
  ROAD_ASSET_METRICS,
  ROAD_TILE_ROTATIONS,
  TERRAIN_CONFIG,
  TRAIN_TRAFFIC_PROFILE,
  WATER_TRAFFIC_PROFILES,
  chooseAmbientDeliveryTargets,
  chooseBuildingKey,
  createHighwaySignTransform,
  createPerimeterBands,
  createPlotLayout,
  createStreetRoutePoints,
  createStreetAccess,
  streetCurve,
  createTransitCurves,
  createTerrainContext,
  oceanWaveHeightAt,
  terrainFbmAt,
  terrainHeightAt,
  vegetationDensityAt,
} from "../client/city3d.js";
import { createRegionalPlan, distanceToRegionalSite, advanceLaneTraffic } from "../client/region.js";
import { OCEAN_WAVES, coastXAt } from "../client/ocean.js";
import { createContinuations, continuationPoint, continuationDistance, visibleChunkKeys, createSurfaceTile, WorldStream } from "../client/world-stream.js";
import { createBoulevard, roadStrip, continuousRail, RAIL_SPACING } from "../client/transport.js";
import { batchStaticScenery } from "../client/render-batch.js";
import { createFrontage } from "../client/frontage.js";
import { MapTapGesture, clampMapLabel } from "../client/interaction.js";
import { railSchedule, portSchedule, createHarborApproach } from "../client/city-life.js";
import { SIGNAL_JUNCTION, advanceCityTraffic, signalPhase, vehiclePose, vehiclesOverlap, laneCurve } from "../client/city-traffic.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const topology = JSON.parse(readFileSync(new URL("../config/public-topology.json", import.meta.url), "utf8"));

test("frontages terminate at the actual straight or circular kerb without intruding into asphalt",()=>{
  const perimeter=createPerimeterBands(createPlotLayout(topology)),plan=createRegionalPlan(perimeter,createTransitCurves(perimeter).coastline);
  for(const house of plan.houses){
    const bounds={min:{x:house.x-1.2,z:house.z-1.2},max:{x:house.x+1.2,z:house.z+1.2}};
    const f=createFrontage(house,plan.harbor.z,bounds),dx=f.end.x-f.start.x,dz=f.end.z-f.start.z,length=Math.hypot(dx,dz);
    assert.ok(length>0 && length<4);
    for(let step=0;step<=20;step++)for(const side of [-1,0,1]){
      const x=f.start.x+dx*step/20-dz/length*f.width/2*side;
      const z=f.start.z+dz*step/20+dx/length*f.width/2*side;
      const onStreet=x>=-11.5 && x<=plan.harbor.x-2.8 && Math.abs(z-plan.harbor.z)<.86-1e-6;
      const inBulb=Math.hypot(x+11.5,z-plan.harbor.z)<1.65-1e-6;
      assert.equal(onStreet||inBulb,false,`asphalt overlap for ${house.key}`);
    }
  }
  assert.ok(plan.station.x>perimeter.rail.x,"station must face the city");
  assert.ok(plan.station.x+.6<perimeter.bounds.minX-1.91,"platform must clear boulevard");
  assert.ok(plan.walks.length>=3);
});

test("map gesture classification rejects drags, pinches and cancelled pointers",()=>{
  const g=new MapTapGesture(),event=(id,x=0)=>({pointerId:id,clientX:x,clientY:0,pointerType:"touch",button:0,target:null});
  g.down(event(1));assert.equal(g.up(event(1)).tap,true);
  g.down(event(1));g.move(event(1,20));assert.equal(g.up(event(1,0)).tap,false,"returning to start is still a drag");
  g.down(event(1));g.down(event(2));assert.equal(g.up(event(1)),null);assert.equal(g.up(event(2)).tap,false);
  g.down(event(1));assert.equal(g.up(event(1),true).tap,false);
  assert.deepEqual(clampMapLabel(-100,900,130,44,390,844),{x:77,y:712});
});

test("station timetable dwells for boarding and preserves separation from freight",()=>{
  const length=170,station=80;
  assert.equal(railSchedule(3,length,station).dwelling,true);
  assert.equal(railSchedule(3,length,station).distance,station);
  assert.equal(railSchedule(9,length,station).dwelling,false);
  for(let t=0;t<700;t+=.2){
    const a=railSchedule(t,length,station,0),b=railSchedule(t,length,station,.56);
    const gap=Math.abs(a.distance-b.distance);assert.ok(Math.min(gap,length-gap)>15);
  }
});

test("harbor schedule transfers a parcel before its delivery truck departs",()=>{
  assert.equal(portSchedule(10).phase,"arriving");
  assert.equal(portSchedule(30).phase,"unloading");
  assert.equal(portSchedule(43).truckOut,0);
  assert.equal(portSchedule(60).phase,"delivering");
  assert.equal(portSchedule(80).phase,"returning");
  assert.equal(portSchedule(110).phase,"waiting");
  assert.deepEqual(portSchedule(120),portSchedule(0));
  const p=createPerimeterBands(createPlotLayout(topology)),t=createTransitCurves(p),plan=createRegionalPlan(p,t.coastline);
  const approach=createHarborApproach(plan.harbor,p.coast.shoreX);
  for(const point of approach.getSpacedPoints(300)) {
    const offset=point.x-coastXAt(point.z,p.coast.shoreX);
    assert.ok(offset>2,"working boat touches shore");
    assert.ok(offset<5,"working boat intrudes into the through-shipping lane");
  }
});

for(const dispatchAt of [10,40,80]) test(`production courier loops deliver without collision or deadlock at phase ${dispatchAt}`,()=>{
  const layout=createPlotLayout(topology),docker=layout.entities.find(e=>e.id==="docker"),targets=chooseAmbientDeliveryTargets(layout);
  const access=createStreetAccess(docker,targets[0],layout,"horizontal");
  const items=targets.map((target,i)=> {
    const out=createStreetRoutePoints(docker,target,layout,{startAccess:access}),back=createStreetRoutePoints(target,docker,layout,{endAccess:access});
    return {curve:laneCurve(streetCurve([...out,...back.slice(1)],.255)),speed:1,offset:i/3,bodyWidth:.7,bodyLength:1.5,cruiseSpeed:.85+i*.12};
  });
  const loop=createBoulevard(createPerimeterBands(layout).bounds);
  for(let i=0;i<2;i++)items.push({curve:laneCurve(loop,i?-.42:.42),speed:i?-1:1,offset:i?.64:.14,bodyWidth:.68,bodyLength:1.4,cruiseSpeed:i?1:1.2});
  advanceCityTraffic(items,0,0);const starts=items.map(item=>item.cityDistance);
  const releaseAccess=createStreetAccess(docker,layout.entities.find(e=>e.id==="caddy"),layout,"vertical");
  const delivery={curve:laneCurve(streetCurve(createStreetRoutePoints(docker,targets[0],layout,{startAccess:releaseAccess}),.31)),once:true,cityDistance:0,offset:0,speed:1,bodyWidth:.7,bodyLength:1.5,cruiseSpeed:2};
  let dispatched=false,completed=false,completedAt=Infinity;
  for(let frame=0;frame<15000;frame++) {
    const time=frame/60;
    if(!dispatched && time>dispatchAt && items.every(item=>!vehiclesOverlap(vehiclePose(delivery,0),vehiclePose(item,item.cityDistance)))) {items.push(delivery);dispatched=true;}
    advanceCityTraffic(items,1/60,time);
    for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++)assert.equal(vehiclesOverlap(vehiclePose(items[i],items[i].cityDistance),vehiclePose(items[j],items[j].cityDistance),0),false);
    if(dispatched && !completed && delivery.cityDistance>delivery.curve.getLength()-.02){completed=true;completedAt=time;items.splice(items.indexOf(delivery),1);}
  }
  assert.ok(completed,`delivery deadlocked at ${delivery.cityDistance}/${delivery.curve.getLength()}: ${JSON.stringify(items.map(item=>({distance:item.cityDistance,pose:vehiclePose(item,item.cityDistance),reverse:item.reverseRemaining,blocked:item.blockedSeconds})))}`);
  assert.ok(completedAt<dispatchAt+90,`delivery took ${completedAt-dispatchAt}s`);
  items.forEach((item,i)=>assert.ok(Math.abs(item.cityDistance-starts[i])>20,`courier ${i} stalled`));
});

test("city signals have amber and all-red clearance; crossing traffic progresses without overlaps",()=>{
  for(let t=0;t<36;t+=.1) {const p=signalPhase(t);assert.ok(!(p.x==="green"&&p.z==="green"));}
  assert.deepEqual(signalPhase(8.5),{x:"red",z:"red"});assert.equal(signalPhase(7).x,"amber");
  const {x,z}=SIGNAL_JUNCTION;
  const items=[
    {curve:new THREE.LineCurve3(new THREE.Vector3(x-8,.2,z+.42),new THREE.Vector3(x+8,.2,z+.42)),speed:1},
    {curve:new THREE.LineCurve3(new THREE.Vector3(x-8,.2,z-.42),new THREE.Vector3(x+8,.2,z-.42)),speed:-1},
    {curve:new THREE.LineCurve3(new THREE.Vector3(x+.42,.2,z-8),new THREE.Vector3(x+.42,.2,z+8)),speed:1},
    {curve:new THREE.LineCurve3(new THREE.Vector3(x-.42,.2,z-8),new THREE.Vector3(x-.42,.2,z+8)),speed:-1},
  ].map((item,i)=>({...item,offset:i*.22,cruiseSpeed:1.1,bodyWidth:.7,bodyLength:1.5}));
  advanceCityTraffic(items,0,0);const starts=items.map(item=>item.cityDistance);
  for(let frame=0;frame<7200;frame++) {
    advanceCityTraffic(items,1/60,frame/60);
    for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++)assert.equal(vehiclesOverlap(vehiclePose(items[i],items[i].cityDistance),vehiclePose(items[j],items[j].cityDistance),0),false);
  }
  items.forEach((item,i)=>assert.ok(Math.abs(item.cityDistance-starts[i])>30,"traffic deadlocked"));
});

test("deferred streaming builds at most one chunk per drain and culls outside the view",()=>{
  const p=createPerimeterBands(createPlotLayout(topology)),t=createTransitCurves(p);
  const source=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshBasicMaterial());
  const stream=new WorldStream({world:new THREE.Group(),waterMaterial:new THREE.MeshBasicMaterial(),roadModel:source,treeModel:source,
    context:createTerrainContext(p,t.highway,t.rail,t.coastline),heightAt:()=>0,colorAt:()=>new THREE.Color(),siteDistance:()=>20});
  const camera=new THREE.OrthographicCamera(-20,20,15,-15,.1,200);camera.position.set(0,30,30);camera.lookAt(0,0,0);camera.updateMatrixWorld();
  const frustum=new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
  stream.update({x:0,z:0},100,{frustum,deferred:true});
  assert.equal(stream.chunks.size,0);assert.ok(stream.pendingCount>0);assert.ok(stream.pending.length<visibleChunkKeys({x:0,z:0},100).length/2);
  stream.drain(1);assert.equal(stream.chunks.size,1);stream.dispose();assert.equal(stream.pendingCount,0);
  source.geometry.dispose();source.material.dispose();
});

test("regional reservations keep homes, access roads, and docks clear of terrain and shipping", () => {
  for (const size of [4, 6, 8]) {
    const perimeter = createPerimeterBands({ size });
    const transit = createTransitCurves(perimeter);
    const plan = createRegionalPlan(perimeter, transit.coastline);
    const context = createTerrainContext(perimeter, transit.highway, transit.rail, transit.coastline);
    for (const house of plan.houses) {
      assert.equal(terrainHeightAt(house.x, house.z, context), TERRAIN_CONFIG.baseY);
      assert.ok(distanceToRegionalSite(house.x, house.z, plan) < 0);
      assert.ok(house.z - 2 > perimeter.bounds.maxZ, "scenery must not occupy real service plots");
      assert.ok(Math.abs(house.x - perimeter.rail.x) > 2.5, "homes must clear the railway");
    }
    for (const road of plan.roads) for (let i = 1; i < road.length; i += 1) {
      for (let sample = 0; sample <= 20; sample += 1) {
        const x = THREE.MathUtils.lerp(road[i - 1][0], road[i][0], sample / 20);
        const z = THREE.MathUtils.lerp(road[i - 1][1], road[i][1], sample / 20);
        assert.ok(terrainHeightAt(x, z, context) < 0.09, "access roads cannot be buried");
      }
    }
    for (const lane of transit.shippingLanes) for (const point of lane.getSpacedPoints(400)) {
      if (Math.abs(point.z - plan.harbor.z) < 6) {
        assert.ok(point.x > plan.harbor.x + 5.3, "shipping must clear the full pier and a boat beam");
      }
    }
  }
});

test("lane traffic preserves clearance in both directions and across its offscreen seam", () => {
  for (const direction of [-1, 1]) {
    const curve = new THREE.LineCurve3(new THREE.Vector3(), new THREE.Vector3(0, 0, 100));
    const cars = [0.03, 0.36, 0.7].map((offset, index) => ({
      curve, offset, speed: direction, vehicleLength: 2, cruiseSpeed: [8, 1.3, 4][index],
    }));
    for (let frame = 0; frame < 6000; frame += 1) {
      advanceLaneTraffic(cars, frame % 60 ? 1 / 60 : 1);
      for (let a = 0; a < cars.length; a += 1) for (let b = a + 1; b < cars.length; b += 1) {
        const gap = Math.abs(cars[a].distance - cars[b].distance);
        assert.ok(Math.min(gap, 100 - gap) >= 2.55 - 1e-8, "cars collided");
      }
    }
    const before = cars.map(({ distance }) => distance);
    advanceLaneTraffic(cars, 0);
    assert.deepEqual(cars.map(({ distance }) => distance), before, "reduced motion must stay still");
  }
});

test("every curated scene model is explicitly served by the production server", () => {
  const source = readFileSync(new URL("../src/server.mjs", import.meta.url), "utf8");
  for (const asset of Object.values(ASSET_URLS)) {
    assert.ok(source.includes(`"${asset.replace("/assets/kenney/", "")}"`), `${asset} is not served`);
  }
});

test("3D city layout assigns every entity to a distinct square-grid plot", () => {
  const layout = createPlotLayout(topology);
  const expected = 4 + topology.routes.length + topology.datastores.length;
  assert.equal(layout.entities.length, expected);
  assert.equal(new Set(layout.entities.map(({ col, row }) => `${col}:${row}`)).size, expected);

  for (let left = 0; left < layout.entities.length; left += 1) {
    for (let right = left + 1; right < layout.entities.length; right += 1) {
      const a = layout.entities[left];
      const b = layout.entities[right];
      const distance = Math.hypot(a.x - b.x, a.z - b.z);
      assert.ok(distance >= CITY_METRICS.pitch, `${a.id} and ${b.id} are too close`);
    }
  }
});

test("declared plot addresses survive topology reorder and outward expansion", () => {
  const baseline = createPlotLayout(topology);
  const positions = new Map(baseline.entities.map(({ id, x, z }) => [id, { x, z }]));
  const reordered = createPlotLayout({
    ...topology,
    routes: [...topology.routes].reverse(),
  });
  for (const entity of reordered.entities) assert.deepEqual(
    { x: entity.x, z: entity.z },
    positions.get(entity.id),
    entity.id,
  );

  const expanded = createPlotLayout({
    ...topology,
    routes: [...topology.routes, {
      id: "new-edge-service",
      name: "New edge service",
      plot: { x: 2.5, z: -2.5 },
    }],
  });
  assert.equal(expanded.size, 6);
  for (const [id, expected] of positions) {
    const entity = expanded.entities.find((item) => item.id === id);
    assert.deepEqual({ x: entity.x, z: entity.z }, expected, id);
  }
});

test("undeclared plot addresses are deterministic across topology order", () => {
  const withoutPlots = {
    ...topology,
    routes: topology.routes.map(({ plot: _plot, ...route }) => route),
    datastores: topology.datastores.map(({ plot: _plot, ...store }) => store),
  };
  const positions = new Map(createPlotLayout(withoutPlots).entities.map(({ id, x, z }) => [id, { x, z }]));
  const reordered = createPlotLayout({
    ...withoutPlots,
    routes: [...withoutPlots.routes].reverse(),
    datastores: [...withoutPlots.datastores].reverse(),
  });
  for (const entity of reordered.entities) assert.deepEqual(
    { x: entity.x, z: entity.z },
    positions.get(entity.id),
    entity.id,
  );
});

test("model selection is stable and keeps the industrial factory readable", () => {
  assert.equal(chooseBuildingKey("androidhell"), "industrial/building-m");
  assert.equal(chooseBuildingKey("portfolio"), "commercial/building-f");
  assert.equal(chooseBuildingKey("an-extra-route"), chooseBuildingKey("an-extra-route"));
});

test("street routes stay on the road graph and never cross a city lot", () => {
  const layout = createPlotLayout(topology);
  const close = (left, right) => Math.abs(left - right) < 0.001;
  for (const start of layout.entities) {
    for (const end of layout.entities) {
      if (start.id === end.id) continue;
      const points = createStreetRoutePoints(start, end, layout);
      assert.ok(points.length >= 2, `${start.id} -> ${end.id} needs a road route`);
      for (const point of points) {
        for (const lot of layout.cells) {
          const insideLot = Math.abs(point.x - lot.x) < CITY_METRICS.lotSize / 2
            && Math.abs(point.z - lot.z) < CITY_METRICS.lotSize / 2;
          assert.equal(insideLot, false, `${start.id} -> ${end.id} enters lot ${lot.col}:${lot.row}`);
        }
      }
      for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const current = points[index];
        assert.ok(close(previous.x, current.x) || close(previous.z, current.z), `${start.id} -> ${end.id} cuts across a block`);
      }
    }
  }
});

test("Kenney straight roads follow their authored horizontal axis", () => {
  assert.equal(ROAD_TILE_ROTATIONS.horizontal, 0);
  assert.equal(ROAD_TILE_ROTATIONS.vertical, Math.PI / 2);
});

test("tiled highway, curved rail, and coastline occupy distinct perimeter approaches", () => {
  const perimeter = createPerimeterBands(createPlotLayout(topology));
  const overlaps = (left, right) => left.minX < right.maxX
    && left.maxX > right.minX
    && left.minZ < right.maxZ
    && left.maxZ > right.minZ;

  assert.equal(perimeter.highway.axis, "x");
  assert.equal(perimeter.rail.axis, "z");
  assert.equal(perimeter.coast.axis, "z");
  assert.ok(perimeter.coast.width >= 35, "open sea should continue beyond the viewport");
  assert.ok(perimeter.ground.maxX <= perimeter.coast.shoreX + 0.82, "land must stop at the shoreline");
  assert.ok(perimeter.coast.oceanX > perimeter.ground.maxX + 35, "there must be no land padding beyond the ocean");
  assert.equal(overlaps(perimeter.highway, perimeter.rail), false);
  assert.equal(overlaps(perimeter.highway, perimeter.coast), false);
  assert.equal(overlaps(perimeter.rail, perimeter.coast), false);
  const sign = createHighwaySignTransform(perimeter);
  assert.equal(sign.rotation, HIGHWAY_SIGN_ROTATION);
  assert.equal(HIGHWAY_SIGN_ROTATION, 0);
  const approaches = createTransitCurves(perimeter);
  const highwayCenter = approaches.highway.getPointAt(0.5);
  assert.ok(sign.x < -3.5, "gantry must be upstream of the x=0 town junction");
  assert.ok(sign.x > perimeter.highway.minX + 2, "gantry must clear the approach bend");
  assert.ok(Math.abs(sign.z - perimeter.highway.z) < 1e-9);
  assert.ok(Math.abs(highwayCenter.z - perimeter.highway.z) < 1e-9);
  const highwayStart = approaches.highway.getPoint(0);
  const railStart = approaches.rail.getPoint(0);
  const coastStart = approaches.coastline.getPoint(0);
  assert.ok(highwayStart.z < perimeter.highway.minZ);
  assert.ok(railStart.x < perimeter.rail.minX);
  assert.ok(perimeter.highway.minZ - highwayStart.z > 20, "highway should vanish beyond the framed terrain");
  assert.ok(perimeter.rail.minX - railStart.x > 20, "rail should vanish beyond the framed terrain");
  assert.ok(Math.abs(coastStart.x - perimeter.coast.shoreX) < 1);
  assert.equal(approaches.highwayAssets[0].key, "roads/curve");
  assert.equal(approaches.highwayAssets[1].key, "roads/bend");
  assert.equal(approaches.highwayStraights.length, 3);
  assert.equal(approaches.railStraights.length, 3);
  assert.equal(approaches.railAssets.length, 2);
  assert.equal(approaches.shippingLanes.length, 2);
  assert.ok(HIGHWAY_APPROACH.leftTurn > HIGHWAY_APPROACH.rightTurn);
  assert.ok(RAIL_APPROACH.cornerFit > RAIL_APPROACH.turn);

  const transformRoadPort = (asset, extent, [x, z]) => {
    const scale = asset.fit / extent;
    const cosine = Math.cos(asset.rotation);
    const sine = Math.sin(asset.rotation);
    return new THREE.Vector3(
      asset.x + (x * cosine + z * sine) * scale,
      0,
      asset.z + (-x * sine + z * cosine) * scale,
    );
  };
  const closePoint = (left, right) => Math.hypot(left.x - right.x, left.z - right.z) < 1e-8;
  const [broadCurve, tightBend] = approaches.highwayAssets;
  assert.equal(broadCurve.fit, ROAD_ASSET_METRICS.curveExtent * ROAD_ASSET_METRICS.tileScale);
  assert.equal(tightBend.fit, ROAD_ASSET_METRICS.bendExtent * ROAD_ASSET_METRICS.tileScale);
  assert.equal(tightBend.rotation, -Math.PI / 2);
  assert.ok(closePoint(
    transformRoadPort(broadCurve, ROAD_ASSET_METRICS.curveExtent, [0.5, 1]),
    approaches.highwayCorners[0].getPoint(0),
  ));
  assert.ok(closePoint(
    transformRoadPort(broadCurve, ROAD_ASSET_METRICS.curveExtent, [-1, -0.5]),
    approaches.highwayCorners[0].getPoint(1),
  ));
  assert.ok(closePoint(
    transformRoadPort(tightBend, ROAD_ASSET_METRICS.bendExtent, [0, 0.5]),
    approaches.highwayCorners[1].getPoint(0),
  ));
  assert.ok(closePoint(
    transformRoadPort(tightBend, ROAD_ASSET_METRICS.bendExtent, [-0.5, 0]),
    approaches.highwayCorners[1].getPoint(1),
  ));

  const transformRailPort = (asset, [x, z]) => {
    const cosine = Math.cos(asset.rotation);
    const sine = Math.sin(asset.rotation);
    return new THREE.Vector3(
      asset.x + (x * cosine + z * sine) * RAIL_APPROACH.assetScale,
      0,
      asset.z + (-x * sine + z * cosine) * RAIL_APPROACH.assetScale,
    );
  };
  assert.ok(closePoint(transformRailPort(approaches.railAssets[0], [-4, 4]), approaches.railCorners[0].getPoint(0)));
  assert.ok(closePoint(transformRailPort(approaches.railAssets[0], [0, 0]), approaches.railCorners[0].getPoint(1)));
  assert.ok(closePoint(transformRailPort(approaches.railAssets[1], [0, 0]), approaches.railCorners[1].getPoint(0)));
  assert.ok(closePoint(transformRailPort(approaches.railAssets[1], [-4, 4]), approaches.railCorners[1].getPoint(1)));

  const minimumDistance = (left, right) => {
    let minimum = Infinity;
    for (const a of left.getSpacedPoints(100)) {
      for (const b of right.getSpacedPoints(100)) minimum = Math.min(minimum, Math.hypot(a.x - b.x, a.z - b.z));
    }
    return minimum;
  };
  assert.ok(minimumDistance(approaches.highway, approaches.rail) > (perimeter.highway.width + perimeter.rail.width) / 2);
  assert.ok(minimumDistance(approaches.highway, approaches.coastline) > perimeter.highway.width / 2);
});

test("the clear default view uses continuous protected terrain and an analytic ocean spectrum", () => {
  assert.ok(CAMERA_HOME.position[0] < 0);
  assert.ok(CAMERA_HOME.position[2] < 0);
  const targets = chooseAmbientDeliveryTargets(createPlotLayout(topology));
  assert.equal(targets.length, AMBIENT_DELIVERY_COUNT);
  assert.equal(new Set(targets.map(({ id }) => id)).size, AMBIENT_DELIVERY_COUNT);
  const perimeter = createPerimeterBands(createPlotLayout(topology));
  assert.equal(terrainHeightAt(0, 0, perimeter), TERRAIN_CONFIG.baseY);
  for (const [x, z] of [
    [0, perimeter.bounds.maxZ + 8],
    [0, perimeter.bounds.minZ - 8],
    [perimeter.bounds.minX - 8, 0],
  ]) {
    assert.ok(terrainHeightAt(x, z, perimeter) > TERRAIN_CONFIG.baseY + 0.28, `terrain stayed flat at ${x},${z}`);
  }
  assert.equal(terrainFbmAt(12.3, -4.7), terrainFbmAt(12.3, -4.7));
  assert.notEqual(terrainFbmAt(12.3, -4.7), terrainFbmAt(13.3, -4.7));
  assert.notEqual(vegetationDensityAt(12.3, -4.7), vegetationDensityAt(31.3, 14.7));
  assert.ok(TERRAIN_CONFIG.segmentsX * TERRAIN_CONFIG.segmentsZ > 9_000);
  assert.equal(TERRAIN_CONFIG.octaves, 6);
  assert.ok(REDUCED_MOTION_FRAME_MS >= 250);
  assert.equal(OCEAN_WAVES.length, OCEAN_WAVE_SETTINGS.fragmentIterations);
  assert.ok(OCEAN_WAVE_SETTINGS.fragmentIterations > OCEAN_WAVE_SETTINGS.vertexIterations);
  assert.notEqual(oceanWaveHeightAt(24, 4, 0), oceanWaveHeightAt(24, 4, 3));
  assert.notEqual(oceanWaveHeightAt(24, 4, 0), oceanWaveHeightAt(28, 4, 0));
  const source = ["city3d.js", "ocean.js", "world-stream.js", "transport.js"].map((file) => readFileSync(new URL(`../client/${file}`, import.meta.url), "utf8")).join("\n");
  assert.doesNotMatch(source, /new THREE\.Fog|addFogBanks|FogExp2/);
  assert.doesNotMatch(source, /addHills|landscape-hill/);
  assert.match(source, /analytic-rolling-terrain/);
  assert.match(source, /open-ocean-boundary/);
  assert.match(source, /new THREE\.InstancedMesh/);
  assert.match(source, /procedural-boat-wake/);
  assert.match(source, /future-foundation/);
  assert.match(source, /continuous-rail-corridor/);
  assert.match(source, /sampleX = scaledX \* cosine - scaledZ \* sine/);
  assert.match(source, /amplitude \* k \* cos\(phase\)/);
  assert.match(source, /pixelWidth \* k/);
  assert.match(source, /tonemapping_fragment/);
  assert.match(source, /new THREE\.ShaderMaterial/);
});

test("the boulevard closes outside every plot and leaves transport corridors clear", () => {
  const p = createPerimeterBands(createPlotLayout(topology)), loop = createBoulevard(p.bounds);
  assert.ok(loop.getPointAt(0).distanceTo(loop.getPointAt(1)) < 1e-9);
  assert.ok(loop.getTangentAt(0.00001).dot(loop.getTangentAt(0.99999)) > 0.999);
  const transit = createTransitCurves(p), context=createTerrainContext(p,transit.highway,transit.rail,transit.coastline);
  for (const v of loop.getSpacedPoints(400)) {
    const dx=Math.max(p.bounds.minX-v.x,0,v.x-p.bounds.maxX), dz=Math.max(p.bounds.minZ-v.z,0,v.z-p.bounds.maxZ);
    assert.ok(Math.hypot(dx,dz) > CITY_METRICS.roadWidth/2, "boulevard clips a lot corner");
    assert.ok(terrainHeightAt(v.x,v.z,context) < 0.09, "boulevard buried in terrain");
    assert.ok(v.x+CITY_METRICS.roadWidth/2 < coastXAt(v.z,p.coast.shoreX), "boulevard touches water");
    assert.ok(Math.abs(v.x-p.rail.x) > (CITY_METRICS.roadWidth+p.rail.width)/2, "boulevard clips rail");
  }
});

test("road strips meet at the same cross section without longitudinal end caps", () => {
  const source = new THREE.Mesh(new THREE.BoxGeometry(1,0.02,1),new THREE.MeshStandardMaterial());
  const point = d => new THREE.Vector3(d,0.145,Math.sin(d/48)*2);
  const a=roadStrip(source,d=>point(d),32,2.28), b=roadStrip(source,d=>point(d+32),32,2.28);
  const edges=(mesh,x)=> {
    const p=mesh.geometry.getAttribute("position"),out=[];
    for(let i=0;i<p.count;i++) if(Math.abs(p.getX(i)-x)<0.06) out.push([p.getX(i),p.getY(i),p.getZ(i)]);
    return out;
  };
  for(const v of edges(a,32)) assert.ok(edges(b,32).some(w=>Math.hypot(...v.map((n,i)=>n-w[i]))<0.002), "open road seam");
  assert.ok(a.geometry.getAttribute("uv"), "authored palette coordinates must survive");
  a.geometry.dispose();b.geometry.dispose();source.geometry.dispose();source.material.dispose();
});

test("rail geometry shares profiles and continuous sleeper spacing across chunks", () => {
  const point=d=>new THREE.Vector3(d,0.24,Math.sin(d/48)*2);
  const a=continuousRail(point,0,32),b=continuousRail(point,32,64);
  for(let strip=0;strip<3;strip++) {
    const ap=a.children[strip].geometry.getAttribute("position"),bp=b.children[strip].geometry.getAttribute("position");
    for(let side=0;side<2;side++) {
      const index=ap.count-2+side;
      assert.ok(Math.hypot(ap.getX(index)-bp.getX(side),ap.getY(index)-bp.getY(side),ap.getZ(index)-bp.getZ(side))<1e-6);
    }
  }
  const ma=new THREE.Matrix4(),mb=new THREE.Matrix4();
  a.children[3].getMatrixAt(a.children[3].count-1,ma);b.children[3].getMatrixAt(0,mb);
  assert.ok(Math.abs(mb.elements[12]-ma.elements[12]-RAIL_SPACING)<1e-5);
  for(const group of[a,b]) group.traverse(n=>{n.geometry?.dispose();n.material?.dispose();if(n.isInstancedMesh)n.dispose();});
});

test("static batching reduces draws while preserving animated and interactive objects", () => {
  const root=new THREE.Group(),geometry=new THREE.BoxGeometry(),material=new THREE.MeshStandardMaterial();
  const meshes=Array.from({length:12},(_,i)=>{const mesh=new THREE.Mesh(geometry,material);mesh.position.x=i*2;root.add(mesh);return mesh;});
  const moving=new THREE.Group(),truck=new THREE.Mesh(geometry,material);moving.add(truck);root.add(moving);
  const saved=batchStaticScenery(root,[moving]);
  assert.equal(saved,11);assert.equal(truck.parent,moving);assert.equal(moving.parent,root);
  const batch=root.children.find(n=>n.isInstancedMesh);assert.equal(batch.count,12);
  const matrix=new THREE.Matrix4();batch.getMatrixAt(11,matrix);assert.equal(matrix.elements[12],22);
  for(const mesh of meshes) assert.equal(mesh.parent,null);
  geometry.dispose();material.dispose();batch.dispose();
});

test("endless transport joins tangentially, stays separated, and levels its terrain far away", () => {
  const p = createPerimeterBands(createPlotLayout(topology)), transit = createTransitCurves(p);
  const routes = createContinuations(transit), context = createTerrainContext(p, transit.highway, transit.rail, transit.coastline);
  for (const route of routes) {
    assert.ok(continuationPoint(route, 0).distanceTo(route.origin) < 1e-9);
    const tangent = continuationPoint(route, 0.01).sub(route.origin).normalize();
    assert.ok(tangent.dot(route.direction) > 0.99999);
    for (const d of [32, 64, 1000, 10000]) {
      const point = continuationPoint(route, d);
      assert.ok(continuationDistance(point.x, point.z, routes) < 0.01);
      assert.ok(terrainHeightAt(point.x, point.z, context) < 0.10);
      assert.ok(point.x < coastXAt(point.z, p.coast.shoreX) - 1.15);
    }
  }
  for (const kind of ["rail", "highway"]) {
    const pair = routes.filter((route) => route.kind === kind);
    for (let d = 0; d < 2000; d += 8) assert.ok(continuationPoint(pair[0], d).distanceTo(continuationPoint(pair[1], d)) > 20);
  }
});

test("streaming reclaims chunks and preserves shared asset geometry", () => {
  const p = createPerimeterBands(createPlotLayout(topology)), transit = createTransitCurves(p);
  const geometry = new THREE.BoxGeometry(1, 0.02, 1), material = new THREE.MeshBasicMaterial();
  let sourceDisposals = 0; geometry.addEventListener("dispose", () => sourceDisposals++);
  const source = new THREE.Mesh(geometry, material), world = new THREE.Group();
  const water = new THREE.MeshBasicMaterial();
  const stream = new WorldStream({ world, waterMaterial: water, roadModel: source, trackModel: source, treeModel: source,
    context: createTerrainContext(p, transit.highway, transit.rail, transit.coastline),
    heightAt: () => 0, colorAt: () => new THREE.Color(0x889977), siteDistance: () => 10 });
  stream.update({ x: 0, z: 0 }, 40);
  const first = [...stream.chunks.values()];
  for (const location of [100, 1000, 10000, -5000]) {
    stream.update({ x: location, z: location }, 40);
    assert.ok(stream.chunks.size <= 16);
    assert.equal(stream.chunks.size, visibleChunkKeys({ x: location, z: location }, 40).length);
  }
  for (const group of first) assert.equal(group.parent, null);
  stream.dispose(); assert.equal(world.children.length, 0); assert.equal(sourceDisposals, 0);
  geometry.dispose(); material.dispose(); water.dispose();
});

test("terrain tiles meet without height or normal seams and shoreline waves taper to zero", () => {
  const spec = { shoreX: 17, heightAt: (x, z) => Math.sin(x / 7) + Math.cos(z / 9), colorAt: () => new THREE.Color(0x889977) };
  const left = createSurfaceTile(-2, 0, false, spec), right = createSurfaceTile(-1, 0, false, spec);
  for (let row = 0; row <= 24; row++) {
    for (const name of ["position", "normal"]) {
      const a = left.getAttribute(name), b = right.getAttribute(name), ai = row * 25 + 24, bi = row * 25;
      assert.ok(Math.abs(a.getX(ai) - b.getX(bi)) < 1e-6);
      assert.ok(Math.abs(a.getY(ai) - b.getY(bi)) < 1e-6);
      assert.ok(Math.abs(a.getZ(ai) - b.getZ(bi)) < 1e-6);
    }
  }
  for (const t of [0, 1, 14, 120]) {
    assert.equal(oceanWaveHeightAt(coastXAt(11, 17), 11, t, 8, 17), 0);
    let expected = 0;
    for (const w of OCEAN_WAVES.slice(0, 8)) expected += w.amplitude * Math.sin((24 * w.dx + 11 * w.dz) * w.k - t * w.omega + w.phase);
    assert.ok(Math.abs(oceanWaveHeightAt(24, 11, t, 8, 17) - expected) < 1e-12);
  }
  left.dispose(); right.dispose();
});

test("ambient traffic has directional lanes and independent speed profiles", () => {
  assert.equal(HIGHWAY_TRAFFIC_PROFILES.length, 6);
  assert.ok(HIGHWAY_TRAFFIC_PROFILES.some(({ speed }) => speed > 0));
  assert.ok(HIGHWAY_TRAFFIC_PROFILES.some(({ speed }) => speed < 0));
  assert.ok(new Set(HIGHWAY_TRAFFIC_PROFILES.map(({ speed }) => Math.abs(speed))).size >= 5);
  assert.ok(HIGHWAY_TRAFFIC_PROFILES.every(({ variance }) => variance > 0));
  assert.ok(TRAIN_TRAFFIC_PROFILE.variance > 0);
  assert.equal(WATER_TRAFFIC_PROFILES.length, 2);
  assert.notEqual(WATER_TRAFFIC_PROFILES[0].speed, WATER_TRAFFIC_PROFILES[1].speed);
  assert.ok(WATER_TRAFFIC_PROFILES.every(({ variance }) => variance > 0));
});

test("vacant plots form a varied translucent invitation to build", () => {
  const layout = createPlotLayout(topology);
  const vacant = layout.cells.filter((cell) => !layout.occupiedCellKeys.has(`${cell.col}:${cell.row}`));
  assert.ok(vacant.length >= GHOST_MODEL_KEYS.length);
  assert.equal(new Set(GHOST_MODEL_KEYS).size, 3);
  for (const key of GHOST_MODEL_KEYS) assert.ok(ASSET_URLS[key], `missing ghost asset ${key}`);
});

test("the curated Three.js scene references local models from every requested Kenney kit", () => {
  const kits = new Set();
  for (const assetUrl of Object.values(ASSET_URLS)) {
    assert.match(assetUrl, /^\/assets\/kenney\/[a-z-]+\/[a-z0-9-]+\.glb$/);
    const localPath = fileURLToPath(new URL(`../public${assetUrl}`, import.meta.url));
    assert.ok(existsSync(localPath), `missing ${localPath}`);
    const glb = readFileSync(localPath);
    const jsonLength = glb.readUInt32LE(12);
    const manifest = JSON.parse(glb.subarray(20, 20 + jsonLength).toString().replace(/\0+$/, ""));
    for (const image of manifest.images ?? []) {
      if (image.uri) assert.ok(existsSync(path.resolve(path.dirname(localPath), image.uri)), `missing texture ${image.uri}`);
    }
    kits.add(assetUrl.split("/")[3]);
  }
  assert.deepEqual(
    [...kits].sort(),
    ["cars", "commercial", "industrial", "roads", "suburban", "trains", "watercraft"],
  );
  for (const key of ["roads/bend", "roads/curve", "trains/track-corner", "trains/carriage-coal"]) {
    assert.ok(ASSET_URLS[key], `missing requested scene asset ${key}`);
  }
  assert.ok(existsSync(`${ROOT}/public/city3d.bundle.js`));
});
