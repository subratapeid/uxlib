import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/ulib.js',
      format: 'umd',
      name: 'ulib'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/ulib.min.js',
      format: 'umd',
      name: 'ulib'
    },
    plugins: [terser()]
  }
];
