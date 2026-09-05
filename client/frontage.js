export const HOUSE_ACCESS = Object.freeze({
  "suburban/building-a": { offset: 0, kind: "path" },
  "suburban/building-b": { offset: .18, kind: "driveway" },
  "suburban/building-d": { offset: -.16, kind: "driveway" },
  "suburban/building-e": { offset: 0, kind: "path" },
  "suburban/building-h": { offset: 0, kind: "path" },
  "suburban/building-r": { offset: 0, kind: "path" },
});

// An exact private entrance-to-public-kerb segment. No longitudinal end caps.
export function createFrontage(house, streetZ, bounds) {
  const access = HOUSE_ACCESS[house.key] ?? { offset: 0, kind: "path" };
  const direction = Math.sign(streetZ - house.z);
  const start = {
    x: house.x + access.offset * (bounds.max.x - bounds.min.x) * Math.cos(house.rotation),
    z: direction > 0 ? bounds.max.z + .025 : bounds.min.z - .025,
  };
  const bulb = { x: -11.5, z: streetZ, radius: 1.65 };
  let end;
  if (house.x < -10.5) {
    const dx = start.x - bulb.x, dz = start.z - bulb.z, length = Math.hypot(dx, dz);
    end = { x: bulb.x + dx / length * bulb.radius, z: bulb.z + dz / length * bulb.radius };
  } else end = { x: start.x, z: streetZ - direction * .86 };
  return { start, end, kind: access.kind, width: access.kind === "driveway" ? .95 : .42 };
}
