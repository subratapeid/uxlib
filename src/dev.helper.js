// dev.helper.js

// from query param (?debug=true)
const isDebugFromQuery = (() => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('debug');

    return value === '' || value === 'true' || value === null && params.has('debug');
  }
  return false;
})();


// from localStorage
const isDebugFromStorage = (() => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('ULIB_DEBUG') === 'true';
  }
  return false;
})();

// from script attribute
const isDebugFromScriptAttribute = (() => {
  if (typeof document !== 'undefined') {
    const script = document.currentScript;
    const attr = script?.getAttribute('debug');
    return attr === '' || attr === 'true';
  }
  return false;
})();

// ✅ Check env (for Node.js or bundlers)
const isDebugFromEnv = (() => {
  return typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';
})();

const isDebugFromULibEnv = (() => {
  if (typeof process !== 'undefined' && process.env?.ULIB_DEBUG !== undefined) {
    return process.env.ULIB_DEBUG === 'true';
  }
  return false;
})();



export function isDev() {
  return (
    isDebugFromULibEnv ||         // ✅ ULIB_DEBUG in .env (force enable/disable)
    isDebugFromEnv ||             // NODE_ENV === 'development'
    isDebugFromStorage ||         // LocalStorage toggle
    isDebugFromQuery ||           // ?debug=true in Site URL ex index.html?debug=true
    isDebugFromScriptAttribute || // <script debug>
    (typeof window !== 'undefined' && window.ULIB_DEBUG === true) // Manual browser
  );
}



export function devLog(...args) {
  setTimeout(() => {
    if (isDev()) {
      console.log('[ULIB]', ...args);
    }
  }, 0);
}