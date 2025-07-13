//src/index.js
import { init } from './core.js';
init(); // auto-run on initiate
// import * as utils from './utils.js';
// import * as clipboard from './copyToClipboard.js';

// const ulib = {
//   ...utils,
//   ...clipboard
// };
// ✅ Export

export * from './utils.js';
export * from './copyToClipboard.js';
