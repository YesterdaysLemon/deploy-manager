# Kenney-first service town

The town uses original Kenney buildings, trees, fences, planters, parasols and
stone paths. Procedural generation chooses and places those assets; it does
not replace them with handmade buildings, change their textures, or add
intersecting roof ornaments. The authored palettes and proportions remain intact.

`client/service-town.js` maps public service identity to the existing industrial,
commercial and suburban asset pools. The manager keeps its Kenney tower, storage
keeps the authored tank, and smaller services use varied pitched-roof houses.
Identity seeds survive health changes and topology reorder. The public topology
continues to own the fleet inventory, explicit plots, statuses and release events.

Every campus loads its primary building first and measures its actual Three.js
bounds. It reserves that footprint and a clear street-facing access corridor.
Each prop is then measured, checked against the lot boundary, and accepted only
if it clears all existing footprints by at least 0.12 world units. Full roof
eaves and tree canopies count. Optional props that do not fit are omitted.
Docker cargo uses the same allocator instead of being overlaid afterward.
Closure barriers rotate with the frontage. The former circular pedestal and
procedural architectural primitives are removed.

Vacant land uses at most 64 seeded Kenney gardens or paired-house plots. Trees,
planters, café parasols, paths and houses share the same clearance allocator.
These are ambient neighborhoods, not extra running services. Original terrain,
roads, railway, shipping, release animations and service controls are preserved.
The existing phone pixel/frame budget and static scenery batching remain active.

## Assets

The twelve additional CC0 GLBs (697,776 bytes) come from the already-downloaded
City Kit Suburban 2.0 and Commercial 2.1 packs. Existing kit licenses and adjacent
palette textures apply. Six house variants form the procedural housing pool.
The detached awning is retained in the curated asset list but is not attached
arbitrarily to buildings. Every model has an explicit server asset route.

## Validation

55 Node tests and seven browser checks pass. Placement tests parse actual GLB
geometry with textures omitted only in the Node test loader; production uses
the original textures. The tests check campus bounds in all four orientations,
pairwise prop/building clearance, a bounded infill budget, and reorder stability.
Desktop and mobile visual inspection uses a captured sanitized public fleet.
Local probes are disabled; production topology polling is unchanged.
