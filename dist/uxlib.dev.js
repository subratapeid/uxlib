/*!
 * Library Name: UXLIB
 * Version: 1.0.1
 * Author: Subrata Porel
 * Github: https://github.com/subratapeid/uxlib
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uxlib = {}));
})(this, (function (exports) { 'use strict';

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
        console.log('[UXLIB]', ...args);
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
      devLog(`✅ uxlib initialized Version: ${"1.0.1"}`);
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

  // 📁 src/utils/resolveInput.helper.js

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
      // 🎯 Case 1: Selector string (id or class)
      if (typeof input === "string") {
        // ID
        if (input.startsWith("#")) {
          const el = document.getElementById(input.slice(1));
          if (el) {
            result.type = "id";
            result.element = el;
            result.value = "value" in el ? el.value : el.innerText || el.textContent || "";
            return result;
          }
        }

        // Class
        if (input.startsWith(".")) {
          const el = document.querySelector(input);
          if (el) {
            result.type = "class";
            result.element = el;
            result.value = "value" in el ? el.value : el.innerText || el.textContent || "";
            return result;
          }
        }

        // Plain string
        result.type = "string";
        result.value = input;
        return result;
      }

      // 🎯 Case 2: HTMLElement
      if (input instanceof HTMLElement) {
        result.type = "element";
        result.element = input;
        result.value = "value" in input ? input.value : input.innerText || input.textContent || "";
        return result;
      }

      // 🎯 Case 3: Object (e.g., JSON)
      if (typeof input === "object" && input !== null) {
        result.type = "object";
        result.value = JSON.stringify(input, null, 2);
        return result;
      }

      // 🎯 Case 4: Unknown (coerced to string)
      result.type = "unknown";
      result.value = String(input);
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

  const PRESET_CLASSES = {
    0: "uxlib-toast-default",
    1: "uxlib-toast-success",
    2: "uxlib-toast-error",
    3: "uxlib-toast-warning",
    4: "uxlib-toast-info",
    5: "uxlib-toast-inverse"
  };

  /**
   * Show a toast notification (UXLib built-in)
   * @param {boolean|string|object} config
   */
  function toaster(config) {
    if (!config) return;

    // Defaults
    let message = "✅ Hey This is a Default Toaster message!";
    let duration = 3000;
    let position = "top-right";
    let preset = 0;

    if (typeof config === "string") {
      message = config;
    } else if (typeof config === "object") {
      message = config.message || message;
      duration = config.duration ?? duration;
      position = config.position || position;
      preset = config.preset ?? preset;
    } else if (config !== true) {
      devLog("❌ Invalid toast config:", config);
      return;
    }

    if (preset < 0 || preset > 5) {
      devLog(`⚠️ Preset "${preset}" is out of range. Using default (0).`);
      preset = 0;
    }

    createContainerIfNeeded(position);

    const toast = document.createElement("div");
    toast.className = `uxlib-toast ${PRESET_CLASSES[preset]}`;
    toast.innerText = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      toast.addEventListener("transitionend", () => toast.remove());
    }, duration);

    devLog("🔔 Toast shown:", { message, duration, position, preset });
  }

  function createContainerIfNeeded(position) {
    if (toastContainer) return;

    toastContainer = document.createElement("div");
    toastContainer.className = `uxlib-toast-container ${position}`;
    document.body.appendChild(toastContainer);

    // Inject CSS if not already
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

  //src/index.js
  init(); // auto-run on initiate

  exports.callApi = callApi;
  exports.copyToClipboard = copyToClipboard;
  exports.devLog = devLog;
  exports.formatDate = formatDate;
  exports.getQueryParams = getQueryParams;
  exports.isArray = isArray;
  exports.isDev = isDev;
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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
