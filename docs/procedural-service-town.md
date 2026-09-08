# Procedural service town

`client/service-town.js` composes the public fleet into a small coastal town.
The existing `/api/topology` subscription still owns the service inventory,
health, selection, and release receipts. Public route identity and kind choose
eleven architecture families: town hall, gatehouse, workshop, observatory,
aquarium, conservatory, castle, laboratory, studio, village, and reservoir.
Datastores use the reservoir family; control services keep their fixed civic plots.

The identity seed determines roof color, height, house variant, planting, and
props. Buildings face the existing street toward the center. Explicit topology
plot addresses are preserved; the existing deterministic allocator places
unassigned services. Health changes do not reroll architecture. Existing status
beacons, closure barriers, selection, and release animations remain attached to
the same service entity. Architecture is illustrative, not measured CPU, RAM,
traffic, or deployment activity.

Vacant plots beyond the three setup invitation plots become pocket parks,
gardens, orchards, pavilions, or playgrounds. Their coordinate seeds survive
topology reordering; the nearest service influences the landscape (for example,
water features near the aquarium). At most 64 such plots are populated. Campus
geometry stays inside a 4.96-unit square, clear of the existing 5.25-unit lot's
kerb. Animated traffic, the coastline, regional terrain, and loaded road/rail
geometry continue using their existing reservations and movement systems.

The procedural palette is baked into vertex colors, giving the authored shapes
one matte draw plus one glass draw per campus. Original Kenney GLBs keep their
textures. Scenery batching, per-service picking, and release animation ownership
remain separate. The mobile 30 Hz / 650,000-pixel policy is retained. One current
15-entity fleet sample at 390×844 reported 704 draws and 212,185 triangles,
compared with 585 draws and 174,773 triangles for the prior public scene at the
same viewport. The additional scenery has a cost; these are browser samples,
not physical-phone FPS or thermal measurements.

## Additional pack assets

Twelve original CC0 GLBs were recovered from the already-downloaded Kenney City
Kit Suburban 2.0 and Commercial 2.1 packs. The added files total 697,776 bytes.
Existing kit licenses and adjacent palette textures apply. The public server
explicitly serves every added file; no directory browsing was introduced.

- Suburban: `building-type-c/f/i/k/p/u`, `planter`, `path-stones-long`, `fence-low`.
- Commercial: `detail-parasol-a/b`, `detail-awning`.

The six houses form the deterministic village pool; only the variants needed by
the current fleet are loaded. Current-fleet inspection confirmed house k/p/u,
both parasols, planter, stone path, fence, and the animator's awning loaded with
no asset warnings. Other house variants are available for future service seeds.

## Validation

55 Node tests cover existing deployment safeguards and city behavior, plus
identity stability, architecture selection, all four frontages, campus bounds,
batch count, and bounded vacant-land placement. Seven browser checks cover
desktop/mobile visual snapshots, keyboard selection, factual release receipts,
tap details, drag rejection, pinch zoom, and the phone rendering policy.
The local current-fleet preview uses a captured sanitized public topology;
local probes are disabled so unrelated local ports are not presented as live
production service checks. Production polling behavior is unchanged.
