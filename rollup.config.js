import { terser } from "rollup-plugin-terser";
import path from "path";

export default [
  // ✅ ESM (for modern tools like Vite, React, etc.)
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.es.js",
      format: "es",
      sourcemap: true,
    },
    plugins: []
  },

  // ✅ CommonJS (for Node.js)
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: []
  },

  // ✅ UMD (for browser global use via <script>) with minification
  {
    input: "src/index.js",
    output: {
      file: "dist/ulib.min.js",
      format: "umd",
      name: "ulib", // 👈 global variable name (window.ulib)
      sourcemap: true,
    },
    plugins: [terser()]
  }
];
