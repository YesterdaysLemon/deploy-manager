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

The set is limited to models rendered by the default city, assigned by its
deterministic fleet-expansion pool, or retained as measured transport reference
pieces. Each kit's referenced `Textures/colormap.png` is kept beside its GLBs.
This keeps the visualizer quick to load and makes upgrades auditable.

| Kit | Scene models |
| --- | --- |
| Industrial | `building-c`, `building-e`, `building-m`, `building-p`, `detail-tank-large`, `shipping-container-a`, `shipping-container-b` |
| Commercial | `building-a`, `building-f`, `building-j`, `building-k`, `building-n`, `building-skyscraper-e` |
| Roads | `road-straight`, `road-crossroad`, `road-curve`, `road-bend`, `sign-highway`, `traffic-light-object-vertical` |
| Suburban | `building-type-a`, `building-type-h`, `building-type-n`, `building-type-r`, `tree-large` |
| Cars | `delivery`, `sedan`, `taxi`, `truck` |
| Trains | `railroad-straight`, `railroad-corner-large`, `train-diesel-a`, `train-carriage-container-blue`, `train-carriage-coal` |
| Watercraft | `boat-tug-a`, `ship-cargo-a` |

The approach roads use the authored broad curve and tight bend instead of a generated road surface. The railway uses a continuous raised procedural bed and rails so its long off-map bends cannot open visible seams; its moving consist uses Kenney's engine, container carriage, and coal carriage. The straight and large-corner track models remain as measured reference fixtures. To refresh the set, update both `client/city3d.js` and the explicit static-asset list in `src/server.mjs`.

## Authored transform audit

The transit pieces retain their source proportions instead of being sized by eye. The road straight and bend each occupy a `1 x 1` authored tile, while the broad curve occupies `2 x 2`; all three use one `2.28` world-unit tile scale. Both bends are authored with west and north connectors. The large rail corner connects its south `(0, 0)` port to its west `(-4, 4)` port and uses the same `1.48` scale as the straight track width. These measured ports are asserted against the procedural traffic curves in `tests/city3d.test.mjs` so a future rotation or recentering change cannot silently reopen seams.
