import { checkForAuthorSignature } from './signature.js';
import { devLog } from './helper/dev.helper.js';

export function init() {
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkForAuthorSignature);
    } else {
      checkForAuthorSignature();
    }

    window.__ulib_signature__ = true;

    // ✅ Version will be replaced at build time using Rollup plugin
    devLog(`✅ ulib initialized Version: __ULIB_VERSION__`);
  }
}
