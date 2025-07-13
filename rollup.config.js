import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';

export default [
  // ✅ ESM for modern builds (Vite, React, etc.)
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.es.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    plugins: [json()]
  },

  // ✅ CommonJS for Node.js (require)
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.cjs.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    plugins: [json()]
  },

  // ✅ UMD for browser (unminified)
  {
    input: "src/browser.js",
    output: {
      file: "dist/ulib.js",
      format: "umd",
      name: "ulib",
      sourcemap: true,
      exports: "named",
    },
    plugins: [json()] // no minify
  },


  // ✅ UMD for browser (CDN, global window.ulib)
  {
    input: "src/browser.js",
    output: {
      file: "dist/ulib.min.js",
      format: "umd",
      name: "ulib",
      sourcemap: true,
      exports: "named",
    },
    plugins: [json(), terser()]
  }
];
