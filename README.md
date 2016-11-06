# Note.js
Elegant, lightweight & simple notification library.

![Note.js - lightweight javascript notifications](https://cloud.githubusercontent.com/assets/11352152/20041472/8e647b32-a437-11e6-9dfe-05f1c3b60b7f.png)
![Note.js - vanilla js notification library](https://cloud.githubusercontent.com/assets/11352152/20041473/8e6ef3be-a437-11e6-9e6b-c64d6564f205.png)


**Why another notification library?**

Existing js notification libraries are either:
* Forcing you to load jQuery, Bootstrap, or something else totally unnecessary
* ~~Ugly~~
* Specific to a certain framework
* Painful to use with bundlers, such as Webpack

Note.js is:
* **Lightweight** - `< 2kb` js+css
* **Framework-agnostic** (use it in React, Angular, Vue, or in plain HTML/JS environment)
* Compatible with **IE10+** and all major browsers

### Getting Started

`npm install Note.js --save` or [download](https://github.com/chmln/Note.js/releases) a release

```js
// Start by creating an instance. Overriding default config is optional
const note = new Note({}); // Note
```

Then,
```js
note.success(title, text, config);
note.info(title, text, config);
note.error(title, text, config);
note.warn(title, text, config);
note.notify(title, text, config); // colorless
```

You can customize the duration, and make the notification sticky.
```js
note.success("Success!", "But I'm not going anywhere..yet", { sticky: true });
note.info("Hey!", "I'm leaving in 5 seconds", { duration: 5 });
```
