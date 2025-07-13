const purgecss = require('@fullhuman/postcss-purgecss').default;
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');

module.exports = (isProduction = false) => ({
  plugins: [
    postcssImport(),
    ...(isProduction
      ? [
          purgecss({
            content: ['./src/**/*.{html,js,jsx,tsx,ts}'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
          cssnano({ preset: 'default' })
        ]
      : [])
  ]
});
