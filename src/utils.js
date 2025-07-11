export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN");
}

export function timeAgo(date) {
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

export function isObject(val) {
  return val && typeof val === 'object' && !Array.isArray(val);
}

export function isArray(val) {
  return Array.isArray(val);
}

export function isString(val) {
  return typeof val === 'string';
}

export function isEmpty(val) {
  return val == null || (typeof val === 'string' && val.trim() === '') || (Array.isArray(val) && val.length === 0) || (isObject(val) && Object.keys(val).length === 0);
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => console.log("Copied to clipboard"));
}

export function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export function isOnline() {
  return navigator.onLine;
}

export function getQueryParams(key) {
  const params = new URLSearchParams(window.location.search);
  return key ? params.get(key) : Object.fromEntries(params.entries());
}

export function updateQueryParam(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

export function showToast(msg, duration = 3000) {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:5px;z-index:9999;";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

export function randomId(length = 6) {
  return Math.random().toString(36).substr(2, length);
}

export function randomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
}
