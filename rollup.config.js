import { terser } from "rollup-plugin-terser";

export default [
  // ✅ ESM for React/Vite/modern builds
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.es.js",
      format: "es",
      sourcemap: true,
    },
    plugins: []
  },

  // ✅ CommonJS for Node.js
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: []
  },

  // ✅ UMD for browser (with global window.ulib)
  {
    input: "src/browser.js", // 👈 change here
    output: {
      file: "dist/ulib.min.js",
      format: "umd",
      name: "ulib", // 👈 window.ulib
      sourcemap: true,
    },
    plugins: [terser()]
  }
];
