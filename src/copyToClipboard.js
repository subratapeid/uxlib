/**
 * Copies any value or value from an element to clipboard
 * @param {any} input - Text value OR element ID (e.g. 'myId' or '#myId')
 * @param {Object} options - Optional settings
 * @param {Function} options.onSuccess - Callback on success
 * @param {Function} options.onError - Callback on error
 * @param {Boolean} options.showLog - Whether to log success/error messages
 */

import { devLog } from './dev.helper.js';

export function copyToClipboard(input = "Nothing to copy!", options = {}) {
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
