# Kenney 3D assets used by Deploy Manager

Deploy Manager uses a deliberately small subset of seven Kenney kits. The original GLB geometry is loaded directly by the Three.js city; it is not traced or redrawn. Every kit is released under Creative Commons Zero (CC0 1.0), so attribution is optional, but this project credits Kenney because the work is excellent.

Source: <https://kenney.nl/assets>

| Local directory | Kit and version | Source page | Download SHA-256 |
| --- | --- | --- | --- |
| `industrial/` | City Kit Industrial 2.0 | <https://kenney.nl/assets/city-kit-industrial> | `5B381164E5760F3830A2DBEE43B972DEEE38B2A695D091B56E238AB2910C96D2` |
| `commercial/` | City Kit Commercial 2.1 | <https://kenney.nl/assets/city-kit-commercial> | `F8B09B081C2BB88BCC126E2DEC1CB40FD0DAD7E7E591B6C26AAEFE96FB35276B` |
| `roads/` | City Kit Roads 2.1 | <https://kenney.nl/assets/city-kit-roads> | `22058AF3D68173A7CF9BDA9F0E243A8CEF6BD68168C302EBC76327063849674E` |
| `suburban/` | City Kit Suburban 2.0 | <https://kenney.nl/assets/city-kit-suburban> | `5869C35CF30B1C87BDB2D197B6D325EEBADD2EF08EA27F04797E8E08D77A9A39` |
| `cars/` | Car Kit 3.1 | <https://kenney.nl/assets/car-kit> | `FAC7DACAC5C7874348CF19729AF3EF205F3D366493EDAF0A827D93F4FDF3D0C4` |
| `trains/` | Train Kit 1.1 | <https://kenney.nl/assets/train-kit> | `CF50D77E8CBACBF38DD50826D4BCE5392DB8E4F67373D3C4E583B0ED0E474475` |
| `watercraft/` | Watercraft Kit 2.1 | <https://kenney.nl/assets/watercraft-kit> | `CD1470C1CF441C7F46D0944AE6D0D897242365DC97677C5079B3238965D659F3` |

The exact upstream license text for each downloaded archive is retained as `LICENSE.txt` in its local directory. The Train Kit also names Guus Vermeulen and Tony Schaer as additional contributors.

## Curated scope

The service-town pass adds twelve original GLBs from the same downloaded packs:
Suburban houses c/f/i/k/p/u, planter, stone path, and low fence; Commercial
parasols a/b and awning. These are used by deterministic service campuses, with
house variants loaded on demand. See `docs/procedural-service-town.md` for the
placement, asset-loading evidence, and performance scope.

The set is limited to models rendered by the default city, assigned by its
deterministic fleet-expansion pool, or retained as measured transport reference
pieces. Each kit's referenced `Textures/colormap.png` is kept beside its GLBs.
This keeps the visualizer quick to load and makes upgrades auditable.

| Kit | Scene models |
| --- | --- |
| Industrial | `building-c`, `building-e`, `building-m`, `building-p`, `detail-tank-large`, `shipping-container-a`, `shipping-container-b` |
| Commercial | `building-a`, `building-f`, `building-j`, `building-k`, `building-n`, `building-skyscraper-e` |
| Roads | `road-straight`, `road-crossroad`, `road-curve`, `road-bend`, `sign-highway`, `traffic-light-object-vertical` |
| Suburban | `building-type-a`, `building-type-b`, `building-type-d`, `building-type-e`, `building-type-h`, `building-type-n`, `building-type-r`, `tree-large`, `tree-small` |
| Cars | `delivery`, `sedan`, `taxi`, `truck` |
| Trains | `railroad-straight`, `railroad-corner-large`, `train-diesel-a`, `train-diesel-b`, `train-locomotive-passenger-a`, `train-carriage-container-blue`, `train-carriage-coal`; electric-city variants retained as reference assets |
| Watercraft | `boat-tug-a`, `ship-cargo-a`, `boat-sail-a`, `boat-fishing-small`, `boat-speed-a`, `buoy` |

The coastal region adds a decorative village, single-sided station platform, timber piers, quay, crane, lighthouse, and pedestrians. These are ambient scenery, not additional services or release events. `client/region.js` shares its road and building reservations with the terrain generator so gardens, transport corridors, and port surfaces remain level. Freight and passenger consists share one timetable with separated phases; road vehicles follow their lane's leader rather than passing through slower cars. Working shipping lanes remain seaward of the marina fingers. Rocks and highway posts use instanced geometry.

The approach roads use the authored broad curve and tight bend. `client/transport.js` bends the supplied straight-road triangles into continuous strips, preserving palette UVs while removing end caps and tile outlines. Suburban streets use the same geometry. A rounded outer boulevard joins the city's former dead ends; two ambient cars circulate on it. The suburban lane ends in a cul-de-sac, with short car-width driveways. The station is outside the rail corridor to leave space for the boulevard. Near and distant railways share the same continuous steel/ballast cross section and globally spaced sleepers; the supplied straight and corner rail pieces remain measured reference assets. A bespoke T-junction, stop sign, and urban signal heads connect the highway to town; the gantry sits upstream.

`client/world-stream.js` generates and unloads 32-unit terrain/sea sections around the camera, and extends the four transport ends along deterministic, gently bending corridors. Panning stays on the ground plane. Chunk geometry is owned and disposed separately from shared Kenney geometry and materials. Decorations remain local to the near-city region or deterministic streamed woodland; the traffic simulation is still ambient, not a traffic measurement.

`client/ocean.js` defines one directional wave spectrum for GPU shading/displacement and CPU boat heights. Normals come from wave derivatives, with pixel-footprint filtering, shoreline attenuation, depth absorption, Fresnel reflection, and localized breaking wash. Sparse wind-aligned crest glints replace broad cloudy color patches. This is an analytic approximation, not an FFT or fluid solver. Mathematical reference: [GPU Gems, Effective Water Simulation from Physical Models](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models).

`client/render-batch.js` instances repeated static geometry and merges compatible props by material. Buildings, release effects, traffic, and individually unloaded chunks are excluded. Shadows update at 20 Hz; labels at approximately 30 Hz; animation and controls retain the display frame cadence. Device pixel ratio is capped at 1.5 on desktop and 1.25 on narrow layouts. See `docs/scene-render-performance.md` for the measured scope.

The boulevard's four corners use Kenney's actual `road-bend` pieces, with centerline radius matched to their authored connector ports. The cul-de-sac has seven homes in total. The station has a city-facing platform and pedestrian forecourt. `client/city-traffic.js` coordinates lane-separated vehicles and the four-faced hovering signal; the near and distant scene still represents ambient activity, not measured VPS network traffic.

The station/frontage refinement provides a city-facing halt,
forecourt, short access ramp, and a walking connection to the village. The rail
corridor is moved outward to reserve that space. Passenger service is now a
compact diesel-b engine with two matching locomotive-passenger-a coaches, distinct
from the freight consist. `client/frontage.js` gives each house an entrance anchor
and an exact connection to a straight or circular kerb; non-garage houses receive
footpaths. Private paths never reuse street-segment end caps.

`client/city-life.js` gives Port 443 a deterministic boat/crane/parcel/van shift,
including a doorstep handoff and turning movements. Its working boat stays inshore
of the through-shipping lane. The passenger timetable includes an eight-second
boarding dwell; freight uses the same separated cyclic timetable. Six instanced
gulls and palette-masked warm village windows add atmosphere without extra lights
or shadow passes. All story actors freeze for reduced motion. These are ambient
vignettes, independent of deployment receipts. Closed-service barriers and stopped
factory smoke, unlike the vignettes, follow actual unhealthy probe states.

## Authored transform audit

The transit pieces retain their source proportions instead of being sized by eye. The road straight and bend each occupy a `1 x 1` authored tile, while the broad curve occupies `2 x 2`; all three use one `2.28` world-unit tile scale. Both bends are authored with west and north connectors. The large rail corner connects its south `(0, 0)` port to its west `(-4, 4)` port and uses the same `1.48` scale as the straight track width. These measured ports are asserted against the procedural traffic curves in `tests/city3d.test.mjs` so a future rotation or recentering change cannot silently reopen seams.
