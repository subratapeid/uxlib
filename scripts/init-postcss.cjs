const fs = require('fs');
const path = require('path');

const configPath = path.resolve(process.cwd(), 'postcss.config.cjs');

if (!fs.existsSync(configPath)) {
  const content = `module.exports = require('ulib/postcss-preset')(process.env.NODE_ENV === 'production');\n`;
  fs.writeFileSync(configPath, content);
  console.log('[ulib] ✅ postcss.config.cjs created in project root.');
} else {
  console.log('[ulib] ⚠️ postcss.config.cjs already exists. Skipped creation.');
}
