#!/usr/bin/env node
import { build } from "esbuild";
import { fileURLToPath } from "node:url";

await build({
  entryPoints: [fileURLToPath(new URL("../client/city3d.js", import.meta.url))],
  outfile: fileURLToPath(new URL("../public/city3d.bundle.js", import.meta.url)),
  bundle: true,
  format: "iife",
  globalName: "DeployManager3D",
  legalComments: "eof",
  minify: true,
  sourcemap: false,
  target: ["es2022"],
  banner: {
    js: "/* Deploy Manager 3D city bundle. Source: client/city3d.js. Three.js is MIT licensed. */",
  },
});
