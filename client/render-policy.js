// Touch tablets (including iPad desktop mode) need the same GPU budget as phones.
export function cityRenderPolicy({ width, coarsePointer = false }) {
  const compact = width < 700 || coarsePointer;
  return {
    compact,
    maxPixelRatio: compact ? 1 : 1.5,
    frameMs: compact ? 1000 / 30 : 0,
    shadows: !compact,
    surfaceResolution: compact ? 8 : 24,
    treeCount: compact ? 6 : 45,
    waterDetail: compact ? 4 : 14,
  };
}

export function renderPixelRatio(policy, width, height, deviceRatio) {
  // Also bound large tablet/backing buffers, not only CSS viewport width.
  const pixelBudget = policy.compact ? 650_000 : 3_000_000;
  return Math.min(deviceRatio, policy.maxPixelRatio, Math.sqrt(pixelBudget / Math.max(1, width * height)));
}
