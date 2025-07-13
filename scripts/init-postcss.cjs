// scripts/init-postcss.cjs
const fs = require('fs');
const path = require('path');

// ✅ Always use INIT_CWD for postinstall scripts to access original project root
const configPath = path.resolve(process.env.INIT_CWD || process.cwd(), 'postcss.config.cjs');

if (!fs.existsSync(configPath)) {
  const content = `module.exports = require('ulib/postcss-preset')(process.env.NODE_ENV === 'production');\n`;
  fs.writeFileSync(configPath, content);
  console.log('[ulib] ✅ postcss.config.cjs created in project root.');
} else {
  console.log('[ulib] ⚠️ postcss.config.cjs already exists. Skipped creation.');
}
