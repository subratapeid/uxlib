// scripts/init-postcss.cjs
const fs = require('fs');
const path = require('path');

// ✅ Always use INIT_CWD for postinstall scripts to access original project root
const configPath = path.resolve(process.env.INIT_CWD || process.cwd(), 'postcss.config.cjs');

if (!fs.existsSync(configPath)) {
  const content = `
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
            defaultExtractor: content => content.match(/[\\w-/:]+(?<!:)/g) || [],
          }),
          cssnano({ preset: 'default' })
        ]
      : [])
  ]
});
  `;
  fs.writeFileSync(configPath, content);
  console.log('[ulib] ✅ postcss.config.cjs created in project root.');
} else {
  console.log('[ulib] ⚠️ postcss.config.cjs already exists. Skipped creation.');
}
