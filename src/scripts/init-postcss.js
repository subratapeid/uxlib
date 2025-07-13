import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'postcss.config.js');

// Only create if doesn't exist
if (!fs.existsSync(configPath)) {
  const content = `module.exports = require('ulib/postcss-preset')(process.env.NODE_ENV === 'production');\n`;
  fs.writeFileSync(configPath, content);
  console.log('[ulib] ✅ postcss.config.js created in project root.');
} else {
  console.log('[ulib] ⚠️ postcss.config.js already exists. Skipped creation.');
}
