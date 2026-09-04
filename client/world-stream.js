import * as THREE from "three";
import { coastXAt } from "./ocean.js";
import { roadStrip, continuousRail } from "./transport.js";

export const WORLD_CHUNK_SIZE = 32;

export function createContinuations(transit) {
  return ["highway", "rail"].flatMap((kind) => [0, 1].map((end) => {
    const origin = transit[kind].getPointAt(end);
    const direction = transit[kind].getTangentAt(end ? 0.999999 : 0.000001).multiplyScalar(end ? 1 : -1).normalize();
    return { kind, end, origin, direction };
  }));
}

export function continuationPoint(route, distance) {
  const d = Math.max(0, distance);
  const point = route.origin.clone().addScaledVector(route.direction, d);
  // Monotone progress along each corridor and zero lateral derivative at the
  // join. Roads stay inland; the two railway arms retain their separation.
  const bend = 4 * (1 - Math.cos(d / 48));
  if (route.kind === "highway") point.x -= bend;
  else point.z += bend;
  return point;
}

export function continuationDistance(x, z, routes) {
  let nearest = Infinity;
  for (const route of routes ?? []) {
    const d = (x - route.origin.x) * route.direction.x + (z - route.origin.z) * route.direction.z;
    if (d < -2) continue;
    const p = continuationPoint(route, d);
    nearest = Math.min(nearest, Math.hypot(p.x - x, p.z - z));
  }
  return nearest;
}

export function visibleChunkKeys(target, radius, size = WORLD_CHUNK_SIZE) {
  const keys = [];
  for (let x = Math.floor((target.x - radius) / size); x <= Math.floor((target.x + radius) / size); x += 1) {
    for (let z = Math.floor((target.z - radius) / size); z <= Math.floor((target.z + radius) / size); z += 1) keys.push(`${x}:${z}`);
  }
  return keys;
}

export function createSurfaceTile(cx, cz, ocean, { shoreX, heightAt, colorAt }, resolution = 24) {
  const size = WORLD_CHUNK_SIZE;
  const positions = [], colors = [], indices = [];
  for (let row = 0; row <= resolution; row += 1) {
    const z = cz * size + row / resolution * size;
    const shore = coastXAt(z, shoreX);
    const left = ocean ? Math.max(cx * size, shore) : cx * size;
    const right = ocean ? (cx + 1) * size : Math.min((cx + 1) * size, shore);
    for (let col = 0; col <= resolution; col += 1) {
      const x = THREE.MathUtils.lerp(left, Math.max(left, right), col / resolution);
      positions.push(x, ocean ? 0 : heightAt(x, z), z);
      const color = ocean ? new THREE.Color() : colorAt(x, z);
      colors.push(color.r, color.g, color.b);
      if (col < resolution && row < resolution) {
        const a = row * (resolution + 1) + col, b = a + resolution + 1;
        indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  // Analytic finite differences match normals along chunk boundaries.
  const normals = [];
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i], z = positions[i + 2], e = 0.12;
    const n = ocean ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(
      heightAt(x - e, z) - heightAt(x + e, z), 2 * e, heightAt(x, z - e) - heightAt(x, z + e),
    ).normalize();
    normals.push(n.x, n.y, n.z);
  }
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.computeBoundingSphere();
  return geometry;
}

// The streamer owns generated geometry and instances, but borrows materials
// and source GLB geometry. Unloading a chunk must never dispose cached assets.
export class WorldStream {
  constructor({ world, waterMaterial, roadModel, treeModel, context, heightAt, colorAt, siteDistance }) {
    Object.assign(this, { world, waterMaterial, roadModel, treeModel, context, heightAt, colorAt, siteDistance });
    this.chunks = new Map(); this.routes = new Map();
    this.terrainMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 });
    this.disposed = false;
  }
  update(target, radius, {frustum = null, deferred = false} = {}) {
    if (this.disposed) return;
    const keys = new Set(visibleChunkKeys(target, radius).filter(key=> {
      if (!frustum) return true;
      const[x,z]=key.split(':').map(Number);
      return frustum.intersectsBox(new THREE.Box3(new THREE.Vector3(x*32-5,-1,z*32-5),new THREE.Vector3((x+1)*32+5,9,(z+1)*32+5)));
    }));
    for (const [key, group] of this.chunks) if (!keys.has(key)) { this.release(group); this.chunks.delete(key); }
    this.pending = [...keys].filter(key => !this.chunks.has(key)).sort((a,b) => {
      const distance=key=>{const[x,z]=key.split(':').map(Number);return Math.hypot((x+.5)*32-target.x,(z+.5)*32-target.z);};
      return distance(a)-distance(b);
    });
    const needed = new Set();
    this.pendingRoutes = [];
    for (const [index, route] of this.context.continuations.entries()) {
      const projection = (target.x - route.origin.x) * route.direction.x + (target.z - route.origin.z) * route.direction.z;
      const nearest = continuationPoint(route, projection);
      if (Math.hypot(nearest.x - target.x, nearest.z - target.z) > radius + 45) continue;
      for (let chunk = Math.max(0, Math.floor((projection - radius - 12) / 32)); chunk <= Math.max(-1, Math.floor((projection + radius + 12) / 32)); chunk += 1) {
        const key = `${index}:${chunk}`; needed.add(key);
        if (!this.routes.has(key)) {
          this.pendingRoutes.push({key,route,chunk});
        }
      }
    }
    for (const [key, group] of this.routes) if (!needed.has(key)) { this.release(group); this.routes.delete(key); }
    if (!deferred) this.drain(Infinity);
  }
  drain(limit = 1) {
    if (this.disposed) return;
    for(let i=0;i<limit;i++) {
      if (this.pending?.length) this.buildSurfaceChunk(this.pending.shift());
      else if (this.pendingRoutes?.length) {
        const {key,route,chunk}=this.pendingRoutes.shift(),group=this.buildRouteChunk(route,chunk);
        this.world.add(group);this.routes.set(key,group);
      } else break;
    }
  }
  get pendingCount() { return (this.pending?.length??0)+(this.pendingRoutes?.length??0); }
  buildSurfaceChunk(key) {
    const [cx, cz] = key.split(":").map(Number);
      const group = new THREE.Group(); group.name = `world-chunk:${key}`;
      const minX = cx * WORLD_CHUNK_SIZE, maxX = minX + WORLD_CHUNK_SIZE;
      const surface = { shoreX: this.context.perimeter.coast.shoreX, heightAt: this.heightAt, colorAt: this.colorAt };
      if (minX < surface.shoreX + 1) {
        const mesh = new THREE.Mesh(createSurfaceTile(cx, cz, false, surface), this.terrainMaterial);
        mesh.name = "analytic-rolling-terrain"; mesh.receiveShadow = true; group.add(mesh);
      }
      if (maxX > surface.shoreX - 1) {
        const mesh = new THREE.Mesh(createSurfaceTile(cx, cz, true, surface), this.waterMaterial);
        mesh.name = "open-ocean-boundary"; group.add(mesh);
      }
      // The handcrafted region keeps its curated vegetation; distant chunks
      // grow deterministic woodland so revisiting a location preserves it.
      if (minX < surface.shoreX - 2) {
        const placements = [];
        for (let i = 0; i < 45; i += 1) {
          const random = (salt) => ((Math.sin(cx * 127.1 + cz * 311.7 + i * 71.3 + salt) * 43758.5453) % 1 + 1) % 1;
          const x = minX + random(1) * WORLD_CHUNK_SIZE, z = (cz + random(3)) * WORLD_CHUNK_SIZE;
          const b = this.context.perimeter.bounds;
          if (x > b.minX - 32 && x < b.maxX + 2 && z > b.minZ - 30 && z < b.maxZ + 38) continue;
          if (x > coastXAt(z, surface.shoreX) - 2 || this.siteDistance(x, z) < 3.4) continue;
          placements.push({ x, z, scale: 0.8 + random(4) * 0.7 });
        }
        this.treeModel.updateMatrixWorld(true);
        this.treeModel.traverse((part) => {
          if (!part.isMesh) return;
          const trees = new THREE.InstancedMesh(part.geometry, part.material, placements.length);
          trees.userData.streamBorrowed = true;
          const dummy = new THREE.Object3D();
          placements.forEach((p, i) => {
            dummy.position.set(p.x, this.heightAt(p.x, p.z), p.z); dummy.scale.setScalar(p.scale); dummy.updateMatrix();
            trees.setMatrixAt(i, dummy.matrix.clone().multiply(part.matrixWorld));
          });
          trees.castShadow = true; group.add(trees);
        });
      }
      this.world.add(group); this.chunks.set(key, group);
  }
  buildRouteChunk(route, chunk) {
    const start = chunk * 32, end = start + 32;
    if (route.kind === "rail") {
      const phase = route.end ? this.context.railLength : 0;
      return continuousRail(d => continuationPoint(route,d), start, end, {phase});
    }
    const group = new THREE.Group(); group.name = `endless-highway:${chunk}`;
    group.add(roadStrip(this.roadModel,d=> {const p=continuationPoint(route,start+d);p.y=0.145;return p;},32,2.28));
    return group;
  }
  release(group) {
    this.world.remove(group);
    const materials = new Set();
    group.traverse((part) => {
      if (part.isInstancedMesh) part.dispose();
      if (part.geometry && !part.userData.streamBorrowed) part.geometry.dispose();
      if (part.material?.userData.streamOwned) materials.add(part.material);
    });
    for (const material of materials) material.dispose();
  }
  dispose() {
    this.disposed = true;
    this.pending=[];this.pendingRoutes=[];
    for (const group of [...this.chunks.values(), ...this.routes.values()]) this.release(group);
    this.chunks.clear(); this.routes.clear();
    this.terrainMaterial.dispose();
  }
}
