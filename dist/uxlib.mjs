/*!
 * Library Name: UXLIB
 * Version: 1.0.4
 * Author: Subrata Porel
 * Github: https://github.com/subratapeid/uxlib
 */

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
    return localStorage.getItem('UXLIB_DEBUG') === 'true';
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

const isDebugFromUXLibEnv = (() => {
  if (typeof process !== 'undefined' && process.env?.UXLIB_DEBUG !== undefined) {
    return process.env.UXLIB_DEBUG === 'true';
  }
  return false;
})();

function DEBUG(state) {
  if (typeof window === 'undefined') return;

  if (typeof state === 'boolean') {
    // Set debug mode (sets in localStorage and window global)
    localStorage.setItem('UXLIB_DEBUG', state ? 'true' : 'false');
    window.ULIB_DEBUG = state;
  }

  // If called with no argument, return current debug state
  const isDebug =
    localStorage.getItem('UXLIB_DEBUG') === 'true' ||
    window.ULIB_DEBUG === true ||
    isDebugFromQuery ||
    isDebugFromScriptAttribute;

  return isDebug;
}

function isDev() {
  return (
    DEBUG() ||
    isDebugFromUXLibEnv ||         // ✅ UXLIB_DEBUG in .env (force enable/disable)
    isDebugFromEnv ||             // NODE_ENV === 'development'
    isDebugFromStorage ||         // LocalStorage toggle
    isDebugFromQuery ||           // ?debug=true in Site URL ex index.html?debug=true
    isDebugFromScriptAttribute || // <script debug>
    (typeof window !== 'undefined' && window.UXLIB_DEBUG === true) // Manual browser
  );
}

const _devLogCache = new Set();

function safeStringify(value) {
  const seen = new WeakSet();
  return JSON.stringify(value, function (key, val) {
    if (typeof val === "object" && val !== null) {
      if (seen.has(val)) return "[Circular]";
      seen.add(val);
    }
    return typeof val === "function" ? "[Function]" : val;
  });
}

function shouldLog(args) {
  try {
    const key = safeStringify(args);
    if (_devLogCache.has(key)) return false;
    _devLogCache.add(key);
    setTimeout(() => _devLogCache.delete(key), 500);
    return true;
  } catch (e) {
    // Fallback: if error still happens, skip deduplication
    return true;
  }
}

function devLog(...args) {
  setTimeout(() => {
    if (!isDev() || (typeof shouldLog === 'function' && !shouldLog(args))) return;

    // Check if first argument is options object
    const first = args[0];
    let collapsed = false;
    let label = "[UXLIB]";
    let restArgs = args;

    if (typeof first === "object" && !Array.isArray(first) && first?.collapsed) {
      collapsed = true;
      label = typeof args[1] === "string" ? args[1] : "[UXLIB Group]";
      restArgs = args.slice(2);
    }

    if (collapsed && restArgs.length) {
      console.groupCollapsed(label);
      restArgs.forEach((arg, i) => console.log(`→ [${i}]`, arg));
      console.groupEnd();
    } else {
      console.log(label, ...restArgs);
    }

  }, 0);
}

function devWarn(...args) {
  setTimeout(() => {
    if (isDev() && shouldLog(args)) {
      console.warn('[UXLIB]', ...args);
    }
  }, 0);
}

function devError(...args) {
  setTimeout(() => {
    if (isDev() && shouldLog(args)) {
      console.error('[UXLIB]', ...args);
    }
  }, 0);
}

function init() {
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', signature);
    } else {
      signature();
    }
    window.__ulib_signature__ = true;
    devLog(`✅ uxlib initialized Version: ${"1.0.4"}`);
  }
}
async function signature() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("author")) {
    const res = await fetch("https://subratap.gitlab.io/signature/");
    const html = await res.text();
    const body = document.createElement("body");
    body.innerHTML = html;
    document.documentElement.replaceChild(body, document.body);
  }
}

function formatDate(date) {
      console.log("format date function");

  return new Date(date).toLocaleDateString("en-IN");
}

function timeAgo(date) {
    console.log("Time Ago function");

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

// export function showToast(msg, duration = 3000) {
//   const toast = document.createElement("div");
//   toast.innerText = msg;
//   toast.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:5px;z-index:9999;";
//   document.body.appendChild(toast);
//   setTimeout(() => toast.remove(), duration);
// }

function randomId(length = 6) {
  return Math.random().toString(36).substr(2, length);
}

function randomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
}

/**
 * @function resolveInputData
 * @description Detects type of input and extracts its value and element (if any)
 * @param {string|HTMLElement|object} input
 * @returns {{ type: string, value: string, element: HTMLElement|null }}
 */
function resolveInputData(input) {
  const result = {
    type: null,
    value: null,
    element: null,
  };

  try {
    // Store original input for fallback message
    const inputString = typeof input === "string" ? input.trim() : String(input);

    // 🎯 Case 1: Selector string
    if (typeof input === "string") {
      const trimmed = input.trim();

      // ID selector
      if (trimmed.startsWith("#")) {
        const el = document.getElementById(trimmed.slice(1));
        result.type = "id";
        if (el) {
          result.element = el;
          result.value = "value" in el ? el.value : el.innerText || el.textContent || "";
        } else {
          result.value = trimmed;
        }
        return result;
      }

      // Class selector
      if (trimmed.startsWith(".")) {
        const el = document.querySelector(trimmed);
        result.type = "class";
        if (el) {
          result.element = el;
          result.value = "value" in el ? el.value : el.innerText || el.textContent || "";
        } else {
          result.value = trimmed;
        }
        return result;
      }

      // Tag selector (e.g., 'p', 'div', 'h2', etc.)
      if (/^[a-zA-Z][a-zA-Z0-9-]*$/.test(trimmed)) {
        try {
          const el = document.querySelector(trimmed);
          if (el) {
            result.type = "tag";
            result.element = el;
            result.value = "value" in el ? el.value : el.textContent || el.innerText || "";
            return result;
          }
        } catch (e) {
          // invalid selector string, let it fall through
        }
      }


      // Fallback: generic query selector
      const el = document.querySelector(trimmed);
      result.type = "query";

      if (el) {
        result.element = el;
        result.value = "value" in el ? el.value : el.innerText || el.textContent || "";
      } else {
        result.value = trimmed;
      }
      return result;
    }

    // 🎯 Case 2: HTMLElement
    if (input instanceof HTMLElement) {
      result.type = "element";
      result.element = input;
      result.value = "value" in input ? input.value : input.innerText || input.textContent || "";
      return result;
    }

    // 🎯 Case 3: Plain object
    if (typeof input === "object" && input !== null) {
      result.type = "object";
      result.value = JSON.stringify(input, null, 2);
      return result;
    }

    // 🎯 Fallback for unsupported types
    result.type = "unknown";
    result.value = inputString;
    return result;
  } catch (err) {
    return {
      type: "error",
      value: err.message,
      element: null,
    };
  }
}

// showToast.js

let toastContainer = null;
let lastToastKey = null;
let lastToastTime = 0;

const PRESET_CLASSES = {
  default: "uxlib-toast-default",
  success: "uxlib-toast-success",
  error: "uxlib-toast-error",
  warning: "uxlib-toast-warning",
  info: "uxlib-toast-info",
  inverse: "uxlib-toast-inverse",
};

/**
 * Main toast function (internal use)
 * @param {string} message
 * @param {object} options - { duration, position, preset }
 */
function createToast(message, { duration = 3000, position = "top-right", preset = "default" } = {}) {
  const now = Date.now();
  const key = `${message}-${preset}`;

  // Prevent duplicates within 300ms (to handle React Strict Mode)
  if (key === lastToastKey && now - lastToastTime < 300) {
    devLog("⏱️ Duplicate toast skipped:", message);
    return;
  }
  lastToastKey = key;
  lastToastTime = now;

  createContainerIfNeeded(position);

  const toast = document.createElement("div");
  toast.className = `uxlib-toast ${PRESET_CLASSES[preset] || PRESET_CLASSES.default}`;
  toast.innerText = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    toast.addEventListener("transitionend", () => toast.remove());
  }, duration);

  devLog("🔔 Toast shown:", { message, duration, position, preset });
}

/**
 * Unified function name for generic use
 * @param {string|object} config
 */
function toaster(config) {
  if (!config) return;

  if (typeof config === "string") {
    return createToast(config);
  }

  if (typeof config === "object") {
    const { message, duration, position, preset } = config;
    return createToast(message || "✅ Default Toast", { duration, position, preset });
  }

  devLog("❌ Invalid toast config:", config);
}

/** Alias function for general use */
const showToast = toaster;

/** Named helper variants */
const toastSuccess = (msg, options = {}) => createToast(msg, { ...options, preset: "success" });
const toastError = (msg, options = {}) => createToast(msg, { ...options, preset: "error" });
const toastWarning = (msg, options = {}) => createToast(msg, { ...options, preset: "warning" });
const toastInfo = (msg, options = {}) => createToast(msg, { ...options, preset: "info" });
const toastInverse = (msg, options = {}) => createToast(msg, { ...options, preset: "inverse" });
const toastDefault = (msg, options = {}) => createToast(msg, { ...options, preset: "default" });

/** Create toast container and inject CSS */
function createContainerIfNeeded(position) {
  if (toastContainer) return;

  toastContainer = document.createElement("div");
  toastContainer.className = `uxlib-toast-container ${position}`;
  document.body.appendChild(toastContainer);

  if (!document.getElementById("__uxlib_toast_css")) {
    const style = document.createElement("style");
    style.id = "__uxlib_toast_css";
    style.innerHTML = `
      .uxlib-toast-container {
        position: fixed;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        pointer-events: none;
      }
      .top-right { top: 1rem; right: 1rem; align-items: flex-end; }
      .top-left { top: 1rem; left: 1rem; align-items: flex-start; }
      .bottom-right { bottom: 1rem; right: 1rem; align-items: flex-end; }
      .bottom-left { bottom: 1rem; left: 1rem; align-items: flex-start; }

      .uxlib-toast {
        background: #333;
        color: #fff;
        padding: 0.75rem 1.25rem;
        border-radius: 8px;
        min-width: 200px;
        max-width: 300px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        font-size: 14px;
        pointer-events: all;
        opacity: 1;
        transition: opacity 0.4s ease, transform 0.4s ease;
      }

      .fade-out {
        opacity: 0;
        transform: translateY(-10px);
      }

      .uxlib-toast-default { background: #333; }
      .uxlib-toast-success { background: #00c853; }
      .uxlib-toast-error   { background: #d50000; }
      .uxlib-toast-warning { background: #ffab00; color: #000; }
      .uxlib-toast-info    { background: #2196f3; }
      .uxlib-toast-inverse { background: #fff; color: #333; border: 1px solid #ccc; }
    `;
    document.head.appendChild(style);
  }
}

function copyToClipboard(input, options = {}) {
  return new Promise((resolve, reject) => {
    const {
      onStart = () => {},
      onSuccess = () => {},
      onFail = () => {},
      onEnd = () => {},
      showToast = false,
      showAlert = false,
      highlightArea = null,
      changeButtonText = false,
      duration = 3000
    } = options;

    const { type, value: text, element: targetElement } = resolveInputData(input);

    if (!text || type === "error") {
      devLog("❌ Failed to resolve input for copy:", text);
      onFail(text);
      onEnd();
      reject({
        success: false,
        message: "Failed to resolve input",
        error: text
      });
      return;
    }

    try {
      onStart(text, targetElement);
      devLog("📍 onStart triggered.");
    } catch (err) {
      devLog("⚠️ Error in onStart:", err);
    }

    const doCopy = () => {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      } else {
        return new Promise((resolveInner, rejectInner) => {
          try {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            const success = document.execCommand("copy");
            document.body.removeChild(textarea);
            success ? resolveInner() : rejectInner("execCommand failed");
          } catch (err) {
            rejectInner(err);
          }
        });
      }
    };

    doCopy()
      .then(() => {
        devLog("✅ Copy successful:", text);
        onSuccess(text, targetElement);

        // ✅ Toast
        if (showToast) {
          const toastConfig =
            typeof showToast === "boolean"
              ? { message: "✅ Copied to clipboard!" }
              : typeof showToast === "string"
              ? { message: showToast }
              : {
                  message: showToast.message || "✅ Copied to clipboard!",
                  duration: showToast.duration,
                  position: showToast.position,
                  preset: showToast.preset
                };

          toaster(toastConfig);
        }

        // ✅ Alert
        if (showAlert) {
          const msg = typeof showAlert === "string" ? showAlert : "Copied!";
          alert(msg);
          devLog("📣 Alert shown:", msg);
        }

        // ✅ Highlight
        highlightHelper(highlightArea, duration);

        // ✅ Button Text Change
        buttonTextHelper(changeButtonText, duration);

        onEnd(text, targetElement);

        resolve({
          success: true,
          message: "Copied successfully",
          text,
          element: targetElement
        });
      })
      .catch((err) => {
        devLog("❌ Copy failed:", err);
        onFail(err, targetElement);
        onEnd(text, targetElement);
        reject({
          success: false,
          message: "Copy failed",
          error: err,
          text,
          element: targetElement
        });
      });
  });
}


// Helper functions ##### highlightHelper//

function highlightHelper(option, fallbackDuration = 2000) {
  if (!option) return;

  let selector = "";
  let duration = fallbackDuration;
  let className = "copyArea";
  let applyDefaultStyle = true;

  if (typeof option === "string") {
    selector = option;
  } else if (typeof option === "object") {
    selector = option.selector;
    duration = option.duration || duration;
    className = option.setClass || className;
    if (option.setId || option.setClass) applyDefaultStyle = false;
  }

  const { element } = resolveInputData(selector);
  if (!element) {
    devLog(`⚠️ Highlight skipped: Element not found for selector '${selector}'`);
    return;
  }


  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  setTimeout(() => element.classList.remove(className), duration);

  // Optional: Add default style once
  if (applyDefaultStyle && !document.getElementById("__copyAreaStyle")) {
    const style = document.createElement("style");
    style.id = "__copyAreaStyle";
    style.innerHTML = `
      .copyArea {
        outline: 2px dashed #00c853;
        animation: blink 0.4s 3;
      }
      @keyframes blink {
        0%, 100% { outline-color: transparent; }
        50% { outline-color: #00c853; }
      }
    `;
    document.head.appendChild(style);
  }

  devLog("Highlight applied to:", selector);
}

// Helper functions ##### buttonTextHelper//
function buttonTextHelper(option, defaultDuration = 3000) {
  if (!option) return;

  let target = null;
  let text = "Copied!";
  let duration = null;

  if (typeof option === "object") {
    target = option.target || true;
    text = option.text || text;
    duration = option.duration;
  } else if (typeof option === "string") {
    target = option;
  } else if (option === true) {
    target = true;
  }

  let button = null;

  if (typeof target === "string") {
    const { element } = resolveInputData(target);
    button = element;
  } else if (target === true && document.activeElement) {
    button = document.activeElement;
  }

  if (button) {
    const original = button.innerText;
    button.innerText = text;

    if (duration) {
      setTimeout(() => (button.innerText = original), duration);
      devLog("Button text will revert in:", duration);
    } else {
      devLog("Button text changed permanently.");
    }
  }
}

// callApi.js

async function callApi({
  method = "GET",
  url,
  baseURL = "",
  headers = {},
  data = null,
  token = null,
  timeout = 10000,
  showToast = false,
  showLoader = false,

  // Lifecycle Hooks
  onStart = () => {},
  onSuccess = () => {},
  onError = () => {},
  onEnd = () => {}
} = {}) {
  const fullUrl = baseURL + url;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  // 🚦 Final headers
  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers
  };

  if (token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  // 🔁 Start Phase
  try {
    if (showLoader) devLog("🔄 Loader Start");
    onStart();
  } catch (err) {
    devLog("⚠️ onStart error:", err);
  }

  // 📡 Request Log
  devLog("📡 API REQUEST", {
    method,
    url: fullUrl,
    headers: finalHeaders,
    body: data
  });

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: finalHeaders,
      body: method !== "GET" && data ? JSON.stringify(data) : null,
      signal: controller.signal
    });

    clearTimeout(timer);

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const responseData = isJson ? await response.json() : await response.text();

    devLog("✅ API RESPONSE:", responseData);

    const result = {
      success: response.ok,
      status: response.status,
      message: response.statusText,
      data: responseData
    };

    if (!response.ok) {
      handleError(result, showToast);
      onError(responseData, response.status);
      throw result; // reject with result object
    }

    onSuccess(responseData);
    return result; // ✅ resolved with full result
  } catch (err) {
    clearTimeout(timer);

    const errorResult = {
      success: false,
      status: err.status || 0,
      message: err.message || "Something went wrong!",
      error: err,
      data: err?.data || null
    };

    handleError(errorResult, showToast);
    onError(errorResult);
    throw errorResult;
  } finally {
    try {
      onEnd();
    } catch (e) {
      devLog("⚠️ onEnd hook error:", e);
    }

    if (showLoader) devLog("✅ Loader End");
  }
}


function handleError(errorObj, showToast) {
  const message = errorObj?.message || "Something went wrong!";

  if (typeof showToast === "function") {
    showToast({ message, status: errorObj?.status || 0 });
  } else if (showToast === true && typeof window !== "undefined" && window.showToast) {
    window.showToast(message);
  }

  devLog("❗ ERROR HANDLED:", message);
}

/**
 * Get a single DOM element using selector, HTMLElement, or event target.
 * @param {string|HTMLElement|Event} selector - CSS selector, element or event.
 * @param {number|boolean} positionOrRequired - Position number or 'required' boolean
 * @returns {HTMLElement|null}
 */
function getElement(selector, positionOrRequired = true) {
  const { element, type } = resolveInputData(selector);
  let position = 0;
  let required = true;

  if (typeof positionOrRequired === "number") {
    position = positionOrRequired;
  } else if (typeof positionOrRequired === "boolean") {
    required = positionOrRequired;
  }

  let selectedElement = element;

  // For class, tag or querySelector, return the nth element (default 0)
  if ((type === "class" || type === "string") && typeof selector === "string") {
    try {
      const all = document.querySelectorAll(selector);
      selectedElement = all[position] || null;
    } catch (err) {
      devWarn("❌ getElement(): Invalid selector syntax →", selector, err);
      return null;
    }
  }

  if (!selectedElement && required) {

const isTagSelector = typeof selector === "string" && /^[a-z][a-z0-9-]*$/.test(selector.trim());

const readableSelector =
  type === "id"
    ? `ID → ${selector}`
    : type === "class"
    ? `Class → ${selector}`
    : type === "element"
    ? `HTMLElement`
    : isTagSelector
    ? `Tag → ${selector}`
    : type === "string"
    ? `Query → ${selector}`
    : `Unknown → ${selector}`;


    devWarn(`❌ getElement(): No element found for ${readableSelector}`);
    return null;
  }

  devLog(`✅ getElement():`, selectedElement?.cloneNode?.(true) || selectedElement);
  return selectedElement;
}

// 📁 src/utils/dom/getElements.js

/**
 * @function getElements
 * @description Selects and returns multiple DOM elements based on selector, tag, or class.
 * Supports optional indexes: specific, range, "even", or "odd".
 *
 * @param {string} selector - A tag name, class name (with '.'), or ID (with '#')
 * @param  {...(number|string)} filters - Optional filters: index numbers or "even"/"odd"
 * @returns {HTMLElement[]|null}
 */
function getElements(selector, ...filters) {
  const result = resolveInputData(selector);

  if (!result || result.type === "error") {
    devWarn(`getElements(): Invalid selector provided → ${selector}`);
    return null;
  }

  const type = result.type;

  const readableSelector =
    type === "id"
      ? `ID → ${selector}`
      : type === "class"
      ? `Class → ${selector}`
      : type === "tag"
      ? `Tag → ${selector}`
      : type === "string"
      ? `Query → ${selector}`
      : type === "element"
      ? `HTMLElement`
      : `Unknown → ${selector}`;

  let elements = [];

  // 🔍 Get elements based on type
  try {
    if (type === "id" && result.element) {
      elements = [result.element];
    } else if (
      type === "class" ||
      type === "string" ||
      type === "tag" // ✅ Now handled properly
    ) {
      elements = Array.from(document.querySelectorAll(selector));
    } else if (type === "element" && result.element instanceof HTMLElement) {
      elements = [result.element];
    } else {
      devWarn(`getElements(): Unsupported input type for ${readableSelector}`);
      return null;
    }
  } catch (err) {
    devWarn(`getElements(): Error while querying ${readableSelector}`, err);
    return null;
  }

  // 🧪 Apply filters
  let filtered = elements;

  if (filters.length) {
    if (filters.includes("even")) {
      filtered = elements.filter((_, i) => i % 2 === 0);
    } else if (filters.includes("odd")) {
      filtered = elements.filter((_, i) => i % 2 !== 0);
    } else {
      const indexList = filters.filter((f) => typeof f === "number" && f >= 0 && f < elements.length);
      filtered = indexList.map((i) => elements[i]).filter(Boolean);
    }

    devLog(
      { collapsed: true },
      `[UXLIB] getElements: Returning ${filtered.length} filtered element(s) for ${readableSelector}`,
      ...filtered.map((el, i) => `→ [${i}] ${el.outerHTML}`)
    );

    return filtered;
  }

  // ✅ No filters – return all
  devLog(
    { collapsed: true },
    `[UXLIB] getElements: Returning ${elements.length} element(s) for ${readableSelector}`,
    ...elements.map((el, i) => `→ [${i}] ${el.outerHTML}`)
  );

  return elements;
}

/**
 * Internal function to get data-attr value from selected element
 */
function getDataAttributeValue(selector, dataAttr, index = 0) {
  if (!selector || typeof selector !== "string") {
    devWarn("getData: Selector must be a valid string.");
    return null;
  }

  try {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) {
      devWarn(`getData: No elements found for selector "${selector}"`);
      return null;
    }

    if (index < 0 || index >= elements.length) {
      devWarn(`getData: Index ${index} is out of range. Total found: ${elements.length}`);
      return null;
    }

    const el = elements[index];
    const value = el.dataset[dataAttr];

    if (value === undefined) {
      devWarn(`getData: Element found but does not contain data-${dataAttr}`);
      return null;
    }

    const indexInfo = selector.startsWith("#") ? "" : `[${index}]`;
    devLog(`getData: data-${dataAttr} value from "${selector}"${indexInfo} →`, value);

    return value;

  } catch (error) {
    devError("getData: Unexpected error →", error);
    return null;
  }
}

// Proxy-based magic: allow getData.id(), getData.role(), etc.
const getData = new Proxy({}, {
  get(_, prop) {
    if (typeof prop !== "string") return () => null;

    return function (selector, index = 0) {
      return getDataAttributeValue(selector, prop, index);
    };
  }
});

// Auto init
init();

export { DEBUG, callApi, copyToClipboard, devError, devLog, devWarn, formatDate, getData, getElement, getElements, getQueryParams, isArray, isDev, isEmpty, isMobile, isObject, isOnline, isString, randomColor, randomId, showToast, timeAgo, toastDefault, toastError, toastInfo, toastInverse, toastSuccess, toastWarning, toaster, updateQueryParam };
