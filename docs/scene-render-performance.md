# Scene refinement and rendering check — 2026-09-04

Local preview only. No production deployment or VPS changes.

## Measurement

Playwright CLI, headless Edge, 1440 × 1000 CSS pixels, device pixel ratio 1, normal motion, default camera, assets fully loaded. Counted WebGL2 `drawElements`, `drawArrays`, `drawElementsInstanced`, and `drawArraysInstanced` calls over three seconds using a page-init wrapper; this includes shadow passes. Sampled `requestAnimationFrame` intervals in the same window.

| Capture | Calls per display frame | Mean interval | p95 interval |
| --- | ---: | ---: | ---: |
| Before this pass | 1300.7 | 9.97 ms | 10.10 ms |
| Initial optimized pass | 437.4 | 9.99 ms | 10.10 ms |
| With two boulevard patrol cars | 468.7 | 9.98 ms | 10.10 ms |

About **64% fewer draw submissions** in the final sampled view. Cadence remained refresh-limited around 100 Hz on this host: this is not a claimed FPS uplift or a GPU-time measurement. Visibility of ambient vehicles and the shadow-refresh phase affect exact counts. The high-DPI caps were not involved in this DPR-1 comparison.

## Changes

- Batch immutable props by compatible material/attributes; instance repeated meshes. Preserve animated objects, selectable buildings, and streamed-chunk ownership.
- One authored-road strip per run, without individual tile outlines or internal end faces.
- One rail profile and sleeper spacing across central and streamed routes.
- Refresh shadows at 20 Hz and label projection around 30 Hz; keep full-rate controls and ambient animation.
- Bound supersampling to DPR 1.5 (desktop) / 1.25 (narrow layouts).
- Reject distant corridor segments with cached bounding boxes before expensive terrain-distance checks.

## Verification scope

Node tests cover closed-loop clearance, matching road/rail cross sections, sleeper phase, batching exclusions, stream disposal, shoreline continuity, and the existing service/deployment behavior. Browser checks cover desktop/mobile composition, keyboard and reduced motion, and factual release receipts. Manual checks additionally exercise the release demonstration and distant streamed railway. Screenshots are in `output/playwright/` and the reviewed visual baselines in `tests/visual/`.

Reference APIs: [Three.js renderer statistics](https://threejs.org/docs/pages/WebGLRenderer.html#info), [InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html).

## Horizon follow-up

The default-view draw-call reduction did not address synchronous streaming when tilting toward the horizon. Repeating the same 450-pixel upward orbit gesture at 1440 × 1000 loaded 100 surface chunks and recorded main-thread long tasks of 180, 85, and 329 ms before this follow-up. With frustum selection, deferred generation (one chunk per animation frame), spatial woodland batches, and lower ocean detail at grazing angles, the completed gesture loaded 36 chunks with no pending work and no recorded long tasks. This is one local Edge run, not a guarantee for every GPU or viewport.

The camera now retreats along its orthographic viewing direction when necessary to keep foreground terrain in front of its near plane. This fixes the cut-away foreground previously visible at low angles. Terrain and water remain continuous world-coordinate surfaces; visibility culling does not change the world's deterministic layout.

City vehicles now use separate lanes, oriented collision boxes, swept-step checks, whole-junction reservations, a green/amber/all-red signal cycle, and checked reversing/yield recovery for tight depot turns. Route-level tests simulate the actual three courier loops, two boulevard cars, and deliveries at three arrival phases over 250 seconds each, checking every pair for overlap and requiring delivery completion and ongoing movement. Highways retain their existing lane-following simulation. The hovering four-sided signal controls the front crossroads; the station access is now a pedestrian footbridge, and three additional homes fill out the cul-de-sac.
