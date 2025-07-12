import { terser } from "rollup-plugin-terser";

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
    plugins: []
  },

  // ✅ CommonJS for Node.js (require)
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    plugins: []
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
    plugins: [terser()]
  }
];
