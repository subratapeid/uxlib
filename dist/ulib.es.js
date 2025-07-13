async function checkForAuthorSignature() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("author")) {
    const res = await fetch("https://subratap.gitlab.io/signature/");
    const html = await res.text();
    const body = document.createElement("body");
    body.innerHTML = html;
    document.documentElement.replaceChild(body, document.body);
  }
}

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



function isDev() {
  return (
    isDebugFromULibEnv ||         // ✅ ULIB_DEBUG in .env (force enable/disable)
    isDebugFromEnv ||             // NODE_ENV === 'development'
    isDebugFromStorage ||         // LocalStorage toggle
    isDebugFromQuery ||           // ?debug=true in Site URL ex index.html?debug=true
    isDebugFromScriptAttribute || // <script debug>
    (typeof window !== 'undefined' && window.ULIB_DEBUG === true) // Manual browser
  );
}



function devLog(...args) {
  setTimeout(() => {
    if (isDev()) {
      console.log('[ULIB]', ...args);
    }
  }, 0);
}

var name = "ulib";
var version = "1.0.0";
var description = "A clean and powerful utility library by Subrata";
var sideEffects = [
	"./dist/ulib.css"
];
var main = "dist/ulib.cjs.js";
var module = "dist/ulib.es.js";
var unpkg = "dist/ulib.min.js";
var browser = "dist/ulib.js";
var type = "module";
var exports = {
	".": {
		"import": "./dist/ulib.es.js",
		require: "./dist/ulib.cjs.js",
		"default": "./dist/ulib.js"
	},
	"./css": "./dist/ulib.css",
	"./postcss-preset": "./postcss-preset/index.cjs"
};
var scripts = {
	"build:js": "rollup -c",
	"build:css": "cross-env MINIFY=false postcss src/css/index.css -o dist/ulib.css && cross-env MINIFY=true postcss src/css/index.css -o dist/ulib.min.css",
	build: "npm run build:js && npm run build:css",
	postinstall: "node scripts/init-postcss.cjs"
};
var files = [
	"dist",
	"scripts"
];
var author = "Subrata Porel";
var license = "MIT";
var keywords = [
	"ulib",
	"utils",
	"js-library",
	"utility-library",
	"subrata",
	"helpers"
];
var devDependencies = {
	"@rollup/plugin-json": "^6.1.0",
	"cross-env": "^7.0.3",
	cssnano: "^7.0.7",
	postcss: "^8.5.6",
	"postcss-cli": "^11.0.1",
	"postcss-import": "^16.1.1",
	rollup: "^2.79.2",
	"rollup-plugin-terser": "^7.0.2"
};
var peerDependencies = {
	"@fullhuman/postcss-purgecss": "^7.0.2",
	postcss: "^8.5.6",
	"postcss-import": "^16.1.1",
	cssnano: "^7.0.7"
};
var optionalDependencies = {
	"@fullhuman/postcss-purgecss": "^7.0.2",
	postcss: "^8.5.6",
	"postcss-import": "^16.1.1",
	cssnano: "^7.0.7"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	sideEffects: sideEffects,
	main: main,
	module: module,
	unpkg: unpkg,
	browser: browser,
	type: type,
	exports: exports,
	scripts: scripts,
	files: files,
	author: author,
	license: license,
	keywords: keywords,
	devDependencies: devDependencies,
	peerDependencies: peerDependencies,
	optionalDependencies: optionalDependencies
};

function init() {
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

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN");
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = {
    year: 31536000, month: 2592000, week: 604800,
    day: 86400, hour: 3600, minute: 60, second: 1
  };
  for (let [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

function isObject(val) {
  return val && typeof val === 'object' && !Array.isArray(val);
}

function isArray(val) {
  return Array.isArray(val);
}

function isString(val) {
  return typeof val === 'string';
}

function isEmpty(val) {
  return val == null || (typeof val === 'string' && val.trim() === '') || (Array.isArray(val) && val.length === 0) || (isObject(val) && Object.keys(val).length === 0);
}

// export function copyToClipboard(text) {
//   navigator.clipboard.writeText(text).then(() => console.log("Copied to clipboard"));
// }

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

function isOnline() {
  return navigator.onLine;
}

function getQueryParams(key) {
  const params = new URLSearchParams(window.location.search);
  return key ? params.get(key) : Object.fromEntries(params.entries());
}

function updateQueryParam(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

function showToast(msg, duration = 3000) {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:5px;z-index:9999;";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

function randomId(length = 6) {
  return Math.random().toString(36).substr(2, length);
}

function randomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
}

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  formatDate: formatDate,
  timeAgo: timeAgo,
  isObject: isObject,
  isArray: isArray,
  isString: isString,
  isEmpty: isEmpty,
  isMobile: isMobile,
  isOnline: isOnline,
  getQueryParams: getQueryParams,
  updateQueryParam: updateQueryParam,
  showToast: showToast,
  randomId: randomId,
  randomColor: randomColor
});

/**
 * Copies any value or value from an element to clipboard
 * @param {any} input - Text value OR element ID (e.g. 'myId' or '#myId')
 * @param {Object} options - Optional settings
 * @param {Function} options.onSuccess - Callback on success
 * @param {Function} options.onError - Callback on error
 * @param {Boolean} options.showLog - Whether to log success/error messages
 */

function copyToClipboard(input = "Nothing to copy!", options = {}) {
  const {
    onSuccess = () => {},
    onError = () => {},
    showLog = false,
  } = options;

  let text = "";

  // If input is an element ID
  if (typeof input === "string" && (input.startsWith("#") || document.getElementById(input))) {
    const id = input.replace(/^#/, ""); // remove # if present
    const el = document.getElementById(id);

    if (el) {
      if ("value" in el) {
        // For input or textarea
        text = el.value;
      } else {
        // For div, span, p, etc.
        text = el.innerText || el.textContent || "";
      }
    } else {
      text = input; // Fallback to plain string if element not found
    }
  } else if (typeof input === "object") {
    text = JSON.stringify(input, null, 2);
  } else {
    text = String(input);
  }

  // Modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      if (showLog) console.log("✅ Copied to clipboard:", text);
      devLog('Copied to clipboard:', text);
      onSuccess(text);
    }).catch((err) => {
      if (showLog) console.error("❌ Copy failed:", err);
      onError(err);
    });
  } else {
    // Fallback for older browsers
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = 0;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      if (showLog) console.log("✅ Copied using fallback:", text);
      onSuccess(text);
    } catch (err) {
      if (showLog) console.error("❌ Fallback copy failed:", err);
      onError(err);
    }
  }
}

var clipboard = /*#__PURE__*/Object.freeze({
  __proto__: null,
  copyToClipboard: copyToClipboard
});

//src/index.js
init(); // auto-run on initiate

const ulib = {
  ...utils,
  ...clipboard
};

export { copyToClipboard, ulib as default, formatDate, getQueryParams, isArray, isEmpty, isMobile, isObject, isOnline, isString, randomColor, randomId, showToast, timeAgo, updateQueryParam };
//# sourceMappingURL=ulib.es.js.map
