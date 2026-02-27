# AGENTS.md - Refden Extension Developer Guide

## Project Overview

Refden is a browser extension for Chrome & Firefox that helps manage academic references. It extracts DOIs from web pages and allows users to save references to their Refden account.

## Project Structure

```
app/
  background.js        # Background script (runs in extension context)
  popup.js             # Popup UI logic
  app.js               # Main application logic
  libs/
    api/               # API calls (refden.js, referencesFetcher.js)
    listeners/         # Event listeners (findReferences.js, enablePageActionForTab.js)
    messages/          # Message handling
    services/          # Business logic (doiFinder.js, informBackgroundTabShouldHavePageAction.js)
    utils/             # Utilities (lodashfp.js, setupBrowser.js)
    tests/             # Test setup (setup.js)
  views/
    reference-form/    # Reference form components
```

## Build/Lint/Test Commands

| Command | Description |
|---------|-------------|
| `yarn start` | Start webpack in watch mode for development |
| `yarn lint` | Run ESLint on `app/` directory |
| `yarn test` | Run all Jest tests |
| `yarn test:watch` | Run Jest in watch mode |
| `yarn compress` | Build production bundle with webpack and create zip |
| `yarn manifest:to-chrome` | Use Chrome manifest (default) |
| `yarn manifest:to-firefox` | Use Firefox manifest |

### Running a Single Test

To run a single test file:
```bash
yarn test path/to/file.spec.js
```

To run a single test by name:
```bash
yarn test -t "test name"
```

## Code Style Guidelines

### General Rules

- **Language**: ES6+ JavaScript
- **File extension**: `.js` (JSX-like syntax supported via Babel)
- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Always required
- **Line length**: No strict limit, but keep reasonable

### Imports

- Use ES6 module syntax (`import` / `export`)
- Use relative imports for internal modules (e.g., `import { postReference } from '../../libs/api/refden';`)
- Use lodash/fp for functional utilities: `import _ from 'lodash/fp';`
- Order imports: external libraries first, then internal modules

```javascript
import _ from 'lodash/fp';
import toastr from 'toastr';

import { postReference } from '../../libs/api/refden';
import doiFinder from './doiFinder';
```

### Naming Conventions

- **Files**: kebab-case (e.g., `addOnSubmitHandler.js`, `enablePageActionForTab.js`)
- **Functions**: camelCase (e.g., `handleResponse`, `doiFinder`)
- **Constants**: UPPER_SNAKE_CASE for config values (e.g., `BASE_URL`)
- **Test files**: `*.spec.js` suffix

### Functions

- Use arrow functions for callbacks and short functions
- Use async/await for asynchronous operations
- Keep functions small and focused

```javascript
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

export const getReferencePresence = doi =>
  fetch(`${REFERENCES_URL}?doi=${encodeURIComponent(doi)}`)
    .then(handleResponse);
```

### Error Handling

- Always handle fetch errors with `.catch()` or try/catch
- Throw descriptive errors for API failures
- Use toastr for user-facing error messages in UI code

```javascript
const handleError = () => toastr.error('Could not add this reference');

postReference(formData).then(handleSuccess).catch(handleError);
```

### Testing

- Test files use `.spec.js` suffix
- Use Jest's `describe`/`it` blocks
- Use `expect` for assertions
- Mock external dependencies (JSDOM for DOM testing)

```javascript
import doiFinder from './doiFinder';

describe('doiFinder()', () => {
  it('returns DOIs', () => {
    const text = `doi: 10.3904/kjim.2017.034`;
    const document = { body: { innerText: text } };

    const actual = doiFinder(document);
    const expected = ['10.3904/kjim.2017.034'];

    expect(actual).toEqual(expected);
  });
});
```

### Linting

The project uses ESLint with these rules (configured in `.eslintrc.js`):
- `indent`: error with 2 spaces
- `quotes`: error with single quotes
- `semi`: error always

Run `yarn lint` before committing to catch issues.

### Chrome Extension Specifics

- Use `browser` API (Firefox compatible) with `webextension-polyfill` if needed
- Use `chrome.storage.local` for persistent storage
- Manifest files: `manifest.chrome.json` and `manifest.firefox.json`
- Background scripts run in their own context
- Content scripts share the page's DOM

## Common Development Tasks

### Loading the Extension in Chrome

1. Run `yarn start`
2. Run `yarn manifest:to-chrome`
3. Go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked" and select the `app/` directory

### Loading the Extension in Firefox

1. Run `yarn start`
2. Go to `about:debugging`
3. Click "Load Temporary Add-on"
4. Select any file in `app/` directory

### Adding a New API Endpoint

1. Add the endpoint to `app/libs/api/refden.js`
2. Export the function with appropriate error handling
3. Add tests in a corresponding `.spec.js` file
4. Use `handleResponse` helper for consistent error handling

## Dependencies

Key libraries used:
- **lodash/fp**: Functional programming utilities
- **axios**: HTTP client (with custom fetch adapter)
- **jQuery**: DOM manipulation
- **select2**: Dropdown enhancement
- **toastr**: Notification messages
- **@sentry/browser**: Error tracking
