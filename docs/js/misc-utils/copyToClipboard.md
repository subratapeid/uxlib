# 📋 `copyToClipboard()` – Copy Text with UX Features

The `copyToClipboard()` function copies text to the user's clipboard with optional UX enhancements like toast, alert, highlight, and dynamic button text. Fully Promise-based and supports lifecycle hooks.

---
<<<<<<< HEAD
## ✅ Browser CDN Usage

```html
<script src="https://cdn.jsdelivr.net/npm/uxlib/dist/uxlib.js" name="ux"></script>
<!-- instade uxlib you can use your prefered name using a name attribute (eg: <script src="cdnLink" name="ux"></script>) -->
<script>
uxlib.copyToClipboard("Hello World!", {
  showToast: true,
  onSuccess: () => console.log("Copied!"),
});
<script>

```

---

## ✅ Node Module Usage
=======

## ✅ Usage
>>>>>>> 05ea7e70372a0b939cdcfe5c9996bb16b30cf31c

```js
import { copyToClipboard } from "uxlib";

copyToClipboard("Hello World!", {
  showToast: true,
  onSuccess: () => console.log("Copied!"),
});
```

---

## 🧠 Parameters

### 🔹 `input` (string | HTMLElement | selector)
The input text or DOM element from which to copy.

### 🔹 `options` (object)
Optional settings to customize the behavior.

| Option              | Type      | Description |
|---------------------|-----------|-------------|
| `onStart`           | Function  | Called before copy starts |
| `onSuccess`         | Function  | Called after successful copy |
| `onFail`            | Function  | Called if copy fails |
| `onEnd`             | Function  | Called after process ends (success or fail) |
| `showToast`         | Boolean/Object/String | Show a toast message |
| `showAlert`         | Boolean/String | Show alert after copy |
| `highlightArea`     | String/Object | Highlight a DOM element |
| `changeButtonText`  | Boolean/Object/String | Temporarily change button text |
| `duration`          | Number | Duration for effects (ms) |

---

## 🔄 Return

Returns a `Promise` that resolves or rejects with an object:

### ✅ On success
```js
{
  success: true,
  message: "Copied successfully",
  text: "Copied text",
  element: HTMLElement
}
```

### ❌ On failure
```js
{
  success: false,
  message: "Copy failed",
  error: Error | String,
  text,
  element
}
```

---

## 💡 Examples

### 1. Simple copy
```js
<<<<<<< HEAD
// use data directly
=======
>>>>>>> 05ea7e70372a0b939cdcfe5c9996bb16b30cf31c
copyToClipboard("Hello");
```

### 2. Copy from input field
```js
<<<<<<< HEAD

// use element id by # symbol
=======
>>>>>>> 05ea7e70372a0b939cdcfe5c9996bb16b30cf31c
copyToClipboard("#myInput", {
  showToast: "Copied input value!"
});
```

### 3. With lifecycle hooks
```js
copyToClipboard("Copy Me", {
  onStart: () => console.log("Starting..."),
  onSuccess: () => console.log("Success!"),
  onFail: () => console.log("Failed."),
  onEnd: () => console.log("Done."),
});
```
<<<<<<< HEAD
---

## ✨ UX Enhancements

### ✅ Show Toast
```js
showToast: true
showToast: "Copied!"
showToast: {
  message: "Copied successfully!",
  duration: 3000,
  position: "top-right",
  preset: 2
}
```

### ✅ Show Alert
```js
showAlert: true
showAlert: "Copied this item!"
```

### ✅ Highlight a Section
```js
highlightArea: "#targetBox"

highlightArea: {
  selector: "#targetBox",
  duration: 1500,
  setClass: "highlight-outline"
}
```

### ✅ Change Button Text
```js
changeButtonText: true // Auto detect from event target

changeButtonText: "Copied!" // Temporarily show text
=======

---

## ✨ Additional Features

### ✅ Toast Support
```js
showToast: true
showToast: "Copied!" 
showToast: {
  message: "Copied!",
  duration: 3000,
  position: "top-right",
  preset: 1
}
```

### ✅ Highlight a section
```js
highlightArea: "#targetDiv"

highlightArea: {
  selector: "#targetDiv",
  duration: 1500,
  setClass: "yourClassName"
}
```

### ✅ Button Text Feedback
```js
changeButtonText: true
>>>>>>> 05ea7e70372a0b939cdcfe5c9996bb16b30cf31c

changeButtonText: {
  target: "#copyBtn",
  text: "Copied!",
  duration: 2000
}
```
<<<<<<< HEAD
- 📌 [Back to UXLIB-JS Home](../README.md)
- 📌 [Go to UXLIB-CSS Docs](../css/README.md)
---
=======

---

## 📎 Dependencies

- `resolveInputData()` – Resolves value and element
- `toaster()` – Renders toast messages
- `devLog()` – Internal logger

---

## 🛠 Internal Helpers

- `highlightHelper()` – Adds dashed outline animation
- `buttonTextHelper()` – Temporarily changes button text

---

## 🔚 Final Notes

Fully compatible with modern browsers. Fallback supported using `execCommand` if clipboard API is unavailable.
>>>>>>> 05ea7e70372a0b939cdcfe5c9996bb16b30cf31c
