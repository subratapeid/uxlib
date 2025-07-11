(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ulib = {}));
})(this, (function (exports) { 'use strict';

  function checkForAuthorSignature() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("author")) {
      const body = document.createElement("body");
      body.style.margin = "0";
      body.style.fontFamily = "sans-serif";
      body.innerHTML = `
      <div style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background: #fffbe6; padding: 40px;">
        <div style="max-width: 700px; width: 100%; background: white; border: 2px solid #ffc107; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="margin-top: 0; color: #d35400;">👨‍💻 Developed by Subrata</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            This page or tool has been proudly designed and developed by <strong>Subrata</strong> from India 🇮🇳.<br><br>
            You're seeing this page with <code>?author</code> in the URL — which acts as a digital signature to prove my authorship and originality.
          </p>
          <p style="margin-top: 20px; font-size: 15px;">
            📌 Visit my profile:<br>
            <a href="https://subratap.gitlab.io/profile" target="_blank" style="color: #2980b9; text-decoration: underline;">
              🌐 subratap.gitlab.io/profile
            </a>
          </p>
          <p style="margin-top: 20px; font-size: 14px; color: #777;">
            💡 Tip: Add <code>?author</code> to any project URL to see this signature.
          </p>
          <button onclick="(function(){
            window.location.href = window.location.href.replace(/[?&]author(=[^&]*)?/, '').replace(/([?&])$/, '');
          })()" 
            style="margin-top: 30px; padding: 10px 20px; background-color: #ffc107; color: #333; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
            🔙 View Original Page
          </button>
        </div>
      </div>`;
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
