export const CONTROL_PLOT_ADDRESSES = Object.freeze([
  Object.freeze({ x: -0.5, z: -0.5 }),
  Object.freeze({ x: 0.5, z: -0.5 }),
  Object.freeze({ x: -0.5, z: 0.5 }),
  Object.freeze({ x: 0.5, z: 0.5 }),
]);

function isHalfStep(value) {
  const doubled = Math.round(value * 2);
  return Number.isFinite(value)
    && Math.abs(value) <= 31.5
    && Math.abs(value * 2 - doubled) < 0.0001
    && Math.abs(doubled) % 2 === 1;
}

export function normalizePlotAddress(value) {
  if (!value || typeof value !== "object") return null;
  const x = Number(value.x);
  const z = Number(value.z);
  return isHalfStep(x) && isHalfStep(z) ? { x, z } : null;
}

export function stablePlotAddresses(count) {
  const needed = Math.max(0, Math.floor(Number(count) || 0));
  const addresses = [];
  for (let size = 4; addresses.length < needed && size <= 64; size += 2) {
    const radius = (size - 1) / 2;
    for (let row = 0; row < size; row += 1) {
      for (let column = 0; column < size; column += 1) {
        const x = column - radius;
        const z = row - radius;
        const onNewRing = size === 4 || Math.max(Math.abs(x), Math.abs(z)) === radius;
        const inControlSquare = Math.abs(x) === 0.5 && Math.abs(z) === 0.5;
        if (onNewRing && !inControlSquare) addresses.push({ x, z });
        if (addresses.length >= needed) return addresses;
      }
    }
  }
  return addresses;
}

export function plotGridSize(addresses = []) {
  const maximum = addresses.reduce(
    (value, address) => Math.max(value, Math.abs(address.x), Math.abs(address.z)),
    1.5,
  );
  return Math.max(4, Math.ceil(maximum + 0.5) * 2);
}
