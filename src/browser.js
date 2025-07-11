import * as utils from './utils.js';
import * as clipboard from './copyToClipboard.js';
import { init } from './core.js';

init();

const ulib = {
  ...utils,
  ...clipboard
};

if (typeof window !== 'undefined') {
  window.ulib = ulib;
}
export default ulib;