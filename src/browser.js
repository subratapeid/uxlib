import * as utils from './js_modules/utils.js';
import * as clipboard from './js_modules/copyToClipboard.js';
import { init } from './js_modules/core.js';

init();

const ulib = {
  ...utils,
  ...clipboard
};

if (typeof window !== 'undefined') {
  window.ulib = ulib;
}
export default ulib;