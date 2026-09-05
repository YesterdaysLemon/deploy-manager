# Scene refinement and rendering check — 2026-09-04

## iPhone feedback follow-up — preview v37

The phone profile now gates the entire render/simulation/streaming frame to at
most 30 Hz, uses DPR at most 1 with a 650,000-pixel backing-buffer budget, skips
MSAA and shadow-map passes, samples eight water bands, and builds 12-by-12
surface tiles with 18 rather than 45 distant tree candidates per chunk. Desktop
shadows refresh at 10 Hz. Hidden documents skip scene work. Phones also skip the
full-screen multiply/noise layer and live backdrop blurs. These supersede the
older quality limits documented below; there is no physical-device FPS claim.

In the same headless Edge iPhone 15 emulation (393 CSS pixels wide), normal
motion and default camera, five-second WebGL submission samples counted
239,321 calls in v36 versus 74,968 in the first v37 profile: about 69% fewer
submissions per second. Display callbacks were comparable (418 versus 417).
This primarily measures the frame budget, not a 69% per-frame improvement,
GPU time, or real iPhone performance. A separate final-profile horizon swipe
with 4x CPU throttling streamed 50 surface chunks, drained the queue, and
recorded no main-thread tasks over 50 ms during the sampled gesture plus seven
seconds of settling. It does not emulate a mobile GPU.

Building labels are real buttons with 44px minimum targets and accessible names.
Tapping a label reveals details; tapping the card heading expands/collapses it.
Public-service navigation remains an explicit separate link. A moving touch
target can lose its synthesized click after an orbit: a gesture-validated,
cancelable fallback handles this after compatibility clicks have settled,
without opening setup on drags or clicking through into a setup link.

Verified title taps in local Playwright WebKit as well as Edge. WebKit emitted
a CSP warning when the screenshot tool injected its capture stylesheet; the
city and title interactions rendered successfully without relaxing site CSP.
The user-reported deployed Safari build still requires a real iPhone retest
after separately authorized deployment. Local preview: port 4179, v37.

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

## Mobile interaction refinement

Renderer-positioned labels now have dedicated, transition-free anchors. The
camera's change event requests label projection on the same frame; idle labels
retain the previous throttled cadence. Normal-motion touch tests cover a swipe
starting on the setup invitation, subpixel anchor tracking, pinch-to-zoom without
accidental selection, modal activation without tap-through, and the compact
expandable detail card. These complement, rather than replace, reduced-motion
screenshots. The mobile invitation is clamped inside the viewport; the phone
camera starts with the complete city footprint in view.

## Horizon follow-up

The default-view draw-call reduction did not address synchronous streaming when tilting toward the horizon. Repeating the same 450-pixel upward orbit gesture at 1440 × 1000 loaded 100 surface chunks and recorded main-thread long tasks of 180, 85, and 329 ms before this follow-up. With frustum selection, deferred generation (one chunk per animation frame), spatial woodland batches, and lower ocean detail at grazing angles, the completed gesture loaded 36 chunks with no pending work and no recorded long tasks. This is one local Edge run, not a guarantee for every GPU or viewport.

The camera now retreats along its orthographic viewing direction when necessary to keep foreground terrain in front of its near plane. This fixes the cut-away foreground previously visible at low angles. Terrain and water remain continuous world-coordinate surfaces; visibility culling does not change the world's deterministic layout.

City vehicles now use separate lanes, oriented collision boxes, swept-step checks, whole-junction reservations, a green/amber/all-red signal cycle, and checked reversing/yield recovery for tight depot turns. Route-level tests simulate the actual three courier loops, two boulevard cars, and deliveries at three arrival phases over 250 seconds each, checking every pair for overlap and requiring delivery completion and ongoing movement. Highways retain their existing lane-following simulation. The hovering four-sided signal controls the front crossroads; the station access is now a pedestrian footbridge, and three additional homes fill out the cul-de-sac.
