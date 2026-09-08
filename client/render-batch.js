import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

// Batch only immutable scenery. Interactive buildings, animated objects and
// independently unloaded world chunks retain their own ownership and identity.
export function batchStaticScenery(root, exclusions = []) {
  const excluded = new Set(exclusions.filter(Boolean)), buckets = new Map(), lineMaterials = new Map();
  root.updateMatrixWorld(true);
  const inverse = root.matrixWorld.clone().invert();
  root.traverse((node) => {
    if ((!node.isMesh && !node.isLineSegments) || node.isInstancedMesh || Array.isArray(node.material) || (node.material.transparent && !node.isLineSegments)) return;
    for (let parent = node; parent; parent = parent.parent) if (excluded.has(parent)) return;
    // Identical ink strokes used to keep one material and draw per little box.
    // Merge them in the same local owner so moving a campus still moves its ink.
    if(node.isLineSegments && node.material.isLineBasicMaterial && !node.material.map) {
      const m=node.material, key=[m.color.getHex(),m.opacity,m.transparent,m.depthTest,m.depthWrite,m.blending,m.linewidth,m.toneMapped].join(':');
      if(!lineMaterials.has(key))lineMaterials.set(key,m);
      node.material=lineMaterials.get(key);
    }
    const spatial = node.name.includes("tree") ? `${Math.floor(node.matrixWorld.elements[12]/16)}:${Math.floor(node.matrixWorld.elements[14]/16)}` : "";
    const key = `${spatial}:${node.isLineSegments ? "line" : "mesh"}:${node.material.id}:${node.castShadow}:${node.receiveShadow}:${Object.keys(node.geometry.attributes).sort().join(",")}`;
    if (!buckets.has(key)) buckets.set(key, []); buckets.get(key).push(node);
  });
  let saved = 0;
  for (const nodes of buckets.values()) {
    if (nodes.length < 2) continue;
    const first = nodes[0], repeated = first.isMesh && nodes.every((node) => node.geometry === first.geometry);
    let batch;
    if (repeated) {
      batch = new THREE.InstancedMesh(first.geometry, first.material, nodes.length);
      nodes.forEach((node, i) => batch.setMatrixAt(i, inverse.clone().multiply(node.matrixWorld)));
    } else {
      const geometries = nodes.map((node) => {
        const geometry = node.geometry.index ? node.geometry.toNonIndexed() : node.geometry.clone();
        return geometry.applyMatrix4(inverse.clone().multiply(node.matrixWorld));
      });
      const merged = mergeGeometries(geometries);
      for (const geometry of geometries) geometry.dispose();
      if (!merged) continue;
      batch = first.isLineSegments ? new THREE.LineSegments(merged, first.material) : new THREE.Mesh(merged, first.material);
    }
    batch.name = "batched-static-scenery"; batch.castShadow = first.castShadow; batch.receiveShadow = first.receiveShadow;
    // Preserve independently excluded children and remove only the draw object.
    for (const node of nodes) {
      for (const child of [...node.children]) if (excluded.has(child)) root.attach(child);
      node.parent?.remove(node);
    }
    root.add(batch); saved += nodes.length - 1;
    if (!repeated) for (const geometry of new Set(nodes.map((node) => node.geometry))) {
      if (!geometry.userData.deployManagerSharedAsset) geometry.dispose();
    }
  }
  return saved;
}
