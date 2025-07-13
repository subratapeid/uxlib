// scripts/init-postcss.cjs
const fs = require('fs');
const path = require('path');
// Target project root where npm install was triggered
const userProjectRoot = path.resolve(process.env.INIT_CWD || process.cwd());

// The library folder (where this script is located)
const libraryDir = __dirname;

// 1️⃣ Prevent running in your own dev environment by comparing paths
const isSameFolder = userProjectRoot === libraryDir || userProjectRoot.startsWith(libraryDir);

// 2️⃣ Also read user's package.json and check if the name is 'uxlib'
let isSelfInstall = false;
try {
  const userPkg = require(path.join(userProjectRoot, 'package.json'));
  if (userPkg.name === 'uxlib' || userPkg.name === 'uxlib-x') {
    isSelfInstall = true;
  }
} catch (e) {
  // Ignore if package.json doesn't exist
}

if (isSameFolder || isSelfInstall) {
  console.log('[uxlib] ⚠️ Development environment detected. Skipping postinstall.');
  process.exit(0);
}
const configPath = path.resolve(process.env.INIT_CWD || process.cwd(), 'postcss.config.cjs');

if (!fs.existsSync(configPath)) {
  const content = `const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss').default;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
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
};
`;

  fs.writeFileSync(configPath, content);
  console.log('[uxlib] ✅ postcss.config.cjs created in project root.');
} else {
  console.log('[uxlib] ⚠️ postcss.config.cjs already exists. Skipped creation.');
}
