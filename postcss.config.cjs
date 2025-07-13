const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const banner = require('postcss-banner');

const pkg = require('./package.json'); // Get version & author from package.json
const isMinify = process.env.MINIFY === 'true';

module.exports = {
  plugins: [
    postcssImport(),
    banner({
      banner: `ulib v${pkg.version} | Author: ${pkg.author}`,
      inline: false  // adds as block comment /* ... */
    }),
    ...(isMinify ? [cssnano({ preset: 'default' })] : [])
  ]
};
