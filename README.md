# 🔧 UXLIB – The Ultimate JavaScript & CSS Utility Toolkit

<p align="center">
    <img src="https://i.postimg.cc/3Nw0TC3Y/uxlib-Logo.png" alt="UXLIB Logo" width="200"/>

</p>

##
**UXLIB** is a flexible, developer-friendly utility library designed to simplify and speed up your web development workflow with prebuilt **JavaScript helpers** and **CSS utility classes** – no config, no fuss, just plug and use.

Made with ❤️ by [Subrata](https://github.com/subratapeid)
---
<!-- ## Watch Video
<p align="left">
  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
    <img src="https://img.youtube.com/vi/ud913ekwAOQ/hqdefault.jpg" alt="ULib Intro Video" width="600"/>
  </a>
</p> -->

## 🚀 Features

- ✅ 50+ powerful JavaScript utility functions
- 🎨 Custom-built CSS utility classes (like Tailwind, but focused)
- 🔁 Simple plug-n-play usage (CDN or NPM)
- ⚙️ ES, CJS, and UMD builds for flexible integration
- 📦 Lightweight, tree-shakable, no external dependencies
- 🔥 Perfect for websites, admin panels, or rapid prototyping

---
## 📚 Important Links

Explore full documentation and usage examples:

- 🟨 [UXLIB JS Documentation](https://github.com/subratapeid/UXLIB/blob/main/docs/js/README.md)

- 🎨 [UXLIB CSS Documentation](https://github.com/subratapeid/UXLIB/blob/main/docs/css/README.md)

---

📄 [**View Release Notes**](https://github.com/subratapeid/UXLIB/blob/main/release-notes.md)


---

## 📦 Installation

### 📦 Option 1: CDN Integration (Browser Usage)

Easily integrate UXLIB into your project using either **npm-based CDN** or **GitHub CDN**.  
You can switch between **debug-friendly** and **minified** versions based on your environment.

---

### 🧪 Development vs Production

| File Type      | File Name            | Use For           | Logs in Console? |
|----------------|----------------------|-------------------|------------------|
| Development    | `ulib.js`        | Debugging         | ✅ Yes *(when debug mode is on)* |
| Production     | `ulib.min.js`    | Live Deployment   | ❌ No *(console disabled)* |

---

### 🔹 Development (with enable/disable logs)

```html
<!-- UXLIB-JavaScript CDN (jsDelivr) -->
<script src="https://cdn.jsdelivr.net/npm/uxlib/dist/uxlib.js"></script>

<!-- UXLIB-CSS CDN (jsDelivr) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uxlib/dist/uxlib.css"></link>

```

### 🔹 How to Enable Debug Mode

✅ **If you add a `debug` attribute to the `<script>` tag,**  
UXLIB will automatically enable console logs for development and debugging.

🧪 **Example:**

- `<script src="..." debug></script>`

```html
<!-- Use Debug attribute in the script tag -->
<script src="https://cdn.jsdelivr.net/npm/uxlib/dist/uxlib.js" debug></script>
```
OR

✅ **In browser just add `?debug` querry parameter after the app/page url** UXLIB will automatically enable console logs for development and debugging.

🧪 **Example:**
- `https://yourapp.com/?debug`
- `https://yourapp.com/login?debug`



### 🔹 Production (no logs)

```html
<!-- UXLIB-JavaScript Minified CDN (jsDelivr) -->
<script src="https://cdn.jsdelivr.net/npm/uxlib/dist/uxlib.min.js"></script>

<!-- UXLIB-CSS Minified CDN (jsDelivr) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uxlib/dist/uxlib.min.css"></link>

```

---
### 🔹 Version Based cdn (Recomended)
⚠️ Always specify the version when importing from CDN in production.
This avoids unexpected issues if the library gets updated later.

```html
<!-- UXLIB-JavaScript v1.1.1 Minified CDN (jsDelivr) -->
<script src="https://cdn.jsdelivr.net/npm/uxlib@1.1.1/dist/uxlib.min.js"></script>

<!-- UXLIB-CSS v1.1.1 Minified CDN (jsDelivr) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uxlib@1.1.1/dist/uxlib.min.css"></link>
```
- Using Of Latest Version
```html
<!-- UXLIB-JavaScript latest Minified CDN (jsDelivr) -->
<script src="https://cdn.jsdelivr.net/npm/uxlib@latest/dist/uxlib.min.js"></script>

<!-- UXLIB-CSS latest Minified CDN (jsDelivr) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uxlib@latest/dist/uxlib.min.css"></link>
```
### 📦 Option 2: NPM (For Node Based Projects)

- For latest version
```bash
npm install uxlib
```

- For any particular version
```bash
npm install uxlib@1.1.1
```
#### Import into project
```js
// Import Full UXLIB-JS in project
import * as uxlib from "uxlib";

// Import Particular Functions in project
import { formatDate, isOnline } from "uxlib";
```
```js
// Import UXLIB-CSS (inside a css File)
@import "uxlib/css"

// Import UXLIB-CSS (inside a js File)
import * as uxlibCss from 'uxlib/css';

```

---

## 🚀 Quick Start

### Utility Example For CDN Based Import:

#### Javascript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>UXLIB v1.1.1 JS Test</title>

  <!-- UXLIB-JavaScript v1.1.1 CDN -->
  <script src="https://cdn.jsdelivr.net/npm/uxlib@1.1.1/dist/uxlib.min.js"></script>
</head>
<body>
  <h2>✅ Check your console for output</h2>

  <script>
    // Check if online
    if (uxlib.isOnline()) {
      console.log("You are online ✅");
    } else {
      console.log("You are offline ❌");
    }

    // Format a date using UXLIB
    const formatted = uxlib.formatDate('2025-07-10');
    console.log("Formatted Date:", formatted);
  </script>
</body>
</html>

```
#### CSS Example
```html
<!DOCTYPE html>
<html lang="en">
  <title>UXLIB v1.1.1 CSS Test</title>
<head>
  <!-- UXLIB-CSS CDN (replace version if needed) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uxlib@1.1.1/dist/uxlib.css" />
</head>
<body>

  <h2 class="ux-heading">🎨 UXLIB CSS Demo</h2>

  <button class="ux-button-primary">Primary Button</button>
  <button class="ux-button-secondary">Secondary Button</button>

  <div class="ux-card" style="margin-top: 20px;">
    <h3 class="ux-card-title">Card Title</h3>
    <p>This is a sample card using UXLIB CSS classes.</p>
  </div>

</body>
</html>
```
### Utility Example For NPM Based Import:

#### Javascript Example

```js
// if importing particular functions
import { isOnline, formatDate } from "uxlib";

if (isOnline()) {
  console.log("You are online ✅");
}

formatDate('2025-07-10')
```
```js
// if importing full library
import * as uxlib from "uxlib";

if (uxlib.isOnline()) {
  console.log("You are online ✅");
}

uxlib.formatDate('2025-07-10')
```
### CSS Utility Example:

```js
// import in any css file (eg: index.css)
@import "uxlib/css"

or

// import in any js file (eg: main.js)
import "uxlib/css"
```
```html
<!DOCTYPE html>
<html lang="en">
  <title>UXLIB v1.1.1 CSS Test</title>
  
  <head>
    <!-- link your stylesheet -->
    <link rel="stylesheet" href="index.css"/>
    or
    <!-- link your script file -->
    <script src="main.js"></script>
  </head>

  <body>
    <h2 class="ux-heading">🎨 UXLIB CSS via NPM</h2>

    <button class="ux-button-primary">Primary Button</button>
    <button class="ux-button-secondary">Secondary Button</button>

    <div class="ux-card" style="margin-top: 20px;">
      <h3 class="ux-card-title">Card Title</h3>
      <p>This is a sample card using UXLIB CSS (imported via npm).</p>
    </div>
  </body>
</html>
```

---

## 📚 Documentation Links

Explore full documentation and usage examples:

- 🟨 [UXLIB JS Documentation](https://github.com/subratapeid/UXLIB/blob/main/docs/js)
- 🎨 [UXLIB CSS Documentation](https://github.com/subratapeid/UXLIB/blob/main/docs/css)

---

📄 [**View Release Notes**](https://github.com/subratapeid/UXLIB/blob/main/release-notes.md)

---

## 🌐 Build Formats

| Format     | File                          | Use Case         |
|------------|-------------------------------|------------------|
| ESM        | `dist/ulib.es.js`             | Vite, Modern JS  |
| CJS        | `dist/ulib.cjs.js`            | Node.js          |
| UMD        | `dist/ulib.js`            | CDN, Global use (With Console log option)|
| Minified   | `dist/ulib.min.js`            | Production CDN  (no console log option)|

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📄 [View Contribution Guide](https://github.com/subratapeid/uxlib/blob/main/CONTRIBUTING.md)

---

## 🧾 License

MIT License © [Subrata Porel](https://github.com/subratapeid)

---

## 💬 Support or Feedback

Found a bug? Have a feature request?  
Open an [issue](https://github.com/subratapeid/uxlib/issues) or contribute via pull request.  
⭐ Star the repo to support this project!⭐