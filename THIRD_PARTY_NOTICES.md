# Third-party notices

## Kenney 3D kits

The interactive city includes selected GLB models from Kenney's City Kit Industrial, City Kit Commercial, City Kit Roads, City Kit Suburban, Car Kit, Train Kit, and Watercraft Kit. These assets are available under [Creative Commons Zero 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Exact source versions, archive checksums, links, and license files are recorded in [`public/assets/kenney/README.md`](public/assets/kenney/README.md).

Credit: Kenney, <https://kenney.nl/>. Attribution is not required by CC0, but is gratefully included.

## Three.js

The 3D renderer uses [Three.js](https://threejs.org/), distributed under the MIT License. The installed version and integrity information are pinned by `package-lock.json`; the production browser bundle retains its legal comments.

## Water-rendering reference

The coastline shader is an original Three.js adaptation of the exponential-wave fractional Brownian motion progression explained in Acerola's [How Games Fake Water](https://www.youtube.com/watch?v=PH9q0HNBjT4). Garrett Gunnell's accompanying [Water reference implementation](https://github.com/GarrettGunnell/Water), distributed under the MIT License, was consulted for the analytic-derivative and derivative-domain-warping formulation.
