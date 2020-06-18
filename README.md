# refden-extension

[![Build Status](https://travis-ci.org/Refden/refden-extension.svg?branch=master)](https://travis-ci.org/Refden/refden-extension)

Refden browser extension for Chrome & Firefox.

## Development

- You may need to reload the extension when making changes in JS code.

### Firefox

Go to `about:debugging` and load temporary the extension.

## Deploy

### Chrome

- Guide: https://developer.chrome.com/webstore/publish
- Run `yarn:compress` (Webpack in production & compress app folder)
- Submit

### Firefox

- [Package extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Package_your_extension_)
- Rename `manifest.firefox.json` to `manifest.json`: `yarn manifest:to-firefox`
- Compress files with app folder and submit: `yarn web-ext build -s app`
- Provide source code from Github.
