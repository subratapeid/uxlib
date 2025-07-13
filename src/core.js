import { checkForAuthorSignature } from './signature.js';
import { devLog } from './dev.helper.js';
import pkg from '../package.json';


export function init() {
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkForAuthorSignature);
    } else {
      checkForAuthorSignature();
    }
    window.__ulib_signature__ = true;
    // 🔒 Show log only in dev mode or if user enables debug manually
    devLog(`✅ ulib initialized Version: ${pkg.version}`);
  }

}
