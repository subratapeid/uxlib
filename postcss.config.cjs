const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const banner = require('postcss-banner');
const pkg = require('./package.json');

const isMinify = process.env.MINIFY === 'true';

const bannerText =
`  Library Name: UXLIB
  Version: ${pkg.version}
  Author: ${pkg.author}
  Github: ${pkg.github}`;

module.exports = {
  plugins: [
    postcssImport(),
    banner({
      banner: bannerText,
      inline: isMinify, // true = single-line (min.css), false = multiline (normal.css)
    }),
    ...(isMinify ? [cssnano({ preset: 'default' })] : [])
  ]
};
