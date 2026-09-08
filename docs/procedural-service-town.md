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

`client/town-streets.js` builds streets around occupied blocks, three future
plots and at most two pocket parks. Unused corners stay rolling landscape;
there is no filled square grid or rectangular perimeter patrol road. Logical
service addresses map to staggered two-row terraces for a stepped rhomboid
outline. This fixed mapping preserves positions across reorders and expansion. A north/south main street joins the highway
and harbor, with connected cross streets reaching every occupied district.
Road routing uses this same graph, and original Kenney bends and T junctions
have their connector rotations checked against actual GLB geometry.

Every four-way crossing has a hovering four-sided signal. All signal bodies,
rings and lamps are instanced in eight draws total; the visible lamps and cars
share the same green, amber and all-red cycle. Junction reservations cover the
expanded graph, including newly added outer plots. Couriers retain collision
checks, and slow frames use bounded substeps instead of dropping travel time.
The highway, railway and harbor continue to carry ambient traffic. This remains
an illustration of activity, not measured network traffic.

Touch rendering keeps the 30 Hz / DPR 1 / 650k pixel budget and skips shadows
and MSAA. It uses four fragment wave bands, eight-by-eight terrain tiles, six
distant tree candidates per chunk, original palette textures with diffuse
lighting and shared materials, and no per-mesh ink outlines. Coarse terrain
reserves a wider transport shoulder so triangles cannot bury the railway.
Labels project only on camera, resize or selection changes. Desktop keeps
its richer lighting, outlines, waves and terrain detail.

## Assets

The twelve additional CC0 GLBs (697,776 bytes) come from the already-downloaded
City Kit Suburban 2.0 and Commercial 2.1 packs. Existing kit licenses and adjacent
palette textures apply. Six house variants form the procedural housing pool.
The detached awning is retained in the curated asset list but is not attached
arbitrarily to buildings. Every model has an explicit server asset route. Two original road tiles
(`road-intersection` and `road-end`) were added from the existing Roads kit.

## Validation

59 Node tests and seven browser checks pass. Placement tests parse actual GLB
geometry with textures omitted only in the Node test loader; production uses
the original textures. The tests check campus bounds in all four orientations,
pairwise prop/building clearance, a bounded infill budget, and reorder stability.
Desktop and mobile visual inspection uses a captured sanitized public fleet.
Local probes are disabled; production topology polling is unchanged.

The same captured 15-entity fleet at 390 x 844 CSS pixels measured roughly
713 -> 380 draws per rendered frame (about 47% fewer), with the final staggered layout. Local WebKit with the iPhone 11 Pro viewport measured
about 372 draws. These are render-work counts on the Windows host, not phone
FPS or measured GPU time. Actual iPhone smoothness needs a device retest after
an explicitly requested deployment. This branch is local and unpublished.
