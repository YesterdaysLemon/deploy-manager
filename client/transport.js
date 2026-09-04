import * as THREE from "three";

export function createBoulevard(bounds, offset = 1.05, radius = 0.86) {
  const x0 = bounds.minX - offset, x1 = bounds.maxX + offset;
  const z0 = bounds.minZ - offset, z1 = bounds.maxZ + offset;
  const r = radius, k = r * 0.5522847498;
  const v = (x, z) => new THREE.Vector3(x, 0.145, z);
  const path = new THREE.CurvePath();
  const line = (a, b) => path.add(new THREE.LineCurve3(v(...a), v(...b)));
  const corner = (a, b, c, d) => path.add(new THREE.CubicBezierCurve3(v(...a), v(...b), v(...c), v(...d)));
  line([x0+r,z0], [x1-r,z0]); corner([x1-r,z0],[x1-r+k,z0],[x1,z0+r-k],[x1,z0+r]);
  line([x1,z0+r], [x1,z1-r]); corner([x1,z1-r],[x1,z1-r+k],[x1-r+k,z1],[x1-r,z1]);
  line([x1-r,z1], [x0+r,z1]); corner([x0+r,z1],[x0+r-k,z1],[x0,z1-r+k],[x0,z1-r]);
  line([x0,z1-r], [x0,z0+r]); corner([x0,z0+r],[x0,z0+r-k],[x0+r-k,z0],[x0+r,z0]);
  return path;
}

// Bend the authored road's triangles along a continuous centerline, keeping its
// palette UVs. End-cap faces and per-tile ink outlines are intentionally absent.
// Adjacent runs therefore share their cross-section instead of exposing seams.
export function roadStrip(source, pointAt, length, width = 1.72, step = width) {
  source.updateMatrixWorld(true);
  let part; source.traverse((node) => { if (node.isMesh && !part) part = node; });
  const template = part.geometry.index ? part.geometry.toNonIndexed() : part.geometry.clone();
  template.applyMatrix4(part.matrixWorld);
  template.computeBoundingBox();
  const b = template.boundingBox, extent = b.max.x - b.min.x;
  const centerZ = (b.max.z + b.min.z) / 2, depth = b.max.z - b.min.z;
  const pos = template.getAttribute("position"), uv = template.getAttribute("uv"), norm = template.getAttribute("normal");
  const positions = [], uvs = [], normals = [];
  const count = Math.max(1, Math.ceil(length / step)), tileLength = length / count;
  for (let tile = 0; tile < count; tile++) for (let face = 0; face < pos.count; face += 3) {
    if (Math.abs(norm.getX(face)) > 0.99 && Math.abs(norm.getX(face + 1)) > 0.99 && Math.abs(norm.getX(face + 2)) > 0.99) continue;
    for (let j = 0; j < 3; j++) {
      const i = face + j;
      const distance = (tile + (pos.getX(i) - b.min.x) / extent) * tileLength;
      const point = pointAt(distance);
      const tangent = pointAt(Math.min(length, distance + 0.005)).sub(pointAt(Math.max(0, distance - 0.005))).normalize();
      const side = new THREE.Vector3(-tangent.z, 0, tangent.x);
      point.addScaledVector(side, (pos.getZ(i) - centerZ) / depth * width);
      point.y += (pos.getY(i) - b.min.y) / depth * width;
      positions.push(point.x, point.y, point.z);
      const n = tangent.clone().multiplyScalar(norm.getX(i)).addScaledVector(side, norm.getZ(i)); n.y = norm.getY(i); n.normalize();
      normals.push(n.x, n.y, n.z); uvs.push(uv.getX(i), uv.getY(i));
    }
  }
  template.dispose();
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeBoundingSphere();
  const mesh = new THREE.Mesh(geometry, part.material); mesh.name = "continuous-authored-road"; mesh.receiveShadow = true;
  return mesh;
}

export const RAIL_SPACING = 0.72;
export function continuousRail(pointAt, start, end, { phase = 0 } = {}) {
  const group = new THREE.Group(); group.name = "continuous-rail-corridor";
  const steps = Math.max(2, Math.ceil((end - start) / 0.6));
  const positions = [[], [], []], indices = [], normals = [[], [], []];
  // A ballast ribbon plus two steel bars use exactly the same sampled curve.
  for (let i = 0; i <= steps; i++) {
    const d = THREE.MathUtils.lerp(start, end, i / steps);
    const p = pointAt(d), t = pointAt(d + 0.005).sub(pointAt(d - 0.005)).normalize();
    const n = new THREE.Vector3(-t.z, 0, t.x);
    for (let strip = 0; strip < 3; strip++) {
      const center = strip === 0 ? 0 : strip === 1 ? -0.43 : 0.43;
      const half = strip === 0 ? 0.74 : 0.055, y = strip === 0 ? 0 : 0.11;
      for (const edge of [-half, half]) {
        const vertex = p.clone().addScaledVector(n, center + edge); vertex.y += y;
        positions[strip].push(vertex.x, vertex.y, vertex.z); normals[strip].push(0, 1, 0);
      }
    }
    if (i < steps) { const a = i * 2; indices.push(a,a+1,a+2,a+1,a+3,a+2); }
  }
  const materials = [new THREE.MeshStandardMaterial({ color: 0x747063, roughness: 1 }), new THREE.MeshStandardMaterial({ color: 0x343b3d, metalness: 0.35, roughness: 0.55 })];
  for (const material of materials) material.userData.streamOwned = true;
  positions.forEach((vertices, strip) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals[strip], 3)); geometry.setIndex(indices);
    const mesh = new THREE.Mesh(geometry, materials[strip ? 1 : 0]); mesh.receiveShadow = true; group.add(mesh);
  });
  const first = Math.ceil((start + phase) / RAIL_SPACING), last = Math.ceil((end + phase) / RAIL_SPACING);
  const ties = new THREE.InstancedMesh(new THREE.BoxGeometry(1.26, 0.08, 0.16), new THREE.MeshStandardMaterial({ color: 0x8a6547, roughness: 1 }), Math.max(0,last-first));
  ties.material.userData.streamOwned = true;
  const dummy = new THREE.Object3D();
  for (let index = first; index < last; index++) {
    const d = index * RAIL_SPACING - phase, p = pointAt(d), t = pointAt(d+0.005).sub(pointAt(d-0.005));
    dummy.position.copy(p); dummy.position.y += 0.055; dummy.rotation.y = Math.atan2(t.x,t.z); dummy.updateMatrix(); ties.setMatrixAt(index-first,dummy.matrix);
  }
  ties.receiveShadow = true; group.add(ties); return group;
}
