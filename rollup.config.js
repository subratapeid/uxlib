import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const banner = `/*!
 * Library Name: UXLIB
 * Version: ${pkg.version}
 * Author: ${pkg.author}
 * Github: ${pkg.github}
 */
`;

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/uxlib.es.js",
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
      file: "dist/uxlib.cjs.js",
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
      file: "dist/uxlib.js",
      format: "umd",
      name: "uxlib",
      sourcemap: true,
      exports: "named",
      banner
    },
    plugins: [json()]
  },
  {
    input: "src/browser.js",
    output: {
      file: "dist/uxlib.min.js",
      format: "umd",
      name: "uxlib",
      sourcemap: true,
      exports: "named",
      banner
    },
    plugins: [json(), terser()]
  }
];
