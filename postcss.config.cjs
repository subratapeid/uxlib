const postcssImport = require('postcss-import');
const cssnano = require('cssnano');

const isMinify = process.env.MINIFY === 'true';

module.exports = {
  plugins: [
    postcssImport(),
    ...(isMinify ? [cssnano({ preset: 'default' })] : [])
  ]
};
