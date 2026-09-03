import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
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
  hillLight: 0xaeb584,
  hillDark: 0x87956f,
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
  "trains/carriage": "/assets/kenney/trains/train-carriage-container-blue.glb",
  "trains/carriage-coal": "/assets/kenney/trains/train-carriage-coal.glb",
  "watercraft/tug": "/assets/kenney/watercraft/boat-tug-a.glb",
  "watercraft/cargo": "/assets/kenney/watercraft/ship-cargo-a.glb",
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
  leg: 22,
  curveFit: ROAD_ASSET_METRICS.curveExtent * ROAD_ASSET_METRICS.tileScale,
  bendFit: ROAD_ASSET_METRICS.bendExtent * ROAD_ASSET_METRICS.tileScale,
});
export const RAIL_APPROACH = Object.freeze({
  assetScale: 1.48,
  turn: 4 * 1.48,
  leg: 22,
  cornerFit: 4.48727 * 1.48,
});
export const TERRAIN_CONFIG = Object.freeze({
  baseY: -0.075,
  segmentsX: 124,
  segmentsZ: 116,
  octaves: 6,
  baseFrequency: 0.052,
  lacunarity: 2.03,
  persistence: 0.51,
  heightScale: 2.35,
  treeCount: 30,
  grassCount: 760,
});
export const OCEAN_WAVE_SETTINGS = Object.freeze({
  vertexIterations: 8,
  fragmentIterations: 14,
  frequencyBands: 4,
  frequencyMultiplier: 1.47,
  amplitudeMultiplier: 0.67,
  speedMultiplier: 1.11,
  domainDrag: 0.32,
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
  const highwayZ = bounds.minZ - 3.05;
  const railX = bounds.minX - 3.05;
  const sideStartZ = highwayZ + 4.4;
  const sideEndZ = bounds.maxZ + 5.2;
  const shoreX = bounds.maxX + 2.35;
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
    x: perimeter.highway.x,
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
    Array.from({ length: 13 }, (_, index) => {
      const progress = index / 12;
      const broad = Math.sin(progress * Math.PI * 3.7 + 0.42) * 0.72;
      const coves = Math.sin(progress * Math.PI * 9.2 - 0.8) * 0.38;
      return new THREE.Vector3(
        coast.shoreX + broad + coves,
        0.045,
        THREE.MathUtils.lerp(coast.minZ, coast.maxZ, progress),
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
    shippingLanes: [offsetCurve(coastline, -3.2, 96), offsetCurve(coastline, -6.2, 96)],
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

function prepareAsset(root) {
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
    if (mesh.geometry?.attributes?.position?.count < 25_000) {
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
    child.element?.remove?.();
    if (child.geometry && (includeShared || !child.geometry.userData?.deployManagerSharedAsset)) {
      geometries.add(child.geometry);
    }
    const childMaterials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of childMaterials) {
      if (!material || (!includeShared && material.userData?.deployManagerSharedAsset)) continue;
      materials.add(material);
      if (!includeTextures) continue;
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) texture.dispose();
}

function createCoastalWaterGeometry(coastline, oceanX, samples = 96, depthSegments = 14) {
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let index = 0; index <= samples; index += 1) {
    const progress = index / samples;
    const shore = coastline.getPoint(progress);
    for (let depthIndex = 0; depthIndex <= depthSegments; depthIndex += 1) {
      const depth = depthIndex / depthSegments;
      positions.push(
        THREE.MathUtils.lerp(shore.x, oceanX, depth),
        shore.y - depth * 0.035,
        shore.z,
      );
      uvs.push(depth, progress);
    }
    if (index < samples) {
      const rowLength = depthSegments + 1;
      for (let depthIndex = 0; depthIndex < depthSegments; depthIndex += 1) {
        const shoreIndex = index * rowLength + depthIndex;
        const oceanIndex = shoreIndex + 1;
        const nextShore = shoreIndex + rowLength;
        const nextOcean = nextShore + 1;
        indices.push(shoreIndex, oceanIndex, nextShore, oceanIndex, nextOcean, nextShore);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

// A browser-sized approximation of a broad wave spectrum: large swell, middle
// chop, and fine ripples share world coordinates but never share a texture tile.
// The final Acerola ocean uses an FFT/JONSWAP spectrum; doing that compute pass
// here would be disproportionate, so this analytic fBM borrows the important
// visible properties: many frequency bands, rotated domains, derivative drag,
// and no repeating UV normal map.
const ACEROLA_OCEAN_FBM_GLSL = `
  vec3 oceanFbm(vec2 worldXZ, float time) {
    float frequency = 0.18;
    float amplitude = 1.0;
    float speed = 0.22;
    float seed = 0.35;
    float height = 0.0;
    float amplitudeSum = 0.0;
    vec2 slope = vec2(0.0);
    vec2 samplePoint = worldXZ;

    for (int waveIndex = 0; waveIndex < OCEAN_WAVE_COUNT; waveIndex += 1) {
      vec2 direction = normalize(vec2(cos(seed), sin(seed)));
      float phase = dot(direction, samplePoint) * frequency + time * speed;
      float wave = amplitude * exp(1.24 * sin(phase) - 1.24);
      vec2 derivative = frequency * direction * (1.24 * wave * cos(phase));

      height += wave;
      slope += derivative;
      samplePoint -= derivative * amplitude * ${OCEAN_WAVE_SETTINGS.domainDrag.toFixed(2)};
      amplitudeSum += amplitude;
      float octave = float(waveIndex);
      samplePoint = mat2(0.819152, -0.573576, 0.573576, 0.819152) * samplePoint
        + vec2(2.37 + octave * 0.19, -1.61 + octave * 0.13);
      frequency *= ${OCEAN_WAVE_SETTINGS.frequencyMultiplier.toFixed(2)} * (0.97 + 0.045 * sin(octave * 1.618));
      amplitude *= ${OCEAN_WAVE_SETTINGS.amplitudeMultiplier.toFixed(2)} * (0.97 + 0.035 * cos(octave * 1.117));
      speed *= ${OCEAN_WAVE_SETTINGS.speedMultiplier.toFixed(2)};
      seed += 2.39996323;
    }

    return vec3(height / amplitudeSum - 0.42, slope / amplitudeSum);
  }
`;

export function oceanWaveHeightAt(x, z, time = 0, iterations = OCEAN_WAVE_SETTINGS.vertexIterations) {
  let frequency = 0.18;
  let amplitude = 1;
  let speed = 0.22;
  let seed = 0.35;
  let height = 0;
  let amplitudeSum = 0;
  let sampleX = x;
  let sampleZ = z;
  for (let waveIndex = 0; waveIndex < iterations; waveIndex += 1) {
    const directionX = Math.cos(seed);
    const directionZ = Math.sin(seed);
    const phase = (directionX * sampleX + directionZ * sampleZ) * frequency + time * speed;
    const wave = amplitude * Math.exp(1.24 * Math.sin(phase) - 1.24);
    const derivativeScale = frequency * 1.24 * wave * Math.cos(phase);
    sampleX -= directionX * derivativeScale * amplitude * OCEAN_WAVE_SETTINGS.domainDrag;
    sampleZ -= directionZ * derivativeScale * amplitude * OCEAN_WAVE_SETTINGS.domainDrag;
    height += wave;
    amplitudeSum += amplitude;
    const rotatedX = 0.819152 * sampleX - 0.573576 * sampleZ;
    const rotatedZ = 0.573576 * sampleX + 0.819152 * sampleZ;
    sampleX = rotatedX + 2.37 + waveIndex * 0.19;
    sampleZ = rotatedZ - 1.61 + waveIndex * 0.13;
    frequency *= OCEAN_WAVE_SETTINGS.frequencyMultiplier * (0.97 + 0.045 * Math.sin(waveIndex * 1.618));
    amplitude *= OCEAN_WAVE_SETTINGS.amplitudeMultiplier * (0.97 + 0.035 * Math.cos(waveIndex * 1.117));
    speed *= OCEAN_WAVE_SETTINGS.speedMultiplier;
    seed += 2.39996323;
  }
  return (height / Math.max(amplitudeSum, 0.0001) - 0.42) * 0.32;
}

function createCoastalWaterMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uShallow: { value: new THREE.Color(COLORS.waterShallow) },
      uDeep: { value: new THREE.Color(COLORS.waterDeep) },
      uFoam: { value: new THREE.Color(COLORS.waterFoam) },
      uHaze: { value: new THREE.Color(COLORS.paper) },
      uSunDirection: { value: new THREE.Vector3(-0.45, 0.82, 0.34).normalize() },
    },
    vertexShader: `
      uniform float uTime;
      varying vec3 vWorldPosition;
      varying vec2 vSamplePosition;
      varying float vDepth;
      varying float vDomainFog;

      #define OCEAN_WAVE_COUNT ${OCEAN_WAVE_SETTINGS.vertexIterations}
      ${ACEROLA_OCEAN_FBM_GLSL}

      void main() {
        vec3 fbm = oceanFbm(position.xz, uTime);
        float shoreDisplacement = mix(0.28, 1.0, smoothstep(0.0, 0.16, uv.x));
        vec3 displaced = position;
        displaced.y += fbm.x * 0.32 * shoreDisplacement;
        vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
        vWorldPosition = worldPosition.xyz;
        vSamplePosition = position.xz;
        vDepth = uv.x;
        vDomainFog = max(
          smoothstep(0.84, 1.0, uv.x),
          max(1.0 - smoothstep(0.0, 0.105, uv.y), smoothstep(0.895, 1.0, uv.y))
        );
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uShallow;
      uniform vec3 uDeep;
      uniform vec3 uFoam;
      uniform vec3 uHaze;
      uniform vec3 uSunDirection;
      varying vec3 vWorldPosition;
      varying vec2 vSamplePosition;
      varying float vDepth;
      varying float vDomainFog;

      #define OCEAN_WAVE_COUNT ${OCEAN_WAVE_SETTINGS.fragmentIterations}
      ${ACEROLA_OCEAN_FBM_GLSL}

      void main() {
        vec3 fbm = oceanFbm(vSamplePosition, uTime);
        vec3 normal = normalize(vec3(-fbm.y * 0.88, 1.0, -fbm.z * 0.88));
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        vec3 halfDirection = normalize(uSunDirection + viewDirection);
        float ndotl = max(dot(normal, uSunDirection), 0.0);
        float diffuse = 0.70 + ndotl * 0.30;
        float facing = max(dot(normal, viewDirection), 0.0);
        float fresnel = 0.025 + 0.975 * pow(1.0 - facing, 5.0);
        float crest = smoothstep(-0.055, 0.26, fbm.x);
        float current = 0.5
          + sin(dot(vSamplePosition, vec2(0.071, 0.113)) - uTime * 0.18 + fbm.x * 3.1) * 0.27
          + sin(dot(vSamplePosition, vec2(-0.193, 0.047)) + uTime * 0.13) * 0.23;
        float crossedSwell = 0.5
          + sin(dot(vSamplePosition, vec2(0.127, -0.089)) + uTime * 0.11) * 0.24
          + sin(dot(vSamplePosition, vec2(-0.053, -0.151)) - uTime * 0.075) * 0.20;
        float shoreMask = 1.0 - smoothstep(0.012, 0.115, vDepth);
        float shoreFoam = shoreMask * smoothstep(0.48, 0.76, current + crest * 0.18);
        float openFoam = smoothstep(0.24, 0.56, fbm.x) * smoothstep(0.14, 0.68, vDepth) * 0.12;
        float glint = pow(max(dot(normal, halfDirection), 0.0), 92.0) * ndotl * 0.72;
        vec3 color = mix(uShallow, uDeep, smoothstep(0.02, 0.92, vDepth));
        color = mix(color, uShallow * 1.15, crest * 0.22 + crossedSwell * 0.055);
        color *= diffuse;
        color = mix(color, vec3(0.78, 0.88, 0.84), fresnel * 0.30);
        color = mix(color, uFoam, clamp(shoreFoam * 0.70 + openFoam + glint, 0.0, 0.88));
        color = mix(color, uHaze, smoothstep(0.04, 1.0, vDomainFog));
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
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

function distanceToPolyline(x, z, points = []) {
  let minimum = Infinity;
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
    minimum = Math.min(minimum, Math.hypot(x - (startX + dx * progress), z - (startZ + dz * progress)));
  }
  return minimum;
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
  if (!context?.coastline) return coast.shoreX;
  const progress = THREE.MathUtils.clamp((z - coast.minZ) / Math.max(0.001, coast.maxZ - coast.minZ), 0, 1);
  return context.coastline.getPoint(progress).x;
}

function createTerrainContext(perimeter, highwayCurve, railCurve, coastline) {
  return {
    perimeter,
    coastline,
    flatCorridors: [highwayCurve, railCurve]
      .filter(Boolean)
      .map((curve) => curve.getSpacedPoints(128)),
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
  const terrainBounds = context?.perimeter ? context.bounds : perimeter.ground;
  const outsideDistance = distanceOutsideCity(x, z, city);
  const terraceBlend = smoothRange(0.45, 8.6, outsideDistance);
  const shoreDistance = shorelineXAt(z, context?.perimeter ? context : perimeter) - x;
  const coastFade = smoothRange(0.3, 6.4, shoreDistance);
  const edgeDistance = Math.min(
    x - terrainBounds.minX,
    terrainBounds.maxX - x,
    z - terrainBounds.minZ,
    terrainBounds.maxZ - z,
  );
  // The terrain extends well outside the viewport, so this gentle reduction is
  // only insurance against a visible vertical skirt during aggressive panning.
  const edgeFade = 0.58 + smoothRange(0.4, 5.8, edgeDistance) * 0.42;
  const corridorDistance = distanceToCorridors(x, z, context?.flatCorridors);
  const corridorBlend = Number.isFinite(corridorDistance) ? smoothRange(0.9, 6.8, corridorDistance) : 1;

  const primary = terrainFbmAt(x, z);
  const secondary = terrainFbmAt(x + 73.4, z - 41.7);
  const normalized = THREE.MathUtils.clamp(primary * 0.72 + secondary * 0.28, -1, 1) * 0.5 + 0.5;
  const ridge = 1 - Math.abs(secondary);
  const regionalRise = smoothRange(3.5, 19, outsideDistance);
  const naturalElevation = TERRAIN_CONFIG.heightScale
    * (0.12 + normalized * 0.58 + ridge * ridge * 0.16 + regionalRise * 0.14)
    * terraceBlend
    * coastFade
    * edgeFade;
  // Transport corridors sit on a broad civil-engineered shoulder instead of
  // revealing the flattening mask as a narrow procedural trench.
  const corridorShoulder = (0.13 + normalized * 0.035) * terraceBlend * coastFade * edgeFade;
  const elevation = THREE.MathUtils.lerp(corridorShoulder, naturalElevation, corridorBlend);
  return TERRAIN_CONFIG.baseY + elevation;
}

function createRollingTerrainGeometry(context) {
  const bounds = context.bounds;
  const columns = TERRAIN_CONFIG.segmentsX;
  const rows = TERRAIN_CONFIG.segmentsZ;
  const positions = [];
  const indices = [];
  const colors = [];
  const lowColor = new THREE.Color(COLORS.paperDark);
  const grassColor = new THREE.Color(COLORS.hillLight);
  const earthColor = new THREE.Color(0x9d8862);
  const beachColor = new THREE.Color(COLORS.sand);
  const hazeColor = new THREE.Color(COLORS.paper);
  for (let row = 0; row <= rows; row += 1) {
    const progressZ = row / rows;
    const shore = context.coastline.getPoint(progressZ);
    for (let column = 0; column <= columns; column += 1) {
      const progressX = column / columns;
      const worldX = THREE.MathUtils.lerp(bounds.minX, shore.x, progressX);
      const worldZ = shore.z;
      const height = terrainHeightAt(worldX, worldZ, context);
      positions.push(worldX, height, worldZ);

      const sampleRadius = 0.34;
      const slopeX = terrainHeightAt(worldX + sampleRadius, worldZ, context)
        - terrainHeightAt(worldX - sampleRadius, worldZ, context);
      const slopeZ = terrainHeightAt(worldX, worldZ + sampleRadius, context)
        - terrainHeightAt(worldX, worldZ - sampleRadius, context);
      const slope = Math.hypot(slopeX, slopeZ) / (sampleRadius * 2);
      const outside = distanceOutsideCity(worldX, worldZ, context.perimeter.bounds);
      const grassBlend = smoothRange(0.75, 4.8, outside);
      const earthBlend = smoothRange(0.24, 0.86, slope) * 0.72;
      const beachBlend = 1 - smoothRange(0.15, 2.25, shore.x - worldX);
      const color = lowColor.clone()
        .lerp(grassColor, grassBlend)
        .lerp(earthColor, earthBlend)
        .lerp(beachColor, beachBlend * 0.88);
      color.multiplyScalar(0.965 + terrainFbmAt(worldX + 18.2, worldZ - 9.7) * 0.045);
      const domainEdgeDistance = Math.min(
        worldX - bounds.minX,
        worldZ - bounds.minZ,
        bounds.maxZ - worldZ,
      );
      const horizonFog = 1 - smoothRange(0.35, 10.5, domainEdgeDistance);
      color.lerp(hazeColor, horizonFog);
      colors.push(color.r, color.g, color.b);

      if (row < rows && column < columns) {
        const current = row * (columns + 1) + column;
        const right = current + 1;
        const next = current + columns + 1;
        const nextRight = next + 1;
        indices.push(current, next, right, right, next, nextRight);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
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

function streetCurve(points, height = 0.34) {
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
  const label = document.createElement("div");
  label.className = "city3d-label";
  label.dataset.entity = entity.id;
  label.dataset.kind = entity.kind;
  label.setAttribute("aria-hidden", "true");

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
        this.renderer.shadowMap.autoUpdate = !this.reducedMotion;
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

    this.camera = new THREE.OrthographicCamera(-20, 20, 14, -14, 0.1, 180);
    this.camera.position.set(...CAMERA_HOME.position);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 0.94;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.shadowMap.autoUpdate = !this.reducedMotion;
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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.075;
    this.controls.enablePan = true;
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
    this.onControlsChange = () => this.updateCompass();
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
    const pointerdown = (event) => {
      if (event.button !== 0) return;
      this.pointerStart = { x: event.clientX, y: event.clientY };
    };
    const pointerup = (event) => {
      if (!this.pointerStart || Math.hypot(event.clientX - this.pointerStart.x, event.clientY - this.pointerStart.y) > 5) {
        this.pointerStart = null;
        return;
      }
      this.pointerStart = null;
      const entityId = this.entityAtPointer(event);
      if (entityId) this.onSelect(entityId);
    };
    const pointermove = (event) => {
      const isEntity = Boolean(this.entityAtPointer(event));
      this.renderer.domElement.classList.toggle("is-over-entity", isEntity);
    };
    const pointerleave = () => this.renderer.domElement.classList.remove("is-over-entity");
    const keydown = (event) => {
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
    this.inputHandlers = { pointerdown, pointerup, pointermove, pointerleave, keydown };
    for (const [type, handler] of Object.entries(this.inputHandlers)) {
      this.renderer.domElement.addEventListener(type, handler);
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
    const aspect = width / height;
    const frustum = this.baseFrustum ?? 39;
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
        return prepareAsset(gltf.scene);
      }));
    }
    return this.assetCache.get(key);
  }

  async cloneAsset(key, fit) {
    return fitClone(await this.loadAsset(key), fit);
  }

  clearWorld() {
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
      this.buildRoadDetails(layout, generation),
      ...layout.entities.map((entity) => this.addEntity(entity, generation)),
      this.buildAmbientWorld(layout, generation),
    ];
    const results = await Promise.allSettled(jobs);
    if (generation !== this.worldGeneration) return false;
    const failures = results.filter((result) => result.status === "rejected");
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

    const beachMaterial = new THREE.MeshStandardMaterial({ color: COLORS.sand, roughness: 1 });
    addRibbon(this.world, this.coastlineCurve, 1.36, beachMaterial, 0.22, 96);
    this.waterMaterial = createCoastalWaterMaterial();
    const ocean = new THREE.Mesh(
      createCoastalWaterGeometry(this.coastlineCurve, this.perimeter.coast.oceanX, 160, 42),
      this.waterMaterial,
    );
    ocean.name = "open-ocean-boundary";
    ocean.receiveShadow = true;
    this.world.add(ocean);

    const railBed = new THREE.MeshStandardMaterial({ color: 0x747063, roughness: 1 });
    addRibbon(this.world, this.railCurve, this.perimeter.rail.width, railBed, 0.22);
    this.addProceduralRail();
  }

  addTerrain() {
    this.terrainContext = createTerrainContext(
      this.perimeter,
      this.highwayCurve,
      this.railCurve,
      this.coastlineCurve,
    );
    const geometry = createRollingTerrainGeometry(this.terrainContext);
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 1,
      metalness: 0,
    });
    const terrain = new THREE.Mesh(geometry, material);
    terrain.name = "analytic-rolling-terrain";
    terrain.receiveShadow = true;
    terrain.raycast = () => {};
    this.world.add(terrain);
    this.addTerrainGrass();
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
    for (let index = 0; index < 7200 && placed < TERRAIN_CONFIG.grassCount; index += 1) {
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
    const railMaterial = new THREE.MeshStandardMaterial({
      color: 0x343b3d,
      metalness: 0.42,
      roughness: 0.48,
    });
    for (const side of [-0.43, 0.43]) {
      const path = offsetCurve(this.railCurve, side, 220);
      const rail = new THREE.Mesh(
        new THREE.TubeGeometry(path, 260, 0.055, 6, false),
        railMaterial,
      );
      rail.name = "continuous-procedural-rail";
      rail.position.y = 0.1;
      rail.castShadow = true;
      rail.receiveShadow = true;
      rail.raycast = () => {};
      this.world.add(rail);
    }

    const length = this.railCurve.getLength();
    const count = Math.max(1, Math.floor(length / 0.72));
    const sleepers = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1.26, 0.08, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x8a6547, roughness: 1 }),
      count,
    );
    sleepers.name = "continuous-procedural-sleepers";
    sleepers.receiveShadow = true;
    sleepers.raycast = () => {};
    const transform = new THREE.Object3D();
    for (let index = 0; index < count; index += 1) {
      const progress = (index + 0.5) / count;
      const point = this.railCurve.getPointAt(progress);
      const tangent = this.railCurve.getTangentAt(Math.min(0.999, progress));
      transform.position.set(point.x, point.y + 0.055, point.z);
      transform.rotation.set(0, Math.atan2(tangent.x, tangent.z), 0);
      transform.updateMatrix();
      sleepers.setMatrixAt(index, transform.matrix);
    }
    sleepers.instanceMatrix.needsUpdate = true;
    this.world.add(sleepers);
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
    jobs.push(this.placeAsset("roads/traffic-light", {
      x: minCenter + lotSize / 2 + roadWidth / 2,
      y: 0.18,
      z: minCenter + lotSize / 2 + roadWidth / 2,
      fit: { width: 0.65, depth: 0.65, height: 2.1 },
    }, generation));
    jobs.push(this.addHighwayRoadAssets(generation));
    await Promise.all(jobs);
  }

  async addHighwayRoadAssets(generation) {
    const straightRuns = this.highwayStraights.map((curve) => this.placeTransitAssetRun(
      "roads/straight",
      curve,
      {
        crossWidth: this.perimeter.highway.width,
        maxSegmentLength: 4.35,
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
    const length = curve.getLength();
    const segmentCount = Math.max(1, Math.ceil(length / options.maxSegmentLength));
    const segmentLength = (length / segmentCount) * 1.025;
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
        ? Math.atan2(tangent.z, tangent.x)
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
    const labelObject = new CSS2DObject(labelElement);
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
    link.setAttribute("aria-label", "Build your own city with Deploy Manager on GitHub");
    const label = new CSS2DObject(link);
    label.position.set(anchor.cell.x, 5.7, anchor.cell.z);
    this.world.add(label);
  }

  async addTerrainTrees(generation) {
    const placements = [];
    const terrain = this.terrainContext;
    if (!terrain) return;
    for (let index = 0; index < 1400 && placements.length < TERRAIN_CONFIG.treeCount; index += 1) {
      const randomX = ((Math.sin(index * 91.731 + 0.43) * 43758.5453) % 1 + 1) % 1;
      const randomZ = ((Math.sin(index * 47.173 + 2.17) * 24634.6345) % 1 + 1) % 1;
      const shore = terrain.coastline.getPoint(randomZ);
      const x = THREE.MathUtils.lerp(terrain.bounds.minX + 4.2, shore.x - 4.2, randomX);
      const z = shore.z;
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
        || distanceOutsideCity(x, z, terrain.perimeter.bounds) < 5.2
        || distanceToCorridors(x, z, terrain.flatCorridors) < 3.6
        || horizonDistance < 11.4
        || densityRoll > density ** 1.35
        || placements.some((tree) => Math.hypot(tree.x - x, tree.z - z) < 2.35)
      ) continue;
      placements.push({ x, y, z, height: 1.82 + density * 0.65 + ((index * 37) % 9) * 0.09 });
    }
    const trees = await Promise.all(placements.map(async (placement, index) => {
      const tree = await this.cloneAsset("suburban/tree", {
        width: placement.height * 0.42,
        depth: placement.height * 0.42,
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
      offset: 0.16,
      speedVariance: TRAIN_TRAFFIC_PROFILE.variance,
      speedFrequency: TRAIN_TRAFFIC_PROFILE.frequency,
      speedPhase: 0.8,
      carGap: 3.08 / trackLength,
    });
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
      offset: 0.22,
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
      offset: 0.7,
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
    const truck = await this.cloneAsset("cars/delivery", { width: 1.08, depth: 2.05, height: 1.15 });
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
        width: index === 1 ? 1.02 : 0.92,
        depth: index === 1 ? 1.95 : 1.78,
        height: index === 1 ? 1.02 : 0.98,
      });
      if (generation !== this.worldGeneration) return;
      const outward = createStreetRoutePoints(docker, target, this.layout, { startAccess: yardAccess });
      const returning = createStreetRoutePoints(target, docker, this.layout, { endAccess: yardAccess });
      const loopPoints = [...outward, ...returning.slice(1)];
      const curve = streetCurve(loopPoints, 0.255 + index * 0.012);
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
      group.userData.beacon?.material.color.setHex(statusColor(status));
      if (group.userData.labelElement) group.userData.labelElement.dataset.status = status;
    }
  }

  setLiveDeployments(appIds = []) {
    this.liveAppIds = new Set(appIds);
    for (const group of this.entityGroups.values()) {
      group.userData.live = this.liveAppIds.has(group.userData.appId)
        || (this.liveAppIds.size > 0 && ["deploy-manager", "docker"].includes(group.userData.entityId));
      group.userData.labelElement?.classList.toggle("is-live", group.userData.live);
    }
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
    if (!this.visible) return;
    if (
      this.reducedMotion
      && frameTime - this.lastReducedMotionFrame < REDUCED_MOTION_FRAME_MS
    ) return;
    if (this.reducedMotion) this.lastReducedMotionFrame = frameTime;
    const elapsed = (frameTime - this.startedAt) / 1000;
    const motionElapsed = this.reducedMotion ? 0 : elapsed;
    this.controls.update();
    if (this.waterMaterial) this.waterMaterial.uniforms.uTime.value = motionElapsed;

    for (const item of this.motion) {
      const progress = variableProgress(item, motionElapsed);
      const point = item.curve.getPointAt(progress);
      const tangent = item.curve.getTangentAt(Math.min(0.999, progress));
      item.object.position.copy(point);
      if (item.surface === "ocean") {
        item.object.position.y += oceanWaveHeightAt(point.x, point.z, motionElapsed);
      }
      if (item.bob) item.object.position.y += Math.sin(motionElapsed * 2.1 + item.offset * 8) * item.bob;
      item.object.rotation.y = Math.atan2(tangent.x, tangent.z) + (item.rotationOffset ?? 0);
    }
    for (const train of this.trains) {
      const headProgress = variableProgress(train, motionElapsed);
      train.cars.forEach((car, index) => {
        let progress = headProgress - index * train.carGap;
        progress -= Math.floor(progress);
        const point = train.curve.getPointAt(progress);
        const tangent = train.curve.getTangentAt(Math.min(0.999, progress));
        car.position.copy(point);
        car.rotation.y = Math.atan2(tangent.x, tangent.z);
      });
    }
    for (const item of this.signalMotion) {
      let progress = item.offset + motionElapsed * item.speed;
      progress -= Math.floor(progress);
      item.object.position.copy(item.curve.getPointAt(progress));
      item.object.position.y += 0.08 + Math.sin(motionElapsed * 4 + item.offset * 9) * 0.04;
    }
    for (const item of this.smoke) {
      const cycle = (motionElapsed * 0.16 + item.phase) % 1;
      item.puff.position.y = item.baseY + cycle * 1.35;
      item.puff.position.x = item.baseX + Math.sin(motionElapsed * 0.8 + item.phase * 6) * 0.08;
      item.puff.scale.setScalar(0.72 + cycle * 1.08);
      item.puff.material.opacity = Math.sin(cycle * Math.PI) * 0.3;
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
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
    this.motionPreference?.removeEventListener?.("change", this.onMotionPreferenceChange);
    this.controls?.removeEventListener("change", this.onControlsChange);
    this.controls?.dispose();
    for (const [type, handler] of Object.entries(this.inputHandlers ?? {})) {
      this.renderer.domElement.removeEventListener(type, handler);
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
