import { init } from './core.js';
init(); // auto-run code like signature page

import * as utils from './utils.js';
import * as clipboard from './copyToClipboard.js';

// Merge all utils under one namespace
const ulib = {
  ...utils,
  ...clipboard
};

// ✅ Browser support (global exposure, under `ulib` only)
if (typeof window !== 'undefined' && location.hostname.includes('localhost')) {
  window.ulib = ulib;
}


// ✅ Export everything cleanly for Node & bundlers
export default ulib;
export * from './utils.js';
export * from './copyToClipboard.js';
