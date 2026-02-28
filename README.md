# refden-extension

Refden browser extension for Chrome & Firefox.

## Development

1) Run `yarn start`
2) Run `yarn manifest:to-chrome`
3) In chrome://extensions/ choose "load unpacked" and select app/ directory.

### Firefox

Go to `about:debugging` and load temporary the extension or run `yarn web-ext run --verbose`.

### Notes 

- You may need to reload the extension when making changes in JS code.

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

## Resources

- Alternative api endpoint: https://api.crossref.org/works/10.5555/487hjd 
(From: https://www.crossref.org/education/retrieve-metadata/rest-api/a-non-technical-introduction-to-our-api/)
- https://developer.chrome.com/docs/extensions/reference/api/storage
