import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { createRegionalPlan, distanceToRegionalSite, buildRegionalScenery, advanceLaneTraffic } from "./region.js";
import { coastXAt, createCoastalWaterMaterial, oceanWaveHeightAt, OCEAN_WAVE_SETTINGS } from "./ocean.js";
import { WorldStream, createContinuations, continuationDistance } from "./world-stream.js";
import { createBoulevard, roadStrip, continuousRail } from "./transport.js";
import { batchStaticScenery } from "./render-batch.js";
import { advanceCityTraffic, laneCurve, signalPhase, vehiclePose, vehiclesOverlap } from "./city-traffic.js";
import { healthScenery, railSchedule, updatePortLife, updateGulls } from "./city-life.js";
import { MapTapGesture, clampMapLabel } from "./interaction.js";
import { cityRenderPolicy, renderPixelRatio } from "./render-policy.js";
export { oceanWaveHeightAt, OCEAN_WAVE_SETTINGS } from "./ocean.js";
import {
  CONTROL_PLOT_ADDRESSES,
  normalizePlotAddress,
  plotGridSize,
  stablePlotAddresses,
} from "./plot-layout.js";

// Each GLB owns a texture source even when several files reference the same
// palette URL. Three's global ImageBitmap cache can hand independently parsed
// GLBs a bitmap whose source data has already been consumed by Chromium.
// Browser HTTP caching plus this class's per-model cache avoid extra transfers
// without risking black, image-less materials.
THREE.Cache.enabled = false;

const COLORS = Object.freeze({
  ink: 0x171812,
  inkSoft: 0x38464a,
  paper: 0xe7dfbd,
  paperLight: 0xf6f0d9,
  paperDark: 0xc9bf91,
  teal: 0x1f7a75,
  tealBright: 0x48b5a8,
  rust: 0xb64e2b,
  rustBright: 0xef8354,
  road: 0x535a67,
  roadEdge: 0xc5c9d4,
  sand: 0xd8c68f,
  waterShallow: 0x62b7b0,
  waterDeep: 0x235f70,
  waterFoam: 0xeef0d8,
  hillLight: 0x91ae78,
  hillDark: 0x557d63,
  healthy: 0x2f9b74,
  checking: 0xd3a52e,
  unhealthy: 0xc34d35,
  unknown: 0x72766e,
});

export const ASSET_URLS = Object.freeze({
  "industrial/building-c": "/assets/kenney/industrial/building-c.glb",
  "industrial/building-e": "/assets/kenney/industrial/building-e.glb",
  "industrial/building-m": "/assets/kenney/industrial/building-m.glb",
  "industrial/building-p": "/assets/kenney/industrial/building-p.glb",
  "industrial/container-a": "/assets/kenney/industrial/shipping-container-a.glb",
  "industrial/container-b": "/assets/kenney/industrial/shipping-container-b.glb",
  "industrial/tank": "/assets/kenney/industrial/detail-tank-large.glb",
  "commercial/building-a": "/assets/kenney/commercial/building-a.glb",
  "commercial/building-f": "/assets/kenney/commercial/building-f.glb",
  "commercial/building-j": "/assets/kenney/commercial/building-j.glb",
  "commercial/building-k": "/assets/kenney/commercial/building-k.glb",
  "commercial/building-n": "/assets/kenney/commercial/building-n.glb",
  "commercial/skyscraper-e": "/assets/kenney/commercial/building-skyscraper-e.glb",
  "suburban/building-a": "/assets/kenney/suburban/building-type-a.glb",
  "suburban/building-h": "/assets/kenney/suburban/building-type-h.glb",
  "suburban/building-n": "/assets/kenney/suburban/building-type-n.glb",
  "suburban/building-r": "/assets/kenney/suburban/building-type-r.glb",
  "suburban/tree": "/assets/kenney/suburban/tree-large.glb",
  "suburban/tree-small": "/assets/kenney/suburban/tree-small.glb",
  "suburban/building-b": "/assets/kenney/suburban/building-type-b.glb",
  "suburban/building-d": "/assets/kenney/suburban/building-type-d.glb",
  "suburban/building-e": "/assets/kenney/suburban/building-type-e.glb",
  "roads/bend": "/assets/kenney/roads/road-bend.glb",
  "roads/curve": "/assets/kenney/roads/road-curve.glb",
  "roads/straight": "/assets/kenney/roads/road-straight.glb",
  "roads/crossroad": "/assets/kenney/roads/road-crossroad.glb",
  "roads/traffic-light": "/assets/kenney/roads/traffic-light-object-vertical.glb",
  "roads/highway-sign": "/assets/kenney/roads/sign-highway.glb",
  "cars/delivery": "/assets/kenney/cars/delivery.glb",
  "cars/sedan": "/assets/kenney/cars/sedan.glb",
  "cars/taxi": "/assets/kenney/cars/taxi.glb",
  "cars/truck": "/assets/kenney/cars/truck.glb",
  "trains/track": "/assets/kenney/trains/railroad-straight.glb",
  "trains/track-corner": "/assets/kenney/trains/railroad-corner-large.glb",
  "trains/engine": "/assets/kenney/trains/train-diesel-a.glb",
  "trains/passenger-a": "/assets/kenney/trains/train-electric-city-a.glb",
  "trains/passenger-b": "/assets/kenney/trains/train-electric-city-b.glb",
  "trains/passenger-c": "/assets/kenney/trains/train-electric-city-c.glb",
  "trains/regional-engine": "/assets/kenney/trains/train-diesel-b.glb",
  "trains/regional-coach": "/assets/kenney/trains/train-locomotive-passenger-a.glb",
  "trains/carriage": "/assets/kenney/trains/train-carriage-container-blue.glb",
  "trains/carriage-coal": "/assets/kenney/trains/train-carriage-coal.glb",
  "watercraft/tug": "/assets/kenney/watercraft/boat-tug-a.glb",
  "watercraft/cargo": "/assets/kenney/watercraft/ship-cargo-a.glb",
  "watercraft/sail": "/assets/kenney/watercraft/boat-sail-a.glb",
  "watercraft/fishing": "/assets/kenney/watercraft/boat-fishing-small.glb",
  "watercraft/speed": "/assets/kenney/watercraft/boat-speed-a.glb",
  "watercraft/buoy": "/assets/kenney/watercraft/buoy.glb",
});

export const CITY_METRICS = Object.freeze({
  lotSize: 5.25,
  roadWidth: 1.72,
  pitch: 6.97,
});

export const ROAD_TILE_ROTATIONS = Object.freeze({
  horizontal: 0,
  vertical: Math.PI / 2,
});

export const GHOST_MODEL_KEYS = Object.freeze([
  "suburban/building-n",
  "commercial/building-a",
  "industrial/building-p",
]);

export const AMBIENT_DELIVERY_COUNT = 3;
export const REDUCED_MOTION_FRAME_MS = 500;
export const HIGHWAY_SIGN_ROTATION = 0;
export const ROAD_ASSET_METRICS = Object.freeze({
  tileScale: 2.28,
  curveExtent: 2,
  curveRadius: 1.5,
  bendExtent: 1,
  bendRadius: 0.5,
});
export const HIGHWAY_APPROACH = Object.freeze({
  leftTurn: ROAD_ASSET_METRICS.curveRadius * ROAD_ASSET_METRICS.tileScale,
  rightTurn: ROAD_ASSET_METRICS.bendRadius * ROAD_ASSET_METRICS.tileScale,
  leg: 48,
  curveFit: ROAD_ASSET_METRICS.curveExtent * ROAD_ASSET_METRICS.tileScale,
  bendFit: ROAD_ASSET_METRICS.bendExtent * ROAD_ASSET_METRICS.tileScale,
});
export const RAIL_APPROACH = Object.freeze({
  assetScale: 1.48,
  turn: 4 * 1.48,
  leg: 48,
  cornerFit: 4.48727 * 1.48,
});
export const TERRAIN_CONFIG = Object.freeze({
  baseY: -0.075,
  segmentsX: 164,
  segmentsZ: 152,
  octaves: 6,
  baseFrequency: 0.052,
  lacunarity: 2.03,
  persistence: 0.51,
  heightScale: 4.8,
  treeCount: 170,
  grassCount: 2600,
});
export const CAMERA_HOME = Object.freeze({
  position: Object.freeze([-31, 28, -31]),
  target: Object.freeze([-1.5, 0.7, 0]),
});
export const HIGHWAY_TRAFFIC_PROFILES = Object.freeze([
  { key: "cars/sedan", lane: -0.5, speed: 0.028, offset: 0.04, variance: 0.006, frequency: 0.29 },
  { key: "cars/taxi", lane: -0.5, speed: 0.024, offset: 0.39, variance: 0.005, frequency: 0.23 },
  { key: "cars/truck", lane: -0.5, speed: 0.018, offset: 0.72, variance: 0.004, frequency: 0.2 },
  { key: "cars/sedan", lane: 0.5, speed: -0.026, offset: 0.13, variance: 0.005, frequency: 0.27 },
  { key: "cars/taxi", lane: 0.5, speed: -0.031, offset: 0.49, variance: 0.006, frequency: 0.31 },
  { key: "cars/delivery", lane: 0.5, speed: -0.02, offset: 0.81, variance: 0.004, frequency: 0.19 },
].map(Object.freeze));
export const TRAIN_TRAFFIC_PROFILE = Object.freeze({
  speed: 0.0082,
  variance: 0.007,
  frequency: 0.2,
});
export const WATER_TRAFFIC_PROFILES = Object.freeze([
  { speed: 0.0115, variance: 0.008, frequency: 0.22 },
  { speed: -0.0068, variance: 0.006, frequency: 0.17 },
].map(Object.freeze));

const CONTROL_ENTITIES = Object.freeze([
  { id: "git", name: "Git push dock", code: "GIT", kind: "control", modelKey: "industrial/building-p" },
  { id: "deploy-manager", name: "Deploy Manager", code: "DM", kind: "control", modelKey: "commercial/skyscraper-e" },
  { id: "caddy", name: "Caddy gate", code: "TLS", kind: "control", modelKey: "commercial/building-a" },
  { id: "docker", name: "Container yard", code: "CTR", kind: "control", modelKey: "industrial/building-e" },
]);

const ROUTE_MODEL_OVERRIDES = Object.freeze({
  "galaxy-menu": "commercial/building-n",
  portfolio: "commercial/building-f",
  aquarium: "suburban/building-h",
  birds: "suburban/building-r",
  celegans: "industrial/building-c",
  continuity: "commercial/building-j",
  conspiracy: "commercial/building-k",
  androidhell: "industrial/building-m",
});

const ROUTE_MODEL_POOL = Object.freeze([
  "commercial/building-f",
  "commercial/building-j",
  "commercial/building-k",
  "commercial/building-n",
  "suburban/building-a",
  "suburban/building-h",
  "suburban/building-n",
  "suburban/building-r",
  "industrial/building-c",
  "industrial/building-m",
]);

function stableHash(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function chooseBuildingKey(entityId) {
  return ROUTE_MODEL_OVERRIDES[entityId]
    ?? ROUTE_MODEL_POOL[stableHash(entityId) % ROUTE_MODEL_POOL.length];
}

export function createPlotLayout(city = {}) {
  const routes = Array.isArray(city.routes) ? city.routes : [];
  const datastores = Array.isArray(city.datastores) ? city.datastores : [];
  const routeEntities = routes.map((route, index) => ({
    ...route,
    id: route.id,
    name: route.name ?? route.id,
    code: String(index + 1).padStart(2, "0"),
    kind: "route",
    modelKey: chooseBuildingKey(route.id),
  }));
  const storeEntities = datastores.map((store) => ({
    ...store,
    id: store.id,
    name: store.name ?? store.id,
    code: "DB",
    kind: "datastore",
    modelKey: "industrial/tank",
  }));
  const dynamicEntities = [...routeEntities, ...storeEntities];
  const reserved = new Set(CONTROL_PLOT_ADDRESSES.map(({ x, z }) => `${x}:${z}`));
  const fallbackAddresses = stablePlotAddresses(dynamicEntities.length + 64);
  let fallbackIndex = 0;
  const addresses = new Map();
  for (const entity of dynamicEntities) {
    const address = normalizePlotAddress(entity.plot);
    if (!address || reserved.has(`${address.x}:${address.z}`)) continue;
    reserved.add(`${address.x}:${address.z}`);
    addresses.set(entity, address);
  }
  const missing = dynamicEntities
    .filter((entity) => !addresses.has(entity))
    .sort((left, right) => left.id.localeCompare(right.id));
  for (const entity of missing) {
    let address = null;
    while (!address) {
      const candidate = fallbackAddresses[fallbackIndex++];
      if (!candidate) throw new Error("city exhausted its stable plot address space");
      if (!reserved.has(`${candidate.x}:${candidate.z}`)) address = candidate;
    }
    reserved.add(`${address.x}:${address.z}`);
    addresses.set(entity, address);
  }
  const dynamicAssignments = dynamicEntities.map((entity) => ({ ...entity, plot: addresses.get(entity) }));
  const assignedAddresses = [...CONTROL_PLOT_ADDRESSES, ...dynamicAssignments.map(({ plot }) => plot)];
  const size = plotGridSize(assignedAddresses);
  const center = (size - 1) / 2;
  const cells = [];
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      cells.push({
        col,
        row,
        x: (col - center) * CITY_METRICS.pitch,
        z: (row - center) * CITY_METRICS.pitch,
      });
    }
  }
  const cellForAddress = ({ x, z }) => cells.find(
    (cell) => cell.col === x + center && cell.row === z + center,
  );
  const assignments = [
    ...CONTROL_ENTITIES.map((entity, index) => ({
      ...entity,
      plot: CONTROL_PLOT_ADDRESSES[index],
      cell: cellForAddress(CONTROL_PLOT_ADDRESSES[index]),
    })),
    ...dynamicAssignments.map((entity) => ({ ...entity, cell: cellForAddress(entity.plot) })),
  ];

  return {
    size,
    cells,
    occupiedCellKeys: new Set(assignments.map(({ cell }) => `${cell.col}:${cell.row}`)),
    entities: assignments.map(({ cell, ...entity }) => ({ ...entity, ...cell })),
    extent: size * CITY_METRICS.lotSize + (size - 1) * CITY_METRICS.roadWidth,
  };
}

export function createPerimeterBands(layout) {
  const { lotSize, pitch } = CITY_METRICS;
  const minCenter = -((layout.size - 1) * pitch) / 2;
  const maxCenter = -minCenter;
  const bounds = {
    minX: minCenter - lotSize / 2,
    maxX: maxCenter + lotSize / 2,
    minZ: minCenter - lotSize / 2,
    maxZ: maxCenter + lotSize / 2,
  };
  const highwayWidth = 2.28;
  const railWidth = 1.48;
  const highwayZ = bounds.minZ - 4.4;
  const railX = bounds.minX - 5.1;
  const sideStartZ = highwayZ + 4.4;
  const sideEndZ = bounds.maxZ + 5.2;
  const shoreX = bounds.maxX + 3.35;
  // The sea is a world boundary, not a decorative canal. It extends far
  // beyond the camera so its outside edge disappears under the screen haze.
  const oceanX = shoreX + 50;
  const highwayMinX = railX + 3.8;
  const highwayMaxX = shoreX - HIGHWAY_APPROACH.rightTurn - 3;

  const highway = {
    axis: "x",
    x: (highwayMinX + highwayMaxX) / 2,
    z: highwayZ,
    length: highwayMaxX - highwayMinX,
    width: highwayWidth,
    minX: highwayMinX,
    maxX: highwayMaxX,
    minZ: highwayZ - highwayWidth / 2,
    maxZ: highwayZ + highwayWidth / 2,
  };
  const rail = {
    axis: "z",
    x: railX,
    z: (sideStartZ + sideEndZ) / 2,
    length: sideEndZ - sideStartZ,
    width: railWidth,
    minX: railX - railWidth / 2,
    maxX: railX + railWidth / 2,
    minZ: sideStartZ,
    maxZ: sideEndZ,
  };
  const groundMinX = Math.min(
    highway.minX - HIGHWAY_APPROACH.leftTurn,
    rail.minX - RAIL_APPROACH.turn - RAIL_APPROACH.leg,
    bounds.minX,
  ) - 30;
  const groundMinZ = Math.min(
    highway.minZ - HIGHWAY_APPROACH.leftTurn - HIGHWAY_APPROACH.leg,
    rail.minZ - RAIL_APPROACH.turn,
    bounds.minZ,
  ) - 30;
  const groundMaxZ = Math.max(
    rail.maxZ + RAIL_APPROACH.turn + RAIL_APPROACH.leg,
    bounds.maxZ,
  ) + 30;
  const coast = {
    axis: "z",
    x: (shoreX + oceanX) / 2,
    z: (groundMinZ + groundMaxZ) / 2,
    length: groundMaxZ - groundMinZ,
    width: oceanX - shoreX,
    minX: shoreX - 0.9,
    maxX: oceanX,
    minZ: groundMinZ,
    maxZ: groundMaxZ,
    shoreX,
    oceanX,
  };
  const ground = {
    minX: groundMinX,
    // This metadata describes land only. The irregular last column of the
    // generated mesh follows the coastline and never continues under the sea.
    maxX: shoreX + 0.82,
    minZ: groundMinZ,
    maxZ: groundMaxZ,
  };
  ground.x = (ground.minX + ground.maxX) / 2;
  ground.z = (ground.minZ + ground.maxZ) / 2;
  ground.width = ground.maxX - ground.minX;
  ground.depth = ground.maxZ - ground.minZ;

  return { bounds, highway, rail, coast, ground };
}

export function chooseAmbientDeliveryTargets(layout, count = AMBIENT_DELIVERY_COUNT) {
  const routes = layout.entities.filter((entity) => entity.kind === "route");
  const total = Math.min(Math.max(0, count), routes.length);
  return Array.from({ length: total }, (_, index) => routes[Math.floor((index * routes.length) / total)]);
}

export function createHighwaySignTransform(perimeter) {
  return {
    x: perimeter.highway.minX + (0 - perimeter.highway.minX) * 0.48,
    z: perimeter.highway.z,
    rotation: HIGHWAY_SIGN_ROTATION,
  };
}

export function createTransitCurves(perimeter) {
  const highway = perimeter.highway;
  const rail = perimeter.rail;
  const coast = perimeter.coast;
  const kappa = 0.5522847498;

  const highwayLeftStart = new THREE.Vector3(
    highway.minX - HIGHWAY_APPROACH.leftTurn,
    0.16,
    highway.z - HIGHWAY_APPROACH.leftTurn - HIGHWAY_APPROACH.leg,
  );
  const highwayLeftCorner = new THREE.Vector3(
    highway.minX - HIGHWAY_APPROACH.leftTurn,
    0.16,
    highway.z - HIGHWAY_APPROACH.leftTurn,
  );
  const highwayLeftJoin = new THREE.Vector3(highway.minX, 0.16, highway.z);
  const highwayRightJoin = new THREE.Vector3(highway.maxX, 0.16, highway.z);
  const highwayRightCorner = new THREE.Vector3(
    highway.maxX + HIGHWAY_APPROACH.rightTurn,
    0.16,
    highway.z - HIGHWAY_APPROACH.rightTurn,
  );
  const highwayRightEnd = new THREE.Vector3(
    highwayRightCorner.x,
    0.16,
    highwayRightCorner.z - HIGHWAY_APPROACH.leg,
  );
  const highwayStraights = [
    new THREE.LineCurve3(highwayLeftStart, highwayLeftCorner),
    new THREE.LineCurve3(highwayLeftJoin, highwayRightJoin),
    new THREE.LineCurve3(highwayRightCorner, highwayRightEnd),
  ];
  const highwayCorners = [
    new THREE.CubicBezierCurve3(
      highwayLeftCorner,
      highwayLeftCorner.clone().add(new THREE.Vector3(0, 0, HIGHWAY_APPROACH.leftTurn * kappa)),
      highwayLeftJoin.clone().add(new THREE.Vector3(-HIGHWAY_APPROACH.leftTurn * kappa, 0, 0)),
      highwayLeftJoin,
    ),
    new THREE.CubicBezierCurve3(
      highwayRightJoin,
      highwayRightJoin.clone().add(new THREE.Vector3(HIGHWAY_APPROACH.rightTurn * kappa, 0, 0)),
      highwayRightCorner.clone().add(new THREE.Vector3(0, 0, HIGHWAY_APPROACH.rightTurn * kappa)),
      highwayRightCorner,
    ),
  ];
  const highwayPath = new THREE.CurvePath();
  highwayPath.add(highwayStraights[0]);
  highwayPath.add(highwayCorners[0]);
  highwayPath.add(highwayStraights[1]);
  highwayPath.add(highwayCorners[1]);
  highwayPath.add(highwayStraights[2]);

  const railLowerStart = new THREE.Vector3(
    rail.x - RAIL_APPROACH.turn - RAIL_APPROACH.leg,
    0.24,
    rail.minZ - RAIL_APPROACH.turn,
  );
  const railLowerCorner = new THREE.Vector3(
    rail.x - RAIL_APPROACH.turn,
    0.24,
    rail.minZ - RAIL_APPROACH.turn,
  );
  const railLowerJoin = new THREE.Vector3(rail.x, 0.24, rail.minZ);
  const railUpperJoin = new THREE.Vector3(rail.x, 0.24, rail.maxZ);
  const railUpperCorner = new THREE.Vector3(
    rail.x - RAIL_APPROACH.turn,
    0.24,
    rail.maxZ + RAIL_APPROACH.turn,
  );
  const railUpperEnd = new THREE.Vector3(
    railUpperCorner.x - RAIL_APPROACH.leg,
    0.24,
    railUpperCorner.z,
  );
  const railStraights = [
    new THREE.LineCurve3(railLowerStart, railLowerCorner),
    new THREE.LineCurve3(railLowerJoin, railUpperJoin),
    new THREE.LineCurve3(railUpperCorner, railUpperEnd),
  ];
  const railCorners = [
    new THREE.CubicBezierCurve3(
      railLowerCorner,
      railLowerCorner.clone().add(new THREE.Vector3(RAIL_APPROACH.turn * kappa, 0, 0)),
      railLowerJoin.clone().add(new THREE.Vector3(0, 0, -RAIL_APPROACH.turn * kappa)),
      railLowerJoin,
    ),
    new THREE.CubicBezierCurve3(
      railUpperJoin,
      railUpperJoin.clone().add(new THREE.Vector3(0, 0, RAIL_APPROACH.turn * kappa)),
      railUpperCorner.clone().add(new THREE.Vector3(RAIL_APPROACH.turn * kappa, 0, 0)),
      railUpperCorner,
    ),
  ];
  const railPath = new THREE.CurvePath();
  railPath.add(railStraights[0]);
  railPath.add(railCorners[0]);
  railPath.add(railStraights[1]);
  railPath.add(railCorners[1]);
  railPath.add(railStraights[2]);

  const coastline = new THREE.CatmullRomCurve3(
    Array.from({ length: 129 }, (_, index) => {
      const progress = index / 128;
      const z = THREE.MathUtils.lerp(coast.minZ, coast.maxZ, progress);
      return new THREE.Vector3(
        coastXAt(z, coast.shoreX),
        0.045,
        z,
      );
    }),
    false,
    "centripetal",
    0.42,
  );

  return {
    highway: highwayPath,
    highwayStraights,
    highwayCorners,
    highwayAssets: [
      {
        key: "roads/curve",
        // road-curve's authored north port lands on the incoming leg and its
        // west port lands on the highway after this broad quarter turn.
        x: highway.minX - ROAD_ASSET_METRICS.tileScale,
        z: highway.z - ROAD_ASSET_METRICS.tileScale / 2,
        rotation: Math.PI,
        fit: HIGHWAY_APPROACH.curveFit,
      },
      {
        key: "roads/bend",
        // road-bend is authored west-to-north. A clockwise quarter turn puts
        // its north port on the highway and its west port on the exit leg.
        x: highway.maxX + HIGHWAY_APPROACH.rightTurn,
        z: highway.z,
        rotation: -Math.PI / 2,
        fit: HIGHWAY_APPROACH.bendFit,
      },
    ],
    rail: railPath,
    railStraights,
    railCorners,
    railAssets: [
      {
        x: rail.x,
        z: rail.minZ,
        rotation: -Math.PI / 2,
      },
      {
        x: rail.x,
        z: rail.maxZ,
        rotation: 0,
      },
    ],
    coastline,
    shippingLanes: [offsetCurve(coastline, -7.2, 96), offsetCurve(coastline, -11.2, 96)],
  };
}

function normalizedStatus(status) {
  const value = String(status ?? "unknown").toLowerCase();
  if (["healthy", "online", "steady", "ok", "ready"].includes(value)) return "healthy";
  if (["deploying", "active", "building"].includes(value)) return "deploying";
  if (["checking", "starting", "pending", "queued"].includes(value)) return "checking";
  if (["unhealthy", "offline", "failed", "error"].includes(value)) return "unhealthy";
  return "unknown";
}

function statusColor(status) {
  return {
    healthy: COLORS.healthy,
    deploying: COLORS.rustBright,
    checking: COLORS.checking,
    unhealthy: COLORS.unhealthy,
    unknown: COLORS.unknown,
  }[normalizedStatus(status)];
}

function setEntityMetadata(root, entityId) {
  root.traverse((child) => {
    if (child.isMesh) child.userData.entityId = entityId;
  });
}

function prepareAsset(root, key = "") {
  const meshes = [];
  root.traverse((child) => {
    if (child.isMesh) meshes.push(child);
  });
  for (const mesh of meshes) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.geometry.userData.deployManagerSharedAsset = true;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mesh.material = materials.map((material) => {
      material.userData.deployManagerSharedAsset = true;
      if ("roughness" in material) material.roughness = Math.max(0.72, material.roughness ?? 0.72);
      if ("metalness" in material) material.metalness = Math.min(0.16, material.metalness ?? 0.05);
      return material;
    });
    if (!Array.isArray(mesh.material)) [mesh.material] = mesh.material;
    if (mesh.material.length === 1) mesh.material = mesh.material[0];
    if (!key.startsWith("roads/") && !key.startsWith("trains/track") && mesh.geometry?.attributes?.position?.count < 25_000) {
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(mesh.geometry, 32),
        new THREE.LineBasicMaterial({ color: COLORS.ink, transparent: true, opacity: 0.24 }),
      );
      edges.geometry.userData.deployManagerSharedAsset = true;
      edges.material.userData.deployManagerSharedAsset = true;
      edges.name = "ink-outline";
      edges.castShadow = false;
      edges.raycast = () => {};
      mesh.add(edges);
    }
  }
  return root;
}

function disposeObject3D(root, { includeShared = false, includeTextures = false } = {}) {
  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  root?.traverse?.((child) => {
    if (child.isInstancedMesh) child.dispose();
    child.element?.remove?.();
    if (child.geometry && (includeShared || !child.geometry.userData?.deployManagerSharedAsset)) {
      geometries.add(child.geometry);
    }
    const childMaterials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of childMaterials) {
      if (!material || (!includeShared && material.userData?.deployManagerSharedAsset)) continue;
      materials.add(material);
      for (const value of Object.values(material)) {
        if (value?.isTexture && (includeTextures || value.userData.cityGenerated)) textures.add(value);
      }
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) texture.dispose();
}



function smoothRange(low, high, value) {
  const amount = THREE.MathUtils.clamp((value - low) / Math.max(0.0001, high - low), 0, 1);
  return amount * amount * (3 - 2 * amount);
}

function terrainGradient(ix, iz) {
  let hash = Math.imul(ix, 374761393) ^ Math.imul(iz, 668265263) ^ 0x6c8e9cf5;
  hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
  const angle = ((hash ^ (hash >>> 16)) >>> 0) / 4294967296 * Math.PI * 2;
  return [Math.cos(angle), Math.sin(angle)];
}

function perlinNoise2D(x, z) {
  const x0 = Math.floor(x);
  const z0 = Math.floor(z);
  const x1 = x0 + 1;
  const z1 = z0 + 1;
  const sx = x - x0;
  const sz = z - z0;
  const fadeX = sx * sx * sx * (sx * (sx * 6 - 15) + 10);
  const fadeZ = sz * sz * sz * (sz * (sz * 6 - 15) + 10);
  const dot = (ix, iz) => {
    const [gx, gz] = terrainGradient(ix, iz);
    return gx * (x - ix) + gz * (z - iz);
  };
  const lower = THREE.MathUtils.lerp(dot(x0, z0), dot(x1, z0), fadeX);
  const upper = THREE.MathUtils.lerp(dot(x0, z1), dot(x1, z1), fadeX);
  return THREE.MathUtils.lerp(lower, upper, fadeZ) * 1.41421356237;
}

// World-coordinate fBm keeps the terrain continuous across the complete land
// domain. Rotating and translating each octave avoids the axis-aligned grid
// signature that a naive stack of identical noise samples leaves behind.
export function terrainFbmAt(x, z) {
  let sampleX = x * TERRAIN_CONFIG.baseFrequency + 1.73;
  let sampleZ = z * TERRAIN_CONFIG.baseFrequency - 2.41;
  let amplitude = 1;
  let accumulated = 0;
  let amplitudeSum = 0;
  for (let octave = 0; octave < TERRAIN_CONFIG.octaves; octave += 1) {
    accumulated += perlinNoise2D(sampleX, sampleZ) * amplitude;
    amplitudeSum += amplitude;
    const angle = 0.57 + octave * 0.071;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const scaledX = sampleX * TERRAIN_CONFIG.lacunarity;
    const scaledZ = sampleZ * TERRAIN_CONFIG.lacunarity;
    sampleX = scaledX * cosine - scaledZ * sine + 7.13 + octave * 1.37;
    sampleZ = scaledX * sine + scaledZ * cosine - 4.79 + octave * 0.83;
    amplitude *= TERRAIN_CONFIG.persistence;
  }
  return accumulated / Math.max(amplitudeSum, 0.0001);
}

export function vegetationDensityAt(x, z) {
  const broad = terrainFbmAt(x * 0.47 - 31.7, z * 0.47 + 18.9) * 0.5 + 0.5;
  const detail = terrainFbmAt(x * 0.91 + 64.3, z * 0.91 - 52.1) * 0.5 + 0.5;
  return smoothRange(0.34, 0.78, broad * 0.72 + detail * 0.28);
}

const corridorBoundsCache = new WeakMap();
function distanceToPolyline(x, z, points = []) {
  let bounds = corridorBoundsCache.get(points);
  if (!bounds) {
    const xs = points.map(p=>p.x??p[0]), zs = points.map(p=>p.z??p[1]);
    bounds = {minX:Math.min(...xs),maxX:Math.max(...xs),minZ:Math.min(...zs),maxZ:Math.max(...zs)};
    corridorBoundsCache.set(points,bounds);
  }
  const dx = Math.max(bounds.minX-x,0,x-bounds.maxX), dz = Math.max(bounds.minZ-z,0,z-bounds.maxZ);
  // Callers only need exact distances inside the eight-unit terrain shoulder.
  if (dx > 8 || dz > 8) return Math.hypot(dx,dz);
  let minimumSquared = Infinity;
  for (let index = 1; index < points.length; index += 1) {
    const start = points[index - 1];
    const end = points[index];
    const startX = start.x ?? start[0];
    const startZ = start.z ?? start[1];
    const endX = end.x ?? end[0];
    const endZ = end.z ?? end[1];
    const dx = endX - startX;
    const dz = endZ - startZ;
    const lengthSquared = dx * dx + dz * dz;
    const progress = lengthSquared > 0
      ? THREE.MathUtils.clamp(((x - startX) * dx + (z - startZ) * dz) / lengthSquared, 0, 1)
      : 0;
    const ex = x - (startX + dx * progress), ez = z - (startZ + dz * progress);
    minimumSquared = Math.min(minimumSquared, ex * ex + ez * ez);
  }
  return Math.sqrt(minimumSquared);
}

function distanceToCorridors(x, z, corridors = []) {
  let minimum = Infinity;
  for (const points of corridors) minimum = Math.min(minimum, distanceToPolyline(x, z, points));
  return minimum;
}

function distanceOutsideCity(x, z, bounds) {
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerZ = (bounds.minZ + bounds.maxZ) / 2;
  const dx = Math.max(0, Math.abs(x - centerX) - (bounds.maxX - bounds.minX) / 2);
  const dz = Math.max(0, Math.abs(z - centerZ) - (bounds.maxZ - bounds.minZ) / 2);
  return Math.hypot(dx, dz);
}

function shorelineXAt(z, context) {
  const coast = context?.perimeter?.coast ?? context?.coast;
  if (!coast) return Infinity;
  return coastXAt(z, coast.shoreX);
}

export function createTerrainContext(perimeter, highwayCurve, railCurve, coastline) {
  const regionalPlan = createRegionalPlan(perimeter, coastline);
  return {
    perimeter,
    coastline,
    regionalPlan,
    railLength: railCurve.getLength(),
    continuations: createContinuations({ highway: highwayCurve, rail: railCurve }),
    flatCorridors: [highwayCurve, railCurve]
      .filter(Boolean)
      .map((curve) => curve.getSpacedPoints(128))
      .concat(regionalPlan.roads, regionalPlan.walks, [createBoulevard(perimeter.bounds).getSpacedPoints(96)]),
    bounds: {
      minX: perimeter.ground.minX,
      maxX: perimeter.ground.maxX,
      minZ: perimeter.ground.minZ,
      maxZ: perimeter.ground.maxZ,
    },
  };
}

export function terrainHeightAt(x, z, context) {
  const perimeter = context?.perimeter ?? context;
  if (!perimeter?.bounds || !perimeter?.ground || !perimeter?.coast) return TERRAIN_CONFIG.baseY;

  const city = perimeter.bounds;
  const outsideDistance = distanceOutsideCity(x, z, city);
  const terraceBlend = smoothRange(0.45, 8.6, outsideDistance);
  const shoreDistance = shorelineXAt(z, context?.perimeter ? context : perimeter) - x;
  const coastFade = smoothRange(0.3, 6.4, shoreDistance);
  // No finite-domain flattening: streamed chunks share this global heightfield.
  const edgeFade = 1;
  const corridorDistance = Math.min(distanceToCorridors(x, z, context?.flatCorridors), continuationDistance(x, z, context?.continuations));
  const corridorBlend = Number.isFinite(corridorDistance) ? smoothRange(0.9, 6.8, corridorDistance) : 1;

  const primary = terrainFbmAt(x, z);
  const secondary = terrainFbmAt(x + 73.4, z - 41.7);
  const normalized = THREE.MathUtils.clamp(primary * 0.72 + secondary * 0.28, -1, 1) * 0.5 + 0.5;
  // Domain-warped broad ridges give the whole region valleys and shoulders,
  // with higher rocky relief away from the engineered city terrace.
  const warped = terrainFbmAt(x * 0.38 + primary * 4, z * 0.38 + secondary * 4);
  const ridge = Math.max(0, 1 - Math.abs(warped * 2.6));
  const regionalRise = smoothRange(3.5, 19, outsideDistance);
  const naturalElevation = TERRAIN_CONFIG.heightScale
    * (0.04 + normalized * 0.3 + ridge ** 2 * regionalRise * 0.75)
    * terraceBlend
    * coastFade
    * edgeFade;
  // Transport corridors sit on a broad civil-engineered shoulder instead of
  // revealing the flattening mask as a narrow procedural trench.
  const corridorShoulder = (0.13 + normalized * 0.035) * terraceBlend * coastFade * edgeFade;
  const siteBlend = smoothRange(0, 3.2, distanceToRegionalSite(x, z, context?.regionalPlan));
  const elevation = THREE.MathUtils.lerp(corridorShoulder, naturalElevation, corridorBlend) * siteBlend;
  return TERRAIN_CONFIG.baseY + elevation;
}


function fitClone(source, fit = {}) {
  const clone = source.clone(true);
  const bounds = new THREE.Box3().setFromObject(clone);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  if (!fit.preserveOrigin) clone.position.x -= center.x;
  clone.position.y -= bounds.min.y;
  if (!fit.preserveOrigin) clone.position.z -= center.z;

  const width = fit.width ?? 4.2;
  const depth = fit.depth ?? 4.2;
  const height = fit.height ?? 5.2;
  const wrapper = new THREE.Group();
  wrapper.add(clone);
  if (Number.isFinite(fit.scale)) {
    wrapper.scale.setScalar(fit.scale);
  } else if (fit.exact) {
    wrapper.scale.set(
      width / Math.max(size.x, 0.001),
      Math.min(width / Math.max(size.x, 0.001), depth / Math.max(size.z, 0.001)),
      depth / Math.max(size.z, 0.001),
    );
  } else {
    const scale = Math.min(
      width / Math.max(size.x, 0.001),
      depth / Math.max(size.z, 0.001),
      height / Math.max(size.y, 0.001),
    );
    wrapper.scale.setScalar(scale);
  }
  return wrapper;
}

function addOutlinedBox(parent, dimensions, position, material, outlineOpacity = 0.28) {
  const geometry = new THREE.BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  mesh.receiveShadow = true;
  mesh.castShadow = dimensions.y > 0.2;
  parent.add(mesh);
  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: COLORS.ink, transparent: true, opacity: outlineOpacity }),
  );
  outline.position.copy(position);
  parent.add(outline);
  return mesh;
}

function makePolyline(points, material) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  if (material.isLineDashedMaterial) line.computeLineDistances();
  return line;
}

function addBoatWake(boat, { length = 2.8, width = 0.78 } = {}) {
  const wake = new THREE.Group();
  wake.name = "procedural-boat-wake";
  const material = new THREE.LineBasicMaterial({
    color: COLORS.waterFoam,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
  });
  for (const side of [-1, 1]) {
    const trail = makePolyline([
      new THREE.Vector3(side * 0.16, 0.08, -0.42),
      new THREE.Vector3(side * width * 0.46, 0.065, -length * 0.52),
      new THREE.Vector3(side * width, 0.045, -length),
    ], material);
    trail.raycast = () => {};
    wake.add(trail);
  }
  boat.add(wake);
}

function roadCoordinate(index, layout) {
  const minCenter = -((layout.size - 1) * CITY_METRICS.pitch) / 2;
  return minCenter + CITY_METRICS.pitch / 2 + index * CITY_METRICS.pitch;
}

function adjacentRoadIndex(index, towardIndex, size) {
  const candidates = [index - 1, index].filter((candidate) => candidate >= 0 && candidate < size - 1);
  if (towardIndex < index && candidates.includes(index - 1)) return index - 1;
  if (towardIndex > index && candidates.includes(index)) return index;
  const center = (size - 2) / 2;
  return candidates.sort((left, right) => Math.abs(left - center) - Math.abs(right - center) || left - right)[0];
}

export function createStreetAccess(entity, toward, layout, preferredAxis) {
  if (!entity || !toward || !layout || layout.size < 2) return null;
  const columnDistance = Math.abs(toward.col - entity.col);
  const rowDistance = Math.abs(toward.row - entity.row);
  const firstAxis = preferredAxis ?? (columnDistance >= rowDistance ? "vertical" : "horizontal");
  const axes = firstAxis === "vertical" ? ["vertical", "horizontal"] : ["horizontal", "vertical"];

  for (const axis of axes) {
    if (axis === "vertical") {
      const streetColumn = adjacentRoadIndex(entity.col, toward.col, layout.size);
      const nodeRow = adjacentRoadIndex(entity.row, toward.row, layout.size);
      if (streetColumn === undefined || nodeRow === undefined) continue;
      const x = roadCoordinate(streetColumn, layout);
      return {
        axis,
        curb: { x, z: entity.z },
        node: { x, z: roadCoordinate(nodeRow, layout) },
      };
    }

    const streetRow = adjacentRoadIndex(entity.row, toward.row, layout.size);
    const nodeColumn = adjacentRoadIndex(entity.col, toward.col, layout.size);
    if (streetRow === undefined || nodeColumn === undefined) continue;
    const z = roadCoordinate(streetRow, layout);
    return {
      axis,
      curb: { x: entity.x, z },
      node: { x: roadCoordinate(nodeColumn, layout), z },
    };
  }
  return null;
}

function samePoint(left, right) {
  return Math.abs(left.x - right.x) < 0.001 && Math.abs(left.z - right.z) < 0.001;
}

export function createStreetRoutePoints(start, end, layout, options = {}) {
  const startAccess = options.startAccess ?? createStreetAccess(start, end, layout);
  const endAccess = options.endAccess ?? createStreetAccess(end, start, layout);
  if (!startAccess || !endAccess) return [];

  const points = [startAccess.curb, startAccess.node];
  if (startAccess.node.x !== endAccess.node.x && startAccess.node.z !== endAccess.node.z) {
    const horizontalFirst = (stableHash(`${start.id}:${end.id}`) & 1) === 0;
    points.push(horizontalFirst
      ? { x: endAccess.node.x, z: startAccess.node.z }
      : { x: startAccess.node.x, z: endAccess.node.z });
  }
  points.push(endAccess.node, endAccess.curb);
  return points.filter((point, index) => index === 0 || !samePoint(point, points[index - 1]));
}

export function streetCurve(points, height = 0.34) {
  const vectors = points.map((point) => new THREE.Vector3(point.x, height, point.z));
  if (vectors.length < 2) return null;
  const curve = new THREE.CurvePath();
  let cursor = vectors[0].clone();
  const addLine = (to) => {
    if (cursor.distanceToSquared(to) > 0.000001) curve.add(new THREE.LineCurve3(cursor.clone(), to.clone()));
    cursor = to.clone();
  };

  for (let index = 1; index < vectors.length - 1; index += 1) {
    const previous = vectors[index - 1];
    const corner = vectors[index];
    const next = vectors[index + 1];
    const incoming = corner.clone().sub(previous);
    const outgoing = next.clone().sub(corner);
    const incomingLength = incoming.length();
    const outgoingLength = outgoing.length();
    if (!incomingLength || !outgoingLength) continue;
    incoming.normalize();
    outgoing.normalize();
    if (Math.abs(incoming.dot(outgoing)) > 0.999) {
      addLine(corner);
      continue;
    }
    const radius = Math.min(CITY_METRICS.roadWidth * 0.22, incomingLength * 0.34, outgoingLength * 0.34);
    const before = corner.clone().addScaledVector(incoming, -radius);
    const after = corner.clone().addScaledVector(outgoing, radius);
    addLine(before);
    curve.add(new THREE.QuadraticBezierCurve3(before, corner.clone(), after));
    cursor = after;
  }
  addLine(vectors.at(-1));
  return curve;
}

function offsetCurve(curve, offset, samples = 80) {
  const points = [];
  for (let index = 0; index <= samples; index += 1) {
    const progress = index / samples;
    const point = curve.getPointAt(progress);
    const tangent = curve.getTangentAt(Math.min(0.9999, progress)).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    points.push(point.clone().addScaledVector(normal, offset));
  }
  return new THREE.CatmullRomCurve3(points, false, "centripetal", 0.4);
}

function addRibbon(parent, curve, width, material, outlineOpacity = 0.24, samples = 96) {
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let index = 0; index <= samples; index += 1) {
    const progress = index / samples;
    const point = curve.getPointAt(progress);
    const tangent = curve.getTangentAt(Math.min(0.9999, progress)).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const left = point.clone().addScaledVector(normal, width / 2);
    const right = point.clone().addScaledVector(normal, -width / 2);
    positions.push(left.x, left.y, left.z, right.x, right.y, right.z);
    uvs.push(0, progress, 1, progress);
    if (index < samples) {
      const leftIndex = index * 2;
      const rightIndex = leftIndex + 1;
      const nextLeft = leftIndex + 2;
      const nextRight = leftIndex + 3;
      indices.push(leftIndex, rightIndex, nextLeft, rightIndex, nextRight, nextLeft);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const ribbon = new THREE.Mesh(geometry, material);
  ribbon.receiveShadow = true;
  parent.add(ribbon);

  const edgeMaterial = new THREE.LineBasicMaterial({ color: COLORS.ink, transparent: true, opacity: outlineOpacity });
  parent.add(makePolyline(offsetCurve(curve, width / 2, samples).getPoints(samples), edgeMaterial));
  parent.add(makePolyline(offsetCurve(curve, -width / 2, samples).getPoints(samples), edgeMaterial));
  return ribbon;
}

function variableProgress(item, elapsed) {
  const wave = Math.sin(elapsed * (item.speedFrequency ?? 0.31) + (item.speedPhase ?? item.offset * 9))
    * (item.speedVariance ?? 0);
  let progress = item.offset + elapsed * Math.abs(item.speed) + wave;
  progress -= Math.floor(progress);
  return item.speed < 0 ? 1 - progress : progress;
}

function createTextLabel(entity) {
  const label = document.createElement("button");
  label.type = "button";
  label.className = "city3d-label";
  label.dataset.entity = entity.id;
  label.dataset.kind = entity.kind;
  label.setAttribute("aria-label", `Show details for ${entity.name}`);
  label.setAttribute("aria-controls", "selection-details");

  const top = document.createElement("span");
  top.className = "city3d-label-code";
  top.textContent = entity.code;
  const copy = document.createElement("span");
  copy.className = "city3d-label-name";
  copy.textContent = entity.name;
  const state = document.createElement("span");
  state.className = "city3d-label-state";
  state.setAttribute("aria-hidden", "true");
  label.append(top, copy, state);
  return label;
}

class NullCity3D {
  constructor(stage, error) {
    this.stage = stage;
    this.error = error;
    const loading = stage?.querySelector(".city3d-loading");
    if (loading) {
      loading.classList.add("is-error");
      loading.textContent = "3D city unavailable in this browser.";
    }
  }

  setTopology() { return Promise.resolve(false); }
  setStatuses() {}
  setLiveDeployments() {}
  handleReleaseEvent() { return Promise.resolve(false); }
  select() {}
  fit() {}
  zoom() {}
  setVisible() {}
  resetSimulation() {}
  destroy() {}
  simulateDeployment() { return Promise.resolve(false); }
}

export class City3D {
  constructor({ stage, onSelect = () => {}, onNavigate = () => {}, onActivate = () => {} } = {}) {
    if (!stage) throw new Error("City3D requires a stage element");
    this.stage = stage;
    this.renderPolicy = cityRenderPolicy({width: stage.clientWidth, coarsePointer: window.matchMedia("(pointer: coarse)").matches});
    this.stage.dataset.renderProfile = this.renderPolicy.compact ? "mobile" : "desktop";
    this.onSelect = onSelect;
    this.onNavigate = onNavigate;
    this.onActivate = onActivate;
    this.loading = stage.querySelector(".city3d-loading");
    this.assetCache = new Map();
    this.loadedAssets = new Set();
    this.entityGroups = new Map();
    this.pickables = [];
    this.motion = [];
    this.signalMotion = [];
    this.smoke = [];
    this.ambientCouriers = [];
    this.signalFixtures=[];
    this.activeDelivery=null;
    this.trains = [];
    this.waterMaterial = null;
    this.terrainContext = null;
    delete this.stage.dataset.ambientUpdates;
    this.positions = new Map();
    this.layoutEntities = new Map();
    this.worldGeneration = 0;
    this.simulationGeneration = 0;
    this.selectedId = "deploy-manager";
    this.liveAppIds = new Set();
    this.visible = true;
    this.motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.reducedMotion = this.motionPreference.matches;
    this.lastReducedMotionFrame = -Infinity;
    this.stage.dataset.motion = this.reducedMotion ? "reduced" : "full";
    this.onMotionPreferenceChange = (event) => {
      this.reducedMotion = event.matches;
      this.lastReducedMotionFrame = -Infinity;
      this.stage.dataset.motion = this.reducedMotion ? "reduced" : "full";
      if (this.renderer) {
        this.renderer.shadowMap.autoUpdate = false;
        this.renderer.shadowMap.needsUpdate = true;
      }
    };
    this.motionPreference.addEventListener?.("change", this.onMotionPreferenceChange);
    this.startedAt = performance.now();
    this.pointerStart = null;
    this.topology = { routes: [], datastores: [] };
    this.destroyed = false;
    this.hasFitted = false;
    this.currentLiveJobId = null;
    this.currentLivePhase = null;
    this.releaseEventChain = Promise.resolve(true);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(COLORS.paper);

    this.camera = new THREE.OrthographicCamera(-20, 20, 14, -14, 0.1, 1000);
    this.camera.position.set(...CAMERA_HOME.position);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: !this.renderPolicy.compact, powerPreference: "default" });
    this.renderer.setPixelRatio(renderPixelRatio(this.renderPolicy, stage.clientWidth, stage.clientHeight, window.devicePixelRatio || 1));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 0.94;
    this.renderer.shadowMap.enabled = this.renderPolicy.shadows;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.shadowMap.autoUpdate = false;
    this.renderer.shadowMap.needsUpdate = true;
    this.renderer.domElement.className = "city3d-canvas";
    this.renderer.domElement.setAttribute("aria-label", "Interactive 3D map of the Deploy Manager release city");
    this.renderer.domElement.setAttribute("aria-describedby", "city-instructions");
    this.renderer.domElement.setAttribute("role", "application");
    this.renderer.domElement.tabIndex = 0;

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.domElement.className = "city3d-label-layer";
    stage.prepend(this.renderer.domElement);
    stage.append(this.labelRenderer.domElement);

    this.controls = new OrbitControls(this.camera, stage);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.075;
    this.controls.enablePan = true;
    this.controls.screenSpacePanning = false;
    this.controls.enableRotate = true;
    this.controls.minPolarAngle = Math.PI * 0.22;
    this.controls.maxPolarAngle = Math.PI * 0.43;
    this.controls.minZoom = 0.56;
    this.controls.maxZoom = 2.7;
    this.controls.target.set(...CAMERA_HOME.target);
    this.homeAzimuth = Math.atan2(
      this.camera.position.x - this.controls.target.x,
      this.camera.position.z - this.controls.target.z,
    );
    this.onControlsChange = () => { this.updateCompass(); this.labelsDirty = true; };
    this.controls.addEventListener("change", this.onControlsChange);

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (_url, loaded, total) => {
      if (this.loading) this.loading.textContent = `ASSEMBLING CITY · ${loaded}/${total}`;
    };
    this.loader = new GLTFLoader(loadingManager);

    this.world = new THREE.Group();
    this.world.name = "procedural-city";
    this.scene.add(this.world);
    this.addLights();
    this.createSelectionMarker();

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.bindInput();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(stage);
    this.resize();
    this.updateCompass();
    this.animate();
  }

  addLights() {
    const hemisphere = new THREE.HemisphereLight(0xfff7dd, 0x516166, 1.35);
    this.scene.add(hemisphere);
    const sun = new THREE.DirectionalLight(0xfff0cf, 2.4);
    sun.position.set(-18, 31, 20);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -34;
    sun.shadow.camera.right = 34;
    sun.shadow.camera.top = 34;
    sun.shadow.camera.bottom = -34;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 90;
    sun.shadow.bias = -0.00035;
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0x82c7c2, 0.5);
    fill.position.set(20, 11, -20);
    this.scene.add(fill);
  }

  createSelectionMarker() {
    const geometry = new THREE.RingGeometry(2.46, 2.62, 4, 1, Math.PI / 4);
    const material = new THREE.MeshBasicMaterial({
      color: COLORS.rustBright,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.selectionMarker = new THREE.Mesh(geometry, material);
    this.selectionMarker.rotation.x = -Math.PI / 2;
    this.selectionMarker.position.y = 0.24;
    this.selectionMarker.visible = false;
    this.scene.add(this.selectionMarker);
  }

  bindInput() {
    this.tapGesture = new MapTapGesture();
    const pointerdown = (event) => {
      clearTimeout(this.tapFallbackTimer);
      this.tapGesture.down(event);
    };
    const pointerup = (event) => {
      const gesture=this.tapGesture.up(event);
      if(!gesture)return;
      if(!gesture.tap){this.pendingLabelTap=null;this.pendingGhostTap=null;this.suppressGhostClickUntil=performance.now()+400;return;}
      const label = gesture.target?.closest?.(".city3d-label");
      if(label) {
        this.pendingLabelTap={label,at:performance.now()};
        this.tapFallbackTimer=setTimeout(()=>{this.pendingLabelTap=null;this.onSelect(label.dataset.entity,{reveal:true});},350);
        return;
      }
      if(gesture.target?.closest?.(".city3d-ghost-link")) {
        this.suppressGhostClickUntil=0; // A fresh tap is not the preceding swipe's compatibility click.
        const link=gesture.target.closest(".city3d-ghost-link");
        this.pendingGhostTap={link,at:performance.now()};
        // A moving label can lose the synthesized click after a touch orbit.
        // Allow compatibility clicks to finish before presenting a modal, so
        // the same finger cannot click through into a newly exposed setup link.
        this.tapFallbackTimer=setTimeout(()=>{
          this.pendingGhostTap=null;
          const dialog=document.querySelector("#build-city-dialog");
          if(dialog&&!dialog.open){link.focus({preventScroll:true});dialog.showModal();}
        },350);
        return;
      }
      const entityId = gesture.target?.closest?.(".city3d-label")?.dataset.entity ?? this.entityAtPointer(event);
      if (entityId) this.onSelect(entityId);
    };
    const pointercancel = (event) => {this.tapGesture.up(event,true);this.pendingLabelTap=null;this.pendingGhostTap=null;this.suppressGhostClickUntil=performance.now()+400;};
    const click = (event) => {
      const label=event.target.closest?.(".city3d-label");
      const labelTap=this.pendingLabelTap;this.pendingLabelTap=null;
      if(label) {
        clearTimeout(this.tapFallbackTimer);
        event.preventDefault();
        if(event.detail===0 || (labelTap?.label===label && performance.now()-labelTap.at<1000)) this.onSelect(label.dataset.entity,{reveal:true});
        return;
      }
      const pending=this.pendingGhostTap;this.pendingGhostTap=null;
      if(!pending || performance.now()-pending.at>1000)return;
      clearTimeout(this.tapFallbackTimer);
      event.preventDefault();event.stopPropagation();
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey){window.open(pending.link.href,"_blank","noopener,noreferrer");return;}
      const dialog=document.querySelector("#build-city-dialog");
      if(dialog && !dialog.open){pending.link.focus({preventScroll:true});dialog.showModal();}
    };
    const pointermove = (event) => {
      this.tapGesture.move(event);
      if(event.pointerType==="touch")return;
      const isEntity = Boolean(this.entityAtPointer(event));
      this.renderer.domElement.classList.toggle("is-over-entity", isEntity);
    };
    const pointerleave = () => this.renderer.domElement.classList.remove("is-over-entity");
    const keydown = (event) => {
      if(event.target!==this.renderer.domElement)return;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        this.onNavigate(-1);
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        this.onNavigate(1);
      } else if (event.key === "Enter") {
        event.preventDefault();
        this.onActivate();
      } else if (event.key === "Home") {
        event.preventDefault();
        this.fit();
      }
    };
    this.inputHandlers = { pointerdown, pointerup, pointercancel, pointermove, pointerleave, keydown, click };
    for (const [type, handler] of Object.entries(this.inputHandlers)) {
      this.stage.addEventListener(type, handler);
    }
  }

  entityAtPointer(event) {
    const bounds = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    this.pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects(this.pickables, true)
      .find((intersection) => intersection.object.userData.entityId);
    return hit?.object.userData.entityId ?? null;
  }

  updateCompass() {
    this.stage.dataset.cameraZoom=this.camera.zoom.toFixed(3);
    const azimuth = Math.atan2(
      this.camera.position.x - this.controls.target.x,
      this.camera.position.z - this.controls.target.z,
    );
    const degrees = 24 - THREE.MathUtils.radToDeg(azimuth - this.homeAzimuth);
    this.stage.style.setProperty("--north-rotation", `${degrees.toFixed(2)}deg`);
  }

  resize() {
    const width = Math.max(1, this.stage.clientWidth);
    const height = Math.max(1, this.stage.clientHeight);
    const pixelRatio = renderPixelRatio(this.renderPolicy, width, height, window.devicePixelRatio || 1);
    if (this.renderer.getPixelRatio() !== pixelRatio) this.renderer.setPixelRatio(pixelRatio);
    const aspect = width / height;
    const frustum = aspect < .8 && this.layout
      ? Math.max(this.baseFrustum ?? 39, (this.layout.extent * 1.5 + 6) / aspect)
      : this.baseFrustum ?? 39;
    this.camera.left = -(frustum * aspect) / 2;
    this.camera.right = (frustum * aspect) / 2;
    this.camera.top = frustum / 2;
    this.camera.bottom = -frustum / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.labelRenderer.setSize(width, height);
  }

  async loadAsset(key) {
    if (!ASSET_URLS[key]) throw new Error(`Unknown city asset: ${key}`);
    if (!this.assetCache.has(key)) {
      this.assetCache.set(key, this.loader.loadAsync(ASSET_URLS[key]).then((gltf) => {
        this.loadedAssets.add(key);
        return prepareAsset(gltf.scene, key);
      }));
    }
    return this.assetCache.get(key);
  }

  async cloneAsset(key, fit) {
    return fitClone(await this.loadAsset(key), fit);
  }

  clearWorld() {
    this.storyActors=[];this.portLife=null;this.gulls=null;this.stationService=null;this.windowDusk={value:.45};
    this.signalFixtures=[];
    this.activeDelivery=null;
    this.worldStream?.dispose();
    this.worldStream = null;
    this.lastStreamKey = null;
    this.waterMaterial?.dispose();
    this.worldGeneration += 1;
    this.scene.remove(this.world);
    disposeObject3D(this.world);
    this.world = new THREE.Group();
    this.world.name = "procedural-city";
    this.scene.add(this.world);
    this.entityGroups.clear();
    this.pickables = [];
    this.motion = [];
    this.signalMotion = [];
    this.smoke = [];
    this.ambientCouriers = [];
    this.trains = [];
    this.waterMaterial = null;
    this.terrainContext = null;
    this.positions.clear();
    delete this.stage.dataset.ambientUpdates;
    this.layoutEntities.clear();
    this.deliveryTruck = null;
    this.deliveryHome = null;
    this.deliveryAccess = null;
    this.deliveryHomeRotation = 0;
    this.releasePacket = null;
  }

  setTopology(city) {
    this.topology = city ?? { routes: [], datastores: [] };
    return this.rebuild();
  }

  async rebuild() {
    this.resetSimulation();
    this.clearWorld();
    const generation = this.worldGeneration;
    const layout = createPlotLayout(this.topology);
    this.layout = layout;
    this.baseFrustum = Math.max(41, layout.extent + 21);
    this.resize();
    if (this.loading) {
      this.loading.hidden = false;
      this.loading.classList.remove("is-error");
      this.loading.textContent = "ASSEMBLING CITY · 0/0";
    }

    this.buildGround(layout);
    this.buildConnections(layout);
    const jobs = [
      this.buildInfiniteWorld(generation),
      this.buildRoadDetails(layout, generation),
      ...layout.entities.map((entity) => this.addEntity(entity, generation)),
      this.buildAmbientWorld(layout, generation),
    ];
    const results = await Promise.allSettled(jobs);
    if (generation !== this.worldGeneration) return false;
    const failures = results.filter((result) => result.status === "rejected");
    this.stage.dataset.batchedDrawsSaved = String(batchStaticScenery(this.world, [
      ...this.entityGroups.values(), ...this.motion.map((item) => item.object),
      ...this.trains.flatMap((train) => train.cars), ...this.signalMotion.map((item) => item.object),
      ...this.smoke.map((item) => item.puff), this.deliveryTruck, this.releasePacket, ...(this.signalFixtures??[]).map(item=>item.group), ...(this.storyActors??[]),
      ...(this.worldStream?.chunks.values() ?? []), ...(this.worldStream?.routes.values() ?? []),
    ]));
    this.stage.dataset.loadedAssets = [...this.loadedAssets].sort().join(",");
    this.renderer.shadowMap.needsUpdate = true;
    if (this.loading) {
      this.loading.hidden = true;
      if (failures.length) this.stage.dataset.assetWarnings = String(failures.length);
      else delete this.stage.dataset.assetWarnings;
    }
    this.setStatuses(this.topology);
    this.setLiveDeployments([...this.liveAppIds]);
    this.select(this.selectedId);
    if (!this.hasFitted) {
      this.fit();
      this.hasFitted = true;
    }
    return failures.length === 0;
  }

  buildGround(layout) {
    const { lotSize, roadWidth, pitch } = CITY_METRICS;
    const citySpan = layout.extent;
    const minCenter = -((layout.size - 1) * pitch) / 2;
    this.perimeter = createPerimeterBands(layout);
    this.bounds = this.perimeter.bounds;
    this.highwayZ = this.perimeter.highway.z;
    this.highwayMinX = this.perimeter.highway.minX;
    this.highwayMaxX = this.perimeter.highway.maxX;
    this.railX = this.perimeter.rail.x;
    this.railMinZ = this.perimeter.rail.minZ;
    this.railMaxZ = this.perimeter.rail.maxZ;
    this.transitCurves = createTransitCurves(this.perimeter);
    this.highwayCurve = this.transitCurves.highway;
    this.highwayStraights = this.transitCurves.highwayStraights;
    this.highwayAssets = this.transitCurves.highwayAssets;
    this.railCurve = this.transitCurves.rail;
    this.railStraights = this.transitCurves.railStraights;
    this.railAssets = this.transitCurves.railAssets;
    this.coastlineCurve = this.transitCurves.coastline;
    this.shippingLanes = this.transitCurves.shippingLanes;
    this.regionalPlan = createRegionalPlan(this.perimeter, this.coastlineCurve);

    this.addTerrain();

    const lotMaterial = new THREE.MeshStandardMaterial({ color: COLORS.paperLight, roughness: 0.98 });
    const vacantMaterial = new THREE.MeshStandardMaterial({ color: 0xd9d3ac, roughness: 1 });
    for (const cell of layout.cells) {
      const occupied = layout.occupiedCellKeys.has(`${cell.col}:${cell.row}`);
      addOutlinedBox(
        this.world,
        new THREE.Vector3(lotSize, 0.18, lotSize),
        new THREE.Vector3(cell.x, 0, cell.z),
        occupied ? lotMaterial : vacantMaterial,
        occupied ? 0.38 : 0.2,
      );
    }

    const roadMaterial = new THREE.MeshStandardMaterial({ color: COLORS.road, roughness: 0.96 });
    for (let index = 0; index < layout.size - 1; index += 1) {
      const coordinate = minCenter + lotSize / 2 + roadWidth / 2 + index * pitch;
      addOutlinedBox(
        this.world,
        new THREE.Vector3(roadWidth, 0.12, citySpan),
        new THREE.Vector3(coordinate, 0.08, 0),
        roadMaterial,
        0.2,
      );
      addOutlinedBox(
        this.world,
        new THREE.Vector3(citySpan, 0.12, roadWidth),
        new THREE.Vector3(0, 0.08, coordinate),
        roadMaterial,
        0.2,
      );
    }

    this.waterMaterial = createCoastalWaterMaterial(this.perimeter.coast.shoreX);

    this.addProceduralRail();
  }

  addTerrain() {
    this.terrainContext = createTerrainContext(
      this.perimeter,
      this.highwayCurve,
      this.railCurve,
      this.coastlineCurve,
    );
    this.addTerrainGrass();
  }

  async buildInfiniteWorld(generation) {
    const [roadModel, treeModel] = await Promise.all([
      this.cloneAsset("roads/straight", { width: 32 / 14, depth: 2.28, exact: true }),
      this.cloneAsset("suburban/tree", { width: 1.3, depth: 1.3, height: 2.8 }),
    ]);
    if (generation !== this.worldGeneration) return;
    this.worldStream = new WorldStream({
      resolution: this.renderPolicy.surfaceResolution, treeCount: this.renderPolicy.treeCount,
      world: this.world, waterMaterial: this.waterMaterial, roadModel, treeModel, context: this.terrainContext,
      heightAt: (x, z) => terrainHeightAt(x, z, this.terrainContext),
      colorAt: (x, z) => {
        const shore = shorelineXAt(z, this.terrainContext) - x;
        const outside = distanceOutsideCity(x, z, this.bounds);
        const color = new THREE.Color(COLORS.paperDark).lerp(
          new THREE.Color(COLORS.hillLight).lerp(new THREE.Color(COLORS.hillDark), vegetationDensityAt(x, z) * 0.52),
          smoothRange(0.75, 4.8, outside),
        );
        return color.lerp(new THREE.Color(COLORS.sand), 1 - smoothRange(0.15, 1.7, shore));
      },
      siteDistance: (x, z) => Math.min(distanceOutsideCity(x, z, this.bounds),
        distanceToCorridors(x, z, this.terrainContext.flatCorridors),
        continuationDistance(x, z, this.terrainContext.continuations)),
    });
    this.updateWorldStream();
    while (this.worldStream?.pendingCount && generation === this.worldGeneration) {
      await new Promise(resolve=>requestAnimationFrame(resolve));
    }
  }

  updateWorldStream() {
    if (!this.worldStream) return;
    const halfWidth = (this.camera.right - this.camera.left) / (2 * this.camera.zoom);
    const halfHeight = (this.camera.top - this.camera.bottom) / (2 * this.camera.zoom);
    const polar = this.controls.getPolarAngle();
    const radius = Math.ceil(Math.hypot(halfWidth, halfHeight / Math.cos(polar)) + 20);
    const key = `${Math.floor(this.controls.target.x / 8)}:${Math.floor(this.controls.target.z / 8)}:${Math.ceil(radius / 8)}:${Math.round(this.controls.getAzimuthalAngle()*16)}`;
    if (key === this.lastStreamKey) return;
    this.lastStreamKey = key;
    this.camera.updateMatrixWorld(true);
    const frustum=new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse));
    this.worldStream.update(this.controls.target, Math.ceil(radius / 8) * 8,{frustum,deferred:true});
    this.stage.dataset.worldChunks = String(this.worldStream.chunks.size);
    this.stage.dataset.transportChunks = String(this.worldStream.routes.size);
    this.stage.dataset.worldCenter = `${Math.round(this.controls.target.x)},${Math.round(this.controls.target.z)}`;
    this.renderer.shadowMap.needsUpdate = true;
  }

  addTerrainGrass() {
    const context = this.terrainContext;
    if (!context) return;
    const blade = new THREE.ConeGeometry(0.055, 0.34, 3, 1);
    blade.translate(0, 0.17, 0);
    const material = new THREE.MeshStandardMaterial({
      color: COLORS.hillLight,
      roughness: 1,
      flatShading: true,
    });
    const grass = new THREE.InstancedMesh(blade, material, TERRAIN_CONFIG.grassCount);
    grass.name = "instanced-whole-domain-grass";
    grass.castShadow = false;
    grass.receiveShadow = true;
    grass.raycast = () => {};
    grass.frustumCulled = false;
    const transform = new THREE.Object3D();
    const pale = new THREE.Color(COLORS.hillLight);
    const deep = new THREE.Color(COLORS.hillDark);
    let placed = 0;
    for (let index = 0; index < 18000 && placed < TERRAIN_CONFIG.grassCount; index += 1) {
      const randomX = ((Math.sin(index * 78.233 + 1.17) * 43758.5453) % 1 + 1) % 1;
      const randomZ = ((Math.sin(index * 39.417 + 7.31) * 24634.6345) % 1 + 1) % 1;
      const shore = context.coastline.getPoint(randomZ);
      const x = THREE.MathUtils.lerp(context.bounds.minX + 2.8, shore.x - 2.05, randomX);
      const z = shore.z;
      const outside = distanceOutsideCity(x, z, context.perimeter.bounds);
      const corridorDistance = distanceToCorridors(x, z, context.flatCorridors);
      const horizonDistance = Math.min(
        x - context.bounds.minX,
        z - context.bounds.minZ,
        context.bounds.maxZ - z,
      );
      const y = terrainHeightAt(x, z, context);
      const density = vegetationDensityAt(x, z);
      const densityRoll = (stableHash(`grass-density:${index}`) % 1000) / 1000;
      if (
        outside < 3.1
        || corridorDistance < 2.65
        || continuationDistance(x, z, context.continuations) < 2
        || distanceToRegionalSite(x, z, this.regionalPlan) < 1.2
        || horizonDistance < 10.8
        || y < TERRAIN_CONFIG.baseY + 0.2
        || densityRoll > 0.18 + density * 0.78
      ) continue;

      const scale = 0.58 + density * 0.42 + ((stableHash(`grass:${index}`) % 45) / 100);
      transform.position.set(x, y - 0.015, z);
      transform.rotation.set(0, (stableHash(`grass-yaw:${index}`) % 6283) / 1000, 0);
      transform.scale.set(scale, scale * (0.88 + (index % 7) * 0.035), scale);
      transform.updateMatrix();
      grass.setMatrixAt(placed, transform.matrix);
      grass.setColorAt(placed, pale.clone().lerp(deep, 0.12 + density * 0.58));
      placed += 1;
    }
    grass.count = placed;
    grass.instanceMatrix.needsUpdate = true;
    if (grass.instanceColor) grass.instanceColor.needsUpdate = true;
    this.world.add(grass);
  }

  addProceduralRail() {
    const length = this.railCurve.getLength();
    this.world.add(continuousRail((distance) => this.railCurve.getPointAt(THREE.MathUtils.clamp(distance / length, 0, 1)), 0, length));
  }

  buildConnections(layout) {
    for (const entity of layout.entities) {
      this.positions.set(entity.id, new THREE.Vector3(entity.x, 0.3, entity.z));
      this.layoutEntities.set(entity.id, entity);
    }

    const publicMaterial = new THREE.LineBasicMaterial({ color: COLORS.teal, transparent: true, opacity: 0.72 });
    for (const route of this.topology.routes ?? []) {
      const curve = this.streetCurveBetween("caddy", route.id, 0.34);
      if (!curve) continue;
      this.world.add(makePolyline(curve.getPoints(26), publicMaterial));
      const packet = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.12, 0),
        new THREE.MeshBasicMaterial({ color: COLORS.tealBright }),
      );
      packet.castShadow = true;
      this.world.add(packet);
      this.signalMotion.push({ object: packet, curve, speed: 0.035 + (stableHash(route.id) % 15) / 1000, offset: (stableHash(route.id) % 100) / 100 });
    }

    const releaseMaterial = new THREE.LineBasicMaterial({ color: COLORS.rust, transparent: true, opacity: 0.86 });
    this.releaseCurves = {
      gitToManager: this.streetCurveBetween("git", "deploy-manager", 0.48),
      managerToDocker: this.streetCurveBetween("deploy-manager", "docker", 0.48),
    };
    for (const curve of Object.values(this.releaseCurves)) {
      if (curve) this.world.add(makePolyline(curve.getPoints(20), releaseMaterial));
    }

    const privateMaterial = new THREE.LineDashedMaterial({ color: COLORS.rust, dashSize: 0.35, gapSize: 0.24, transparent: true, opacity: 0.75 });
    for (const store of this.topology.datastores ?? []) {
      for (const routeId of store.connectedTo ?? []) {
        const curve = this.streetCurveBetween(store.id, routeId, 0.28);
        if (!curve) continue;
        this.world.add(makePolyline(curve.getPoints(20), privateMaterial));
      }
    }
  }

  streetCurveBetween(startId, endId, height = 0.34, options = {}) {
    const start = this.layoutEntities.get(startId);
    const end = this.layoutEntities.get(endId);
    if (!start || !end || !this.layout) return null;
    return streetCurve(createStreetRoutePoints(start, end, this.layout, options), height);
  }

  async buildRoadDetails(layout, generation) {
    const { lotSize, roadWidth, pitch } = CITY_METRICS;
    const minCenter = -((layout.size - 1) * pitch) / 2;
    const jobs = [];
    const roadSource = await this.cloneAsset("roads/straight", { width: 1, depth: 1, exact: true });
    if (generation !== this.worldGeneration) return;
    const boulevard = createBoulevard(this.bounds), boulevardLength = boulevard.getLength();
    for(const line of boulevard.curves.filter(curve=>curve.isLineCurve3)) {
      const length=line.getLength();this.world.add(roadStrip(roadSource,d=>line.getPointAt(d/length),length,roadWidth));
    }
    const {minX,maxX,minZ,maxZ}=this.bounds,o=1.05;
    for(const [x,z,rotation] of [[maxX+o,minZ-o,0],[maxX+o,maxZ+o,-Math.PI/2],[minX-o,maxZ+o,Math.PI],[minX-o,minZ-o,Math.PI/2]]) {
      jobs.push(this.placeAsset("roads/bend",{x,z,y:.145,rotation,fit:{scale:roadWidth}},generation));
    }
    for (let row = 0; row < layout.size - 1; row += 1) {
      const z = minCenter + lotSize / 2 + roadWidth / 2 + row * pitch;
      for (let col = 0; col < layout.size; col += 1) {
        const x = minCenter + col * pitch;
        jobs.push(this.placeAsset("roads/straight", {
          x,
          y: 0.15,
          z,
          rotation: ROAD_TILE_ROTATIONS.horizontal,
          fit: { width: lotSize, depth: roadWidth, height: 0.18, exact: true },
        }, generation));
      }
    }
    for (let col = 0; col < layout.size - 1; col += 1) {
      const x = minCenter + lotSize / 2 + roadWidth / 2 + col * pitch;
      for (let row = 0; row < layout.size; row += 1) {
        const z = minCenter + row * pitch;
        jobs.push(this.placeAsset("roads/straight", {
          x,
          y: 0.15,
          z,
          rotation: ROAD_TILE_ROTATIONS.vertical,
          fit: { width: lotSize, depth: roadWidth, height: 0.18, exact: true },
        }, generation));
      }
    }
    for (let row = 0; row < layout.size - 1; row += 1) {
      for (let col = 0; col < layout.size - 1; col += 1) {
        const x = minCenter + lotSize / 2 + roadWidth / 2 + col * pitch;
        const z = minCenter + lotSize / 2 + roadWidth / 2 + row * pitch;
        jobs.push(this.placeAsset("roads/crossroad", { x, y: 0.16, z, fit: { width: roadWidth, depth: roadWidth, height: 0.2, exact: true } }, generation));
      }
    }

    const highwaySign = createHighwaySignTransform(this.perimeter);
    jobs.push(this.placeAsset("roads/highway-sign", {
      x: highwaySign.x,
      y: 0.18,
      z: highwaySign.z,
      rotation: highwaySign.rotation,
      fit: { width: 5, depth: 4.5, height: 4.2 },
    }, generation));
    jobs.push(this.addHighwayRoadAssets(generation));
    // Join all twelve former street ends to the circulating outer boulevard.
    for (let i = 0; i < layout.size - 1; i++) {
      const coordinate = minCenter + lotSize / 2 + roadWidth / 2 + i * pitch;
      for (const sign of [-1, 1]) {
        const boundary = sign * this.bounds.maxX;
        for (const axis of ["x", "z"]) {
          const start = axis === "x" ? new THREE.Vector3(boundary,0.15,coordinate) : new THREE.Vector3(coordinate,0.15,boundary);
          const end = start.clone(); end[axis] += sign * 1.05;
          const c = new THREE.LineCurve3(start,end); this.world.add(roadStrip(roadSource,(d)=>c.getPointAt(d/1.05),1.05,roadWidth));
          jobs.push(this.placeAsset("roads/crossroad", { x:end.x,z:end.z,y:0.17,fit:{width:roadWidth,depth:roadWidth,exact:true}},generation));
        }
      }
    }
    await Promise.all(jobs);
  }

  async addHighwayRoadAssets(generation) {
    const straightRuns = this.highwayStraights.map((curve) => this.placeTransitAssetRun(
      "roads/straight",
      curve,
      {
        crossWidth: this.perimeter.highway.width,
        maxSegmentLength: 2.28,
        y: 0.145,
        localAxis: "x",
      },
      generation,
    ));
    const turns = this.highwayAssets.map((asset) => this.placeAsset(asset.key, {
      x: asset.x,
      y: 0.145,
      z: asset.z,
      rotation: asset.rotation,
      fit: { scale: ROAD_ASSET_METRICS.tileScale },
    }, generation));
    await Promise.all([...straightRuns, ...turns]);
  }

  async placeTransitAssetRun(key, curve, options, generation) {
    if (key === "roads/straight") {
      const source = await this.cloneAsset(key, { width:1,depth:1,exact:true });
      if (generation !== this.worldGeneration) return;
      const length = curve.getLength();
      this.world.add(roadStrip(source,(d)=> {const p=curve.getPointAt(d/length);p.y=options.y;return p;},length,options.crossWidth));
      return;
    }
    const length = curve.getLength();
    const segmentCount = Math.max(1, Math.ceil(length / options.maxSegmentLength));
    const segmentLength = length / segmentCount;
    await Promise.all(Array.from({ length: segmentCount }, async (_, index) => {
      const fit = options.localAxis === "x"
        ? { width: segmentLength, depth: options.crossWidth, height: 0.24, exact: true }
        : { width: options.crossWidth, depth: segmentLength, height: 0.32, exact: true };
      const model = await this.cloneAsset(key, fit);
      if (generation !== this.worldGeneration) return;
      const progress = (index + 0.5) / segmentCount;
      const point = curve.getPointAt(progress);
      const tangent = curve.getTangentAt(progress);
      model.name = `${key}:segment-${index + 1}`;
      model.position.copy(point);
      model.position.y = options.y;
      model.rotation.y = options.localAxis === "x"
        ? -Math.atan2(tangent.z, tangent.x)
        : Math.atan2(tangent.x, tangent.z);
      this.world.add(model);
    }));
  }

  async placeAsset(key, options, generation) {
    const model = await this.cloneAsset(key, options.fit);
    if (generation !== this.worldGeneration) return null;
    model.position.set(options.x, options.y ?? 0.12, options.z);
    model.rotation.y = options.rotation ?? 0;
    this.world.add(model);
    return model;
  }

  async addEntity(entity, generation) {
    const isManager = entity.id === "deploy-manager";
    const isDocker = entity.id === "docker";
    const fit = entity.kind === "datastore"
      ? { width: 3.4, depth: 3.4, height: 4.5 }
      : isManager
        ? { width: 3.75, depth: 3.75, height: 7.2 }
        : isDocker
          ? { width: 3.15, depth: 3.15, height: 4.4 }
          : { width: 4.18, depth: 4.18, height: 5.25 };
    let model;
    try {
      model = await this.cloneAsset(entity.modelKey, fit);
    } catch {
      model = new THREE.Group();
      addOutlinedBox(
        model,
        new THREE.Vector3(3.3, 2.5, 3.3),
        new THREE.Vector3(0, 1.25, 0),
        new THREE.MeshStandardMaterial({ color: COLORS.paperLight, roughness: 1 }),
      );
    }
    if (generation !== this.worldGeneration) return;

    const group = new THREE.Group();
    group.name = `entity:${entity.id}`;
    group.position.set(entity.x, 0.17, entity.z);
    group.userData = { entityId: entity.id, appId: entity.appId, status: entity.status, modelRoot: model };
    model.position.y = 0.02;
    group.add(model);

    const pedestalMaterial = new THREE.MeshStandardMaterial({
      color: entity.kind === "control" ? COLORS.inkSoft : entity.kind === "datastore" ? 0xd59a75 : 0xdfd7b4,
      roughness: 0.95,
    });
    const pedestal = addOutlinedBox(
      group,
      new THREE.Vector3(4.62, 0.14, 4.62),
      new THREE.Vector3(0, -0.02, 0),
      pedestalMaterial,
      0.42,
    );
    pedestal.userData.entityId = entity.id;

    if (isDocker) await this.addDockerCargo(group, generation);
    const bounds = new THREE.Box3().setFromObject(group);
    const height = Math.max(2.1, bounds.max.y - group.position.y);
    const labelElement = createTextLabel(entity);
    const labelAnchor = document.createElement("div");
    labelAnchor.className = "city3d-label-anchor";
    labelAnchor.append(labelElement);
    const labelObject = new CSS2DObject(labelAnchor);
    labelObject.center.set(.5, 1);
    const labelNudge = entity.col === 0 ? 0.72 : entity.col === this.layout.size - 1 ? -0.72 : 0;
    labelObject.position.set(labelNudge, height + 0.62, 0);
    group.add(labelObject);

    const beacon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.18, 0),
      new THREE.MeshBasicMaterial({ color: statusColor(entity.status), transparent: true, opacity: 0.96 }),
    );
    beacon.position.set(0, height + 0.28, 0);
    group.add(beacon);
    group.userData.beacon = beacon;
    group.userData.labelElement = labelElement;
    group.userData.baseScale = model.scale.clone();
    group.userData.height = height;
    setEntityMetadata(group, entity.id);
    group.traverse((child) => {
      if (child.isMesh && child !== beacon) this.pickables.push(child);
    });
    this.world.add(group);
    this.entityGroups.set(entity.id, group);
    healthScenery(group);
    if (entity.modelKey.startsWith("industrial/building-e") || entity.modelKey.startsWith("industrial/building-m")) {
      this.addSmoke(group, height);
    }
  }

  async addDockerCargo(group, generation) {
    const [left, right] = await Promise.all([
      this.cloneAsset("industrial/container-a", { width: 1.12, depth: 1.72, height: 0.95 }),
      this.cloneAsset("industrial/container-b", { width: 1.12, depth: 1.72, height: 0.95 }),
    ]);
    if (generation !== this.worldGeneration) return;
    left.position.set(-1.34, 0.12, 1.25);
    right.position.set(0.18, 0.12, 1.25);
    left.rotation.y = right.rotation.y = Math.PI / 2;
    group.add(left, right);
    group.userData.yardContainers = [left, right];
  }

  addSmoke(group, height) {
    const material = new THREE.MeshBasicMaterial({ color: 0xbfc3bd, transparent: true, opacity: 0.28, depthWrite: false });
    for (let index = 0; index < 4; index += 1) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.16 + index * 0.035, 8, 6), material.clone());
      puff.position.set(0.54, height * 0.72 + index * 0.34, -0.32);
      group.add(puff);
      this.smoke.push({ puff, baseX: puff.position.x, baseY: puff.position.y, phase: index / 4 });
    }
  }

  async buildAmbientWorld(layout, generation) {
    const vacant = layout.cells.filter((cell) => !layout.occupiedCellKeys.has(`${cell.col}:${cell.row}`));
    await Promise.all([
      this.addGhostTown(vacant, generation),
      this.addTerrainTrees(generation),
      this.addHighwayTraffic(generation),
      this.addRailTraffic(generation),
      this.addWaterTraffic(generation),
      this.addDeliveryTruck(generation),
      this.addAmbientDeliveryLoops(generation),
      buildRegionalScenery(this, generation, {
        heightAt: (x, z) => terrainHeightAt(x, z, this.terrainContext),
        siteDistance: (x, z) => Math.min(
          distanceOutsideCity(x, z, this.bounds),
          distanceToCorridors(x, z, this.terrainContext.flatCorridors),
        ),
      }),
    ]);
  }

  async addGhostTown(cells, generation) {
    const plots = cells.slice(0, GHOST_MODEL_KEYS.length);
    const ghosts = await Promise.all(plots.map(async (cell, index) => {
      const ghost = await this.cloneAsset(GHOST_MODEL_KEYS[index], {
        width: 3.65,
        depth: 3.65,
        height: index === 1 ? 5.1 : 4.25,
      });
      return { cell, ghost, index };
    }));
    if (generation !== this.worldGeneration) return;

    for (const { cell, ghost, index } of ghosts) {
      const half = CITY_METRICS.lotSize * 0.39;
      const foundation = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-half, 0, -half),
          new THREE.Vector3(half, 0, -half),
          new THREE.Vector3(half, 0, half),
          new THREE.Vector3(-half, 0, half),
        ]),
        new THREE.LineDashedMaterial({
          color: index === 1 ? COLORS.rust : COLORS.teal,
          dashSize: 0.34,
          gapSize: 0.22,
          transparent: true,
          opacity: 0.72,
        }),
      );
      foundation.name = `future-foundation:${index + 1}`;
      foundation.position.set(cell.x, 0.23, cell.z);
      foundation.computeLineDistances();
      foundation.raycast = () => {};
      this.world.add(foundation);
      ghost.name = `ghost-plot:${index + 1}`;
      ghost.position.set(cell.x, 0.14, cell.z);
      ghost.traverse((child) => {
        if (child.isLineSegments) {
          child.material = child.material.clone();
          delete child.material.userData.deployManagerSharedAsset;
          child.material.transparent = true;
          child.material.opacity = 0.13;
          child.material.depthWrite = false;
          return;
        }
        if (!child.isMesh) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        const translucent = materials.map((material) => {
          const copy = material.clone();
          delete copy.userData.deployManagerSharedAsset;
          copy.transparent = true;
          copy.opacity = 0.18;
          copy.depthWrite = false;
          return copy;
        });
        child.material = Array.isArray(child.material) ? translucent : translucent[0];
        child.castShadow = false;
        child.receiveShadow = false;
        child.raycast = () => {};
      });
      this.world.add(ghost);
    }

    if (!ghosts.length) return;
    const anchor = ghosts[Math.floor(ghosts.length / 2)];
    const link = document.createElement("a");
    link.className = "city3d-ghost-link";
    link.href = "https://github.com/YesterdaysLemon/deploy-manager";
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "BUILD YOUR OWN CITY ↗";
    link.setAttribute("aria-label", "Build your own city — setup options");
    link.addEventListener("click",event=>{
      clearTimeout(this.tapFallbackTimer);
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      const dialog=document.querySelector("#build-city-dialog");
      if(dialog?.showModal){event.preventDefault();event.stopPropagation();if(performance.now()>(this.suppressGhostClickUntil??0)&&!dialog.open)dialog.showModal();}
    });
    const anchorElement=document.createElement("div");anchorElement.className="city3d-ghost-anchor";anchorElement.append(link);
    const label = new CSS2DObject(anchorElement);
    label.center.set(.5,1);
    label.onAfterRender=(_renderer,_scene,camera)=>{
      if(this.stage.clientWidth>700)return;
      const point=new THREE.Vector3().setFromMatrixPosition(label.matrixWorld).project(camera);
      const position=clampMapLabel((point.x+1)*this.stage.clientWidth/2,(1-point.y)*this.stage.clientHeight/2,anchorElement.offsetWidth,anchorElement.offsetHeight,this.stage.clientWidth,this.stage.clientHeight);
      anchorElement.style.transform=`translate(-50%, -100%) translate(${position.x}px, ${position.y}px)`;
    };
    label.position.set(anchor.cell.x, 5.7, anchor.cell.z);
    this.world.add(label);
  }

  async addTerrainTrees(generation) {
    const placements = [];
    const terrain = this.terrainContext;
    if (!terrain) return;
    for (let index = 0; index < 6000 && placements.length < TERRAIN_CONFIG.treeCount; index += 1) {
      const randomX = ((Math.sin(index * 91.731 + 0.43) * 43758.5453) % 1 + 1) % 1;
      const randomZ = ((Math.sin(index * 47.173 + 2.17) * 24634.6345) % 1 + 1) % 1;
      const shore = terrain.coastline.getPoint(randomZ);
      // Concentrate the finite tree budget in the explorable near region.
      const x = THREE.MathUtils.lerp(terrain.perimeter.bounds.minX - 32, shore.x - 3.2, randomX);
      const z = THREE.MathUtils.lerp(terrain.perimeter.bounds.minZ - 30, terrain.perimeter.bounds.maxZ + 38, randomZ);
      const y = terrainHeightAt(x, z, terrain);
      const density = vegetationDensityAt(x, z);
      const densityRoll = (stableHash(`tree-density:${index}`) % 1000) / 1000;
      const horizonDistance = Math.min(
        x - terrain.bounds.minX,
        z - terrain.bounds.minZ,
        terrain.bounds.maxZ - z,
      );
      if (
        y < 0.42
        || distanceOutsideCity(x, z, terrain.perimeter.bounds) < 2.8
        || distanceToCorridors(x, z, terrain.flatCorridors) < 2.3
        || continuationDistance(x, z, terrain.continuations) < 3.4
        || distanceToRegionalSite(x, z, this.regionalPlan) < 1.3
        || horizonDistance < 11.4
        || densityRoll > 0.2 + density ** 1.15
        || placements.some((tree) => Math.hypot(tree.x - x, tree.z - z) < 1.15)
      ) continue;
      placements.push({ x, y, z, height: 1.9 + density * 1.3 + ((index * 37) % 9) * 0.13 });
    }
    const trees = await Promise.all(placements.map(async (placement, index) => {
      const tree = await this.cloneAsset(index % 3 ? "suburban/tree" : "suburban/tree-small", {
        width: placement.height * 0.65,
        depth: placement.height * 0.65,
        height: placement.height,
      });
      tree.name = `terrain-tree:${index + 1}`;
      tree.position.set(placement.x, placement.y - 0.04, placement.z);
      tree.rotation.y = (stableHash(`terrain-tree:${index}`) % 628) / 100;
      return tree;
    }));
    if (generation !== this.worldGeneration) return;
    for (const tree of trees) if (tree) this.world.add(tree);
  }

  async addHighwayTraffic(generation) {
    const laneCurves = new Map([
      [-0.5, offsetCurve(this.highwayCurve, -0.5, 96)],
      [0.5, offsetCurve(this.highwayCurve, 0.5, 96)],
    ]);
    await Promise.all(HIGHWAY_TRAFFIC_PROFILES.map(async (spec, index) => {
      const isTruck = spec.key === "cars/truck";
      const car = await this.cloneAsset(spec.key, {
        width: isTruck ? 1.08 : 0.96,
        depth: isTruck ? 2.12 : 1.82,
        height: isTruck ? 1.08 : 0.9,
      });
      if (generation !== this.worldGeneration) return;
      this.world.add(car);
      this.motion.push({
        object: car,
        curve: laneCurves.get(spec.lane),
        speed: spec.speed,
        offset: spec.offset,
        rotationOffset: spec.speed < 0 ? Math.PI : 0,
        speedVariance: spec.variance,
        speedFrequency: spec.frequency,
        speedPhase: index * 1.37,
        wrap: true,
        trafficLane: spec.lane,
        vehicleLength: isTruck ? 2.12 : 1.82,
        cruiseSpeed: Math.abs(spec.speed) * 80,
      });
    }));
  }

  async addRailTraffic(generation) {
    const trackLength = this.railCurve.getLength();
    const [engine, carriageA, carriageCoal, carriageB] = await Promise.all([
      this.cloneAsset("trains/engine", { width: 1.34, depth: 3.05, height: 1.68 }),
      this.cloneAsset("trains/carriage", { width: 1.3, depth: 2.9, height: 1.55 }),
      this.cloneAsset("trains/carriage-coal", { width: 1.32, depth: 2.9, height: 1.5 }),
      this.cloneAsset("trains/carriage", { width: 1.3, depth: 2.9, height: 1.55 }),
    ]);
    if (generation !== this.worldGeneration) return;
    const cars = [engine, carriageA, carriageCoal, carriageB];
    for (const car of cars) this.world.add(car);
    this.trains.push({
      cars,
      curve: this.railCurve,
      speed: TRAIN_TRAFFIC_PROFILE.speed,
      offset: 0.36,
      speedVariance: TRAIN_TRAFFIC_PROFILE.variance,
      speedFrequency: TRAIN_TRAFFIC_PROFILE.frequency,
      speedPhase: 0.8,
      carGap: 3.08 / trackLength,
    });
    const passenger = await Promise.all([
      this.cloneAsset("trains/regional-engine", { width: 1.18, depth: 2.5, height: 1.45 }),
      this.cloneAsset("trains/regional-coach", { width: 1.18, depth: 2.65, height: 1.4 }),
      this.cloneAsset("trains/regional-coach", { width: 1.18, depth: 2.65, height: 1.4 }),
    ]);
    if (generation !== this.worldGeneration) return;
    for (const car of passenger) this.world.add(car);
    this.trains.push({ ...this.trains[this.trains.length - 1], cars: passenger, carGap: 2.8 / trackLength, offset: 0.76 });
    let stationProgress=0,minimum=Infinity;
    for(let i=0;i<=1000;i++){
      const point=this.railCurve.getPointAt(i/1000),distance=Math.hypot(point.x-this.railX,point.z-3);
      if(distance<minimum){minimum=distance;stationProgress=i/1000;}
    }
    this.trains[this.trains.length-2].timetable={stationDistance:stationProgress*trackLength,phase:.56,passenger:false};
    this.trains[this.trains.length-1].timetable={stationDistance:stationProgress*trackLength,phase:0,passenger:true};
  }

  async addWaterTraffic(generation) {
    const [tug, cargo] = await Promise.all([
      this.cloneAsset("watercraft/tug", { width: 1.42, depth: 2.65, height: 1.65 }),
      this.cloneAsset("watercraft/cargo", { width: 2.4, depth: 4.65, height: 2.25 }),
    ]);
    if (generation !== this.worldGeneration) return;
    addBoatWake(tug, { length: 2.35, width: 0.62 });
    addBoatWake(cargo, { length: 4.1, width: 1.08 });
    this.world.add(cargo, tug);
    this.motion.push({
      object: tug,
      curve: this.shippingLanes[0],
      speed: WATER_TRAFFIC_PROFILES[0].speed,
      offset: 0.47,
      rotationOffset: 0,
      speedVariance: WATER_TRAFFIC_PROFILES[0].variance,
      speedFrequency: WATER_TRAFFIC_PROFILES[0].frequency,
      speedPhase: 0.4,
      wrap: true,
      bob: 0.035,
      surface: "ocean",
    });
    this.motion.push({
      object: cargo,
      curve: this.shippingLanes[1],
      speed: WATER_TRAFFIC_PROFILES[1].speed,
      offset: 0.56,
      rotationOffset: Math.PI,
      speedVariance: WATER_TRAFFIC_PROFILES[1].variance,
      speedFrequency: WATER_TRAFFIC_PROFILES[1].frequency,
      speedPhase: 2.1,
      wrap: true,
      bob: 0.018,
      surface: "ocean",
    });
  }

  async addDeliveryTruck(generation) {
    const truck = await this.cloneAsset("cars/delivery", { width: .7, depth: 1.5, height: .95 });
    if (generation !== this.worldGeneration) return;
    const docker = this.layoutEntities.get("docker");
    const toward = this.layoutEntities.get("caddy") ?? this.layoutEntities.get("deploy-manager");
    this.deliveryAccess = createStreetAccess(docker, toward, this.layout, "vertical");
    const curb = this.deliveryAccess?.curb ?? this.positions.get("docker") ?? new THREE.Vector3();
    const node = this.deliveryAccess?.node ?? curb;
    truck.position.set(curb.x, 0.26, curb.z);
    truck.rotation.y = Math.atan2(node.x - curb.x, node.z - curb.z);
    this.world.add(truck);
    this.deliveryTruck = truck;
    this.deliveryHome = truck.position.clone();
    this.deliveryHomeRotation = truck.rotation.y;
  }

  async addAmbientDeliveryLoops(generation) {
    const docker = this.layoutEntities.get("docker");
    const targets = chooseAmbientDeliveryTargets(this.layout);
    if (!docker || targets.length === 0) return;
    const yardAccess = createStreetAccess(docker, targets[0], this.layout, "horizontal");
    const vehicleKeys = ["cars/delivery", "cars/truck", "cars/delivery"];

    await Promise.all(targets.map(async (target, index) => {
      const model = await this.cloneAsset(vehicleKeys[index], {
        width: 0.7,
        depth: 1.5,
        height: index === 1 ? 1.02 : 0.98,
      });
      if (generation !== this.worldGeneration) return;
      const outward = createStreetRoutePoints(docker, target, this.layout, { startAccess: yardAccess });
      const returning = createStreetRoutePoints(target, docker, this.layout, { endAccess: yardAccess });
      const loopPoints = [...outward, ...returning.slice(1)];
      const curve = laneCurve(streetCurve(loopPoints, 0.255),.42);
      const courier = new THREE.Group();
      courier.name = `ambient-update:${target.id}`;
      courier.add(model);
      const packet = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.13, 0),
        new THREE.MeshBasicMaterial({ color: index === 1 ? COLORS.tealBright : COLORS.rustBright }),
      );
      packet.position.y = 1.02;
      courier.add(packet);
      this.world.add(courier);
      this.motion.push({
        object: courier,
        cityVehicle:true,bodyWidth:.7,bodyLength:1.5,cruiseSpeed:.85+index*.12,
        curve,
        speed: 0.0115 + index * 0.0017,
        offset: index / AMBIENT_DELIVERY_COUNT,
        rotationOffset: 0,
        speedVariance: 0.003 + index * 0.0007,
        speedFrequency: 0.18 + index * 0.035,
        speedPhase: index * 1.9,
        wrap: true,
      });
      this.ambientCouriers.push(courier);
    }));
    if (generation === this.worldGeneration) {
      this.stage.dataset.ambientUpdates = String(this.ambientCouriers.length);
    }
  }

  setStatuses(city = this.topology) {
    const statuses = new Map([
      ...CONTROL_ENTITIES.map((entity) => [entity.id, city.host?.status ?? "healthy"]),
      ...(city.routes ?? []).map((route) => [route.id, route.status]),
      ...(city.datastores ?? []).map((store) => [store.id, store.status]),
    ]);
    for (const [id, group] of this.entityGroups) {
      const status = normalizedStatus(statuses.get(id));
      group.userData.status = status;
      if(group.userData.healthBarrier)group.userData.healthBarrier.visible=status==="unhealthy";
      group.userData.beacon?.material.color.setHex(statusColor(status));
      if (group.userData.labelElement) group.userData.labelElement.dataset.status = status;
    }
    this.stage.dataset.closedServices=String([...this.entityGroups.values()].filter(group=>group.userData.healthBarrier?.visible).length);
  }

  setLiveDeployments(appIds = []) {
    this.liveAppIds = new Set(appIds);
    for (const group of this.entityGroups.values()) {
      group.userData.live = this.liveAppIds.has(group.userData.appId)
        || (this.liveAppIds.size > 0 && ["deploy-manager", "docker"].includes(group.userData.entityId));
      group.userData.labelElement?.classList.toggle("is-live", group.userData.live);
    }
  }

  observeSelfUpdate(receipt) {
    if(!receipt?.id || receipt.id===this.lastObservedReceipt)return;
    this.lastObservedReceipt=receipt.id;this.stage.dataset.observedRelease=receipt.release;
    const group=this.entityGroups.get("deploy-manager");if(!group)return;
    const stamp=new THREE.Mesh(new THREE.RingGeometry(2.12,2.32,40),new THREE.MeshBasicMaterial({color:0xe3bc63,side:THREE.DoubleSide,transparent:true,opacity:.8}));
    stamp.name="verified-city-release-stamp";stamp.rotation.x=-Math.PI/2;stamp.position.y=.24;group.add(stamp);
    setTimeout(()=>{stamp.removeFromParent();stamp.geometry.dispose();stamp.material.dispose();},4000);
  }

  select(entityId) {
    this.selectedId = entityId;
    for (const [id, group] of this.entityGroups) {
      group.userData.labelElement?.classList.toggle("is-selected", id === entityId);
    }
    const group = this.entityGroups.get(entityId);
    this.selectionMarker.visible = Boolean(group);
    if (group) this.selectionMarker.position.set(group.position.x, 0.26, group.position.z);
  }

  setVisible(visible) {
    this.visible = Boolean(visible);
    this.stage.classList.toggle("is-visible", this.visible);
    if (this.visible) this.resize();
  }

  fit() {
    this.camera.position.set(...CAMERA_HOME.position);
    this.controls.target.set(...CAMERA_HOME.target);
    this.camera.zoom = 1;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  zoom(factor) {
    this.camera.zoom = THREE.MathUtils.clamp(this.camera.zoom / factor, this.controls.minZoom, this.controls.maxZoom);
    this.camera.updateProjectionMatrix();
  }

  resetSimulation() {
    this.simulationGeneration += 1;
    if (this.releasePacket) this.releasePacket.visible = false;
    if (this.deliveryTruck && this.deliveryHome) {
      this.deliveryTruck.position.copy(this.deliveryHome);
      this.deliveryTruck.rotation.y = this.deliveryHomeRotation;
      this.deliveryTruck.visible = true;
    }
    for (const group of this.entityGroups.values()) {
      group.userData.modelRoot?.scale.copy(group.userData.baseScale ?? new THREE.Vector3(1, 1, 1));
      group.userData.labelElement?.classList.remove("is-simulating");
    }
    this.simulatedHighlight = null;
  }

  async delay(milliseconds, token) {
    const duration = this.reducedMotion ? 0 : milliseconds;
    return new Promise((resolve) => {
      window.setTimeout(() => resolve(token === this.simulationGeneration), duration);
    });
  }

  async tween(milliseconds, token, update) {
    if (this.reducedMotion) {
      if (token !== this.simulationGeneration) return false;
      update(1);
      return true;
    }
    const duration = milliseconds;
    const started = performance.now();
    return new Promise((resolve) => {
      const frame = (now) => {
        if (token !== this.simulationGeneration) {
          resolve(false);
          return;
        }
        const progress = Math.min(1, (now - started) / Math.max(1, duration));
        try {
          update(progress);
        } catch (error) {
          console.error("City animation frame failed", error);
          resolve(false);
          return;
        }
        if (progress < 1) requestAnimationFrame(frame);
        else resolve(true);
      };
      requestAnimationFrame(frame);
    });
  }

  async moveAlong(object, curve, milliseconds, token) {
    if (!object || !curve) return false;
    if(object===this.deliveryTruck && !this.reducedMotion) {
      object.visible=true;
      const item={object,curve:laneCurve(curve,.42),once:true,cityVehicle:true,cityDistance:0,offset:0,speed:1,bodyWidth:.7,bodyLength:1.5,cruiseSpeed:2};
      const vehicles=this.motion.filter(other=>other.cityVehicle);
      while(token===this.simulationGeneration && vehicles.some(other=>other.cityDistance!==undefined && vehiclesOverlap(vehiclePose(item,0),vehiclePose(other,other.cityDistance)))) await new Promise(resolve=>requestAnimationFrame(resolve));
      if(token!==this.simulationGeneration)return false;
      this.activeDelivery=item;
      while(token===this.simulationGeneration && item.cityDistance<item.curve.getLength()-.02) await new Promise(resolve=>requestAnimationFrame(resolve));
      if(this.activeDelivery===item)this.activeDelivery=null;
      return token===this.simulationGeneration;
    }
    object.visible = true;
    return this.tween(milliseconds, token, (progress) => {
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - ((-2 * progress + 2) ** 2) / 2;
      const point = curve.getPointAt(eased);
      const tangent = curve.getTangentAt(Math.min(0.999, eased));
      object.position.copy(point);
      object.rotation.y = Math.atan2(tangent.x, tangent.z);
    });
  }

  ensureReleasePacket() {
    if (this.releasePacket) return this.releasePacket;
    this.releasePacket = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.29, 0),
      new THREE.MeshStandardMaterial({ color: COLORS.rustBright, emissive: COLORS.rust, emissiveIntensity: 0.55, roughness: 0.55 }),
    );
    this.releasePacket.castShadow = true;
    this.world.add(this.releasePacket);
    return this.releasePacket;
  }

  setSimulationHighlight(entityId) {
    this.simulatedHighlight = entityId;
    for (const [id, group] of this.entityGroups) {
      group.userData.labelElement?.classList.toggle("is-simulating", id === entityId);
    }
  }

  async rebuildEntity(entityId, token) {
    const group = this.entityGroups.get(entityId);
    const model = group?.userData.modelRoot;
    if (!group || !model) return false;
    const effect = new THREE.Group();
    effect.position.set(group.position.x, 0.68, group.position.z);
    const dustMaterial = new THREE.MeshBasicMaterial({ color: COLORS.paperLight, transparent: true, opacity: 0.72, depthWrite: false });
    const sparkMaterial = new THREE.MeshBasicMaterial({ color: COLORS.rustBright });
    const pieces = [];
    for (let index = 0; index < 9; index += 1) {
      const dust = new THREE.Mesh(new THREE.SphereGeometry(0.18 + (index % 3) * 0.065, 7, 5), dustMaterial.clone());
      dust.position.set(Math.cos(index) * 1.2, 0.2, Math.sin(index * 1.7) * 1.2);
      effect.add(dust);
      pieces.push({ object: dust, angle: index * 1.7, height: 0.8 + (index % 4) * 0.32, radius: 1 + (index % 3) * 0.25 });
    }
    for (let index = 0; index < 6; index += 1) {
      const spark = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.34, 0.08), sparkMaterial);
      effect.add(spark);
      pieces.push({ object: spark, angle: index * Math.PI / 3, height: 1.5 + (index % 2) * 0.5, radius: 0.8, spin: true });
    }
    const hammer = new THREE.Group();
    addOutlinedBox(hammer, new THREE.Vector3(0.12, 0.75, 0.12), new THREE.Vector3(0, 0, 0), new THREE.MeshStandardMaterial({ color: COLORS.paperDark }));
    addOutlinedBox(hammer, new THREE.Vector3(0.62, 0.2, 0.2), new THREE.Vector3(0, 0.36, 0), new THREE.MeshStandardMaterial({ color: COLORS.rust }));
    hammer.scale.setScalar(1.35);
    const wrench = new THREE.Group();
    const wrenchMaterial = new THREE.MeshStandardMaterial({ color: COLORS.teal, roughness: 0.68, metalness: 0.12 });
    const wrenchRing = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.07, 7, 12), wrenchMaterial);
    const wrenchHandle = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.84, 0.13), wrenchMaterial);
    wrenchHandle.position.y = -0.45;
    wrench.add(wrenchRing, wrenchHandle);
    wrench.scale.setScalar(1.25);
    effect.add(hammer);
    effect.add(wrench);
    this.world.add(effect);
    const base = group.userData.baseScale ?? new THREE.Vector3(1, 1, 1);
    const completed = await this.tween(1650, token, (progress) => {
      const collapse = progress < 0.38
        ? 1 - (progress / 0.38) * 0.9
        : 0.1 + ((progress - 0.38) / 0.62) * 0.9;
      const bounce = progress > 0.78 ? Math.sin((progress - 0.78) * Math.PI * 5) * (1 - progress) * 0.24 : 0;
      model.scale.set(base.x, base.y * Math.max(0.08, collapse + bounce), base.z);
      const arc = Math.sin(progress * Math.PI);
      for (const piece of pieces) {
        piece.object.position.x = Math.cos(piece.angle + progress * 2.8) * piece.radius * arc;
        piece.object.position.z = Math.sin(piece.angle + progress * 2.8) * piece.radius * arc;
        piece.object.position.y = 0.25 + piece.height * arc;
        piece.object.material.opacity = Math.max(0, arc * 0.85);
        if (piece.spin) piece.object.rotation.z = progress * Math.PI * 5;
      }
      hammer.position.set(-1.35 * arc, 0.4 + 2.2 * arc, 0.85 * arc);
      hammer.rotation.z = -0.6 + progress * Math.PI * 4;
      wrench.position.set(1.3 * arc, 0.55 + 2.45 * arc, -0.9 * arc);
      wrench.rotation.set(progress * Math.PI * 2.5, 0.5, 0.6 - progress * Math.PI * 4.5);
    });
    this.world.remove(effect);
    disposeObject3D(effect);
    model.scale.copy(base);
    return completed;
  }

  async simulateDeployment(targetId, onPhase = () => {}) {
    this.resetSimulation();
    const token = this.simulationGeneration;
    const target = this.positions.get(targetId);
    const docker = this.positions.get("docker");
    if (!target || !docker || !this.deliveryTruck) return false;
    const packet = this.ensureReleasePacket();
    const emit = (phase) => {
      if (token === this.simulationGeneration) onPhase(phase);
    };

    emit("incoming");
    if (!await this.moveAlong(packet, this.releaseCurves.gitToManager, 1250, token)) return false;
    this.setSimulationHighlight("deploy-manager");
    emit("build");
    if (!await this.delay(850, token)) return false;

    emit("candidate");
    if (!await this.moveAlong(packet, this.releaseCurves.managerToDocker, 900, token)) return false;
    this.setSimulationHighlight("docker");
    emit("promote");
    if (!await this.delay(820, token)) return false;
    packet.visible = false;

    const outward = this.streetCurveBetween("docker", targetId, 0.31, { startAccess: this.deliveryAccess });
    emit("deliver");
    if (!await this.moveAlong(this.deliveryTruck, outward, 1780, token)) return false;
    this.setSimulationHighlight(targetId);
    emit("rebuild");
    if (!await this.rebuildEntity(targetId, token)) return false;

    emit("verify");
    if (!await this.delay(700, token)) return false;
    const back = this.streetCurveBetween(targetId, "docker", 0.31, { endAccess: this.deliveryAccess });
    emit("return");
    if (!await this.moveAlong(this.deliveryTruck, back, 1320, token)) return false;
    emit("complete");
    this.resetSimulation();
    return true;
  }

  handleReleaseEvent(event) {
    this.releaseEventChain = this.releaseEventChain
      .then(() => this.animateReleaseEvent(event))
      .catch((error) => {
        console.error("Unable to render factual release event", error);
        return false;
      });
    return this.releaseEventChain;
  }

  async animateReleaseEvent({ jobId, targetId, phase, status }) {
    if (this.destroyed || !jobId || !targetId) return false;
    if (this.currentLiveJobId !== jobId) {
      this.resetSimulation();
      this.currentLiveJobId = jobId;
      this.currentLivePhase = null;
      this.liveTruckAtTarget = false;
    }
    const token = this.simulationGeneration;
    const target = this.positions.get(targetId);
    if (!target) return false;
    const packet = this.ensureReleasePacket();

    if (["accepted", "queued", "starting"].includes(phase)) {
      this.currentLivePhase = phase;
      const start = this.releaseCurves.gitToManager?.getPointAt(0);
      if (start) packet.position.copy(start);
      packet.visible = true;
      this.setSimulationHighlight("git");
      return true;
    }

    if (phase === "fetch") {
      this.currentLivePhase = phase;
      packet.visible = true;
      this.setSimulationHighlight("deploy-manager");
      return this.moveAlong(packet, this.releaseCurves.gitToManager, 820, token);
    }

    if (phase === "build") {
      this.currentLivePhase = phase;
      this.setSimulationHighlight("deploy-manager");
      return this.delay(480, token);
    }

    if (phase === "candidate") {
      this.currentLivePhase = phase;
      packet.visible = true;
      const start = this.releaseCurves.managerToDocker?.getPointAt(0);
      if (start) packet.position.copy(start);
      this.setSimulationHighlight("docker");
      return this.moveAlong(packet, this.releaseCurves.managerToDocker, 720, token);
    }

    if (phase === "promote") {
      this.currentLivePhase = phase;
      packet.visible = false;
      this.setSimulationHighlight(targetId);
      const outward = this.streetCurveBetween("docker", targetId, 0.31, { startAccess: this.deliveryAccess });
      if (!this.liveTruckAtTarget && !await this.moveAlong(this.deliveryTruck, outward, 1180, token)) return false;
      this.liveTruckAtTarget = true;
      return this.rebuildEntity(targetId, token);
    }

    if (phase === "verify") {
      this.currentLivePhase = phase;
      this.setSimulationHighlight(targetId);
      return this.delay(540, token);
    }

    if (phase === "rollback") {
      const rollbackAlreadyRendered = this.currentLivePhase === "rollback";
      this.currentLivePhase = phase;
      this.setSimulationHighlight(targetId);
      if (!this.liveTruckAtTarget) {
        const outward = this.streetCurveBetween("docker", targetId, 0.31, { startAccess: this.deliveryAccess });
        if (!await this.moveAlong(this.deliveryTruck, outward, 760, token)) return false;
        this.liveTruckAtTarget = true;
      }
      const restored = rollbackAlreadyRendered
        ? true
        : await this.rebuildEntity(targetId, token);
      if (status === "rolled-back") {
        const back = this.streetCurveBetween(targetId, "docker", 0.31, { endAccess: this.deliveryAccess });
        await this.moveAlong(this.deliveryTruck, back, 820, token);
        this.resetSimulation();
        this.currentLiveJobId = null;
        this.currentLivePhase = null;
        this.liveTruckAtTarget = false;
      }
      return restored;
    }

    if (["complete", "failed", "interrupted"].includes(phase) || ["succeeded", "failed", "rolled-back", "interrupted"].includes(status)) {
      if (this.liveTruckAtTarget) {
        const back = this.streetCurveBetween(targetId, "docker", 0.31, { endAccess: this.deliveryAccess });
        await this.moveAlong(this.deliveryTruck, back, 820, token);
      }
      this.resetSimulation();
      this.currentLiveJobId = null;
      this.currentLivePhase = null;
      this.liveTruckAtTarget = false;
      return true;
    }
    return false;
  }

  animate(frameTime = performance.now()) {
    if (this.destroyed) return;
    this.animationFrame = requestAnimationFrame((nextFrameTime) => this.animate(nextFrameTime));
    if (!this.visible || document.hidden) return;
    // Gate the simulation and chunk builder too, not just the final draw call.
    const interval=this.renderPolicy.frameMs;
    if(frameTime-(this.lastBudgetFrame??-Infinity)<interval-.5)return;
    this.lastBudgetFrame=frameTime;
    if(document.querySelector("#build-city-dialog")?.open) {
      if(frameTime-(this.lastDialogFrame??0)<250)return;
      this.lastDialogFrame=frameTime;
    }
    if(this.worldStream?.pendingCount) {
      this.worldStream.drain(1);
      this.stage.dataset.worldChunks=String(this.worldStream.chunks.size);
      this.stage.dataset.streamPending=String(this.worldStream.pendingCount);
      this.renderer.shadowMap.needsUpdate=true;
    }
    if (
      this.reducedMotion
      && frameTime - this.lastReducedMotionFrame < REDUCED_MOTION_FRAME_MS
    ) return;
    if (this.reducedMotion) this.lastReducedMotionFrame = frameTime;
    const elapsed = (frameTime - this.startedAt) / 1000;
    const motionElapsed = this.reducedMotion ? 0 : elapsed;
    this.controls.update();
    // Orthographic scale is independent of distance. Retreat along the same
    // view direction so low-angle foreground rays remain in front of near clip.
    const minimumDistance=(this.camera.top-this.camera.bottom)/(2*this.camera.zoom)*Math.tan(this.controls.getPolarAngle())+30;
    const cameraOffset=this.camera.position.clone().sub(this.controls.target);
    if(cameraOffset.length()<minimumDistance) {
      this.camera.position.copy(this.controls.target).add(cameraOffset.setLength(minimumDistance));
      this.camera.updateMatrixWorld(true);this.lastStreamKey=null;
    }
    if (this.waterMaterial) {
      this.waterMaterial.uniforms.uTime.value = motionElapsed;
      this.waterMaterial.uniforms.uViewDirection.value.copy(this.camera.position).sub(this.controls.target).normalize();
      this.waterMaterial.uniforms.uDetail.value = this.controls.getPolarAngle()>1.12 || this.camera.zoom<0.8 ? 8 : this.renderPolicy.waterDetail;
    }
    this.updateWorldStream();
    const trafficDelta = this.reducedMotion ? 0 : Math.min(0.1, (frameTime - (this.lastTrafficFrame ?? frameTime)) / 1000);
    this.lastTrafficFrame = frameTime;
    for (const lane of [-0.5, 0.5]) advanceLaneTraffic(this.motion.filter((item) => item.trafficLane === lane), trafficDelta);
    const cityVehicles=this.motion.filter(item=>item.cityVehicle);
    if(this.activeDelivery)cityVehicles.push(this.activeDelivery);
    advanceCityTraffic(cityVehicles,trafficDelta,motionElapsed);
    if(frameTime-(this.lastTrafficAudit??0)>1000) {
      let conflicts=0;
      for(let i=0;i<cityVehicles.length;i++)for(let j=i+1;j<cityVehicles.length;j++) {
        if(vehiclesOverlap(vehiclePose(cityVehicles[i],cityVehicles[i].cityDistance),vehiclePose(cityVehicles[j],cityVehicles[j].cityDistance),0))conflicts++;
      }
      this.stage.dataset.trafficConflicts=String(conflicts);
      this.stage.dataset.trafficWaiting=String(cityVehicles.filter(item=>item.waiting).length);
      this.lastTrafficAudit=frameTime;
    }
    for(const fixture of this.signalFixtures??[]) {
      const phase=signalPhase(motionElapsed);
      fixture.group.position.y=2.85+(this.reducedMotion?0:Math.sin(motionElapsed*1.2)*.045);
      for(const lamp of fixture.lamps) {
        const lit=phase[lamp.axis]===lamp.color;lamp.mesh.material.color.setHex(lit?lamp.hex:0x263c38);
      }
    }

    for (const item of [...this.motion,...(this.activeDelivery?[this.activeDelivery]:[])]) {
      if(item.cityVehicle && item.cityDistance===undefined) {item.object.visible=false;continue;}
      if(item.cityVehicle)item.object.visible=true;
      const walkingPhase = item.pingPong ? (item.offset + motionElapsed * item.speed) % 2 : null;
      const progress = item.cityVehicle ? (item.once ? Math.min(.999999,item.cityDistance/item.curve.getLength()) : ((item.cityDistance/item.curve.getLength())%1+1)%1)
        : walkingPhase !== null ? (walkingPhase <= 1 ? walkingPhase : 2 - walkingPhase)
        : item.trafficLane !== undefined
        ? (item.distance ?? item.offset * item.curve.getLength()) / item.curve.getLength()
        : variableProgress(item, motionElapsed);
      const point = item.curve.getPointAt(progress);
      const tangent = item.curve.getTangentAt(Math.min(0.999, progress));
      item.object.position.copy(point);
      if (item.surface === "ocean") {
        item.object.position.y += oceanWaveHeightAt(point.x, point.z, motionElapsed, 8, this.perimeter.coast.shoreX);
      }
      if (item.bob) item.object.position.y += Math.sin(motionElapsed * 2.1 + item.offset * 8) * item.bob;
      item.object.rotation.y = Math.atan2(tangent.x, tangent.z) + (item.rotationOffset ?? 0)
        + (walkingPhase > 1 ? Math.PI : 0);
    }
    for (const train of this.trains) {
      const service=train.timetable?railSchedule(motionElapsed,train.curve.getLength(),train.timetable.stationDistance,train.timetable.phase):null;
      const headProgress = service?service.distance/train.curve.getLength():variableProgress(train,motionElapsed);
      if(train.timetable?.passenger)this.stationService=service;
      train.cars.forEach((car, index) => {
        let progress = headProgress - index * train.carGap;
        progress -= Math.floor(progress);
        const point = train.curve.getPointAt(progress);
        const tangent = train.curve.getTangentAt(Math.min(0.999, progress));
        car.position.copy(point);
        car.rotation.y = Math.atan2(tangent.x, tangent.z);
      });
    }
    for(const item of this.motion.filter(item=>item.stationPassenger)) {
      const service=this.stationService,base=item.stationPassenger;
      const boarding=service?.dwelling?THREE.MathUtils.smoothstep(service.dwellProgress,.12,.8):0;
      item.object.position.set(THREE.MathUtils.lerp(base.x,base.boardX,boarding),THREE.MathUtils.lerp(.53,.68,boarding),base.z);
      item.object.scale.setScalar(service?.dwelling?1-THREE.MathUtils.smoothstep(service.dwellProgress,.72,.95):Math.min(1,(service?.travelTime??0)/4));
    }
    if(this.windowDusk)this.windowDusk.value=this.reducedMotion?.45:.25+.65*(.5-.5*Math.cos(motionElapsed*Math.PI*2/720));
    updatePortLife(this.portLife,motionElapsed,(x,z,t)=>oceanWaveHeightAt(x,z,t,8,this.perimeter.coast.shoreX));
    updateGulls(this.gulls,motionElapsed);
    if(this.portLife && this.stage.dataset.harborPhase!==this.portLife.phase)this.stage.dataset.harborPhase=this.portLife.phase;
    const stationPhase=this.stationService?.dwelling?"boarding":"travelling";
    if(this.stage.dataset.stationPhase!==stationPhase)this.stage.dataset.stationPhase=stationPhase;
    for (const item of this.signalMotion) {
      let progress = item.offset + motionElapsed * item.speed;
      progress -= Math.floor(progress);
      item.object.position.copy(item.curve.getPointAt(progress));
      item.object.position.y += 0.08 + Math.sin(motionElapsed * 4 + item.offset * 9) * 0.04;
    }
    for (const item of this.smoke) {
      item.puff.visible=item.puff.parent?.userData.status!=="unhealthy";
      const cycle = (motionElapsed * 0.16 + item.phase) % 1;
      item.puff.position.y = item.baseY + cycle * 1.35;
      item.puff.position.x = item.baseX + Math.sin(motionElapsed * 0.8 + item.phase * 6) * 0.08;
      item.puff.scale.setScalar(0.72 + cycle * 1.08);
      item.puff.material.opacity = item.puff.parent?.userData.status==="unhealthy" ? 0 : Math.sin(cycle * Math.PI) * 0.3;
    }
    if (this.selectionMarker.visible) {
      const pulse = this.reducedMotion ? 1 : 1 + Math.sin(elapsed * 3.2) * 0.035;
      this.selectionMarker.scale.setScalar(pulse);
      this.selectionMarker.material.opacity = this.reducedMotion ? 0.82 : 0.7 + Math.sin(elapsed * 3.2) * 0.18;
    }
    for (const group of this.entityGroups.values()) {
      if (!group.userData.beacon) continue;
      const pulse = this.reducedMotion
        ? (group.userData.live ? 1.34 : 1)
        : group.userData.live ? 1.2 + Math.sin(elapsed * 6) * 0.36 : 1 + Math.sin(elapsed * 2.4 + group.position.x) * 0.08;
      group.userData.beacon.scale.setScalar(pulse);
    }
    if (this.renderPolicy.shadows && !this.reducedMotion && frameTime - (this.lastShadowFrame ?? 0) >= 100) {
      this.renderer.shadowMap.needsUpdate = true; this.lastShadowFrame = frameTime;
    }
    this.renderer.render(this.scene, this.camera);
    if(frameTime-(this.lastRenderAudit??0)>1000) {
      this.stage.dataset.drawCalls=String(this.renderer.info.render.calls);
      this.stage.dataset.triangles=String(this.renderer.info.render.triangles);
      this.stage.dataset.frameBudget=String(Math.round(interval));
      this.lastRenderAudit=frameTime;
    }
    if (this.reducedMotion || this.labelsDirty || frameTime - (this.lastLabelFrame ?? 0) >= 33) {
      this.labelRenderer.render(this.scene, this.camera); this.lastLabelFrame = frameTime; this.labelsDirty = false;
    }
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    cancelAnimationFrame(this.animationFrame);
    clearTimeout(this.tapFallbackTimer);
    this.resizeObserver?.disconnect();
    this.motionPreference?.removeEventListener?.("change", this.onMotionPreferenceChange);
    this.controls?.removeEventListener("change", this.onControlsChange);
    this.controls?.dispose();
    for (const [type, handler] of Object.entries(this.inputHandlers ?? {})) {
      this.stage.removeEventListener(type, handler);
    }
    this.clearWorld();
    this.scene.remove(this.selectionMarker);
    disposeObject3D(this.selectionMarker);
    for (const pending of this.assetCache.values()) {
      Promise.resolve(pending).then((root) => disposeObject3D(root, { includeShared: true, includeTextures: true })).catch(() => {});
    }
    this.assetCache.clear();
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.labelRenderer.domElement.remove();
  }
}

export function createCity3D(options) {
  try {
    return new City3D(options);
  } catch (error) {
    console.error("Unable to initialize the 3D city", error);
    return new NullCity3D(options?.stage, error);
  }
}
