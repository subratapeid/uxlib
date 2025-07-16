# 📋 `copyToClipboard()` – Copy Text with UX Features

The `copyToClipboard()` function copies text to the user's clipboard with optional UX enhancements like toast, alert, highlight, and dynamic button text. Fully Promise-based and supports lifecycle hooks.

---

## ✅ Usage

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
copyToClipboard("Hello");
```

### 2. Copy from input field
```js
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

changeButtonText: {
  target: "#copyBtn",
  text: "Copied!",
  duration: 2000
}
```

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
