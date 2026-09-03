import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import * as THREE from "three";

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
  createTransitCurves,
  oceanWaveHeightAt,
  terrainFbmAt,
  terrainHeightAt,
  vegetationDensityAt,
} from "../client/city3d.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const topology = JSON.parse(readFileSync(new URL("../config/public-topology.json", import.meta.url), "utf8"));

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
  assert.ok(Math.abs(sign.x - perimeter.highway.x) < 1e-9);
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

test("the clear default view uses continuous protected terrain and Acerola-style ocean fBM", () => {
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
  assert.equal(OCEAN_WAVE_SETTINGS.frequencyBands, 4);
  assert.equal(OCEAN_WAVE_SETTINGS.frequencyMultiplier, 1.47);
  assert.equal(OCEAN_WAVE_SETTINGS.amplitudeMultiplier, 0.67);
  assert.ok(OCEAN_WAVE_SETTINGS.fragmentIterations > OCEAN_WAVE_SETTINGS.vertexIterations);
  assert.notEqual(oceanWaveHeightAt(24, 4, 0), oceanWaveHeightAt(24, 4, 3));
  assert.notEqual(oceanWaveHeightAt(24, 4, 0), oceanWaveHeightAt(28, 4, 0));
  const source = readFileSync(new URL("../client/city3d.js", import.meta.url), "utf8");
  assert.doesNotMatch(source, /new THREE\.Fog|addFogBanks|FogExp2/);
  assert.doesNotMatch(source, /addHills|landscape-hill/);
  assert.match(source, /analytic-rolling-terrain/);
  assert.match(source, /open-ocean-boundary/);
  assert.match(source, /new THREE\.InstancedMesh/);
  assert.match(source, /procedural-boat-wake/);
  assert.match(source, /future-foundation/);
  assert.match(source, /continuous-procedural-rail/);
  assert.match(source, /sampleX = scaledX \* cosine - scaledZ \* sine/);
  assert.match(source, /samplePoint -= derivative \* amplitude/);
  assert.match(source, /exp\(1\.24 \* sin\(phase\) - 1\.24\)/);
  assert.match(source, /new THREE\.ShaderMaterial/);
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
