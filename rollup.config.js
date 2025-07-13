import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const banner = `/*!
 * ulib v${pkg.version}
 * Author: ${pkg.author}
 */
`;

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.es.js",
      format: "es",
      sourcemap: true,
      exports: "named",
      banner
    },
    plugins: [json()]
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.cjs.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      banner
    },
    plugins: [json()]
  },
  {
    input: "src/browser.js",
    output: {
      file: "dist/ulib.js",
      format: "umd",
      name: "ulib",
      sourcemap: true,
      exports: "named",
      banner
    },
    plugins: [json()]
  },
  {
    input: "src/browser.js",
    output: {
      file: "dist/ulib.min.js",
      format: "umd",
      name: "ulib",
      sourcemap: true,
      exports: "named",
      banner
    },
    plugins: [json(), terser()]
  }
];
