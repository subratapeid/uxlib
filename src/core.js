import { checkForAuthorSignature } from './signature.js';
import { devLog } from './dev.helper.js';
import pkg from '../package.json';
import { ulibCSS } from './css/index.js';


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

  // Inject CSS once
  if (!document.getElementById("ulib-style")) {
    const style = document.createElement("style");
    style.id = "ulib-style";
    style.textContent = ulibCSS;
    document.head.appendChild(style);
    console.log("%cULib initialized with styles", "color: green;");
  }

}
