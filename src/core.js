import { checkForAuthorSignature } from './signature.js';

export function init() {
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkForAuthorSignature);
    } else {
      checkForAuthorSignature();
    }
  }
  window.__ulib_signature__ = true;
  console.log("✅ ulib initialized");
}
