# Architecture

## Runtime

Chrome loads this directory directly as an unpacked Manifest V3 extension. There is no dependency installation, bundling, transpilation, server, storage layer, or background worker.

1. `manifest.json` injects `src/focus-core.js`, then `src/content-script.js`, on Xiaohongshu pages at `document_start`.
2. `focus-core.js` exposes pure URL/profile helpers through `globalThis.XHSFocusCore` and CommonJS exports for tests.
3. `content-script.js` checks the current route, creates a fixed overlay only on `/explore`, and removes it elsewhere.
4. Search submits by navigating to Xiaohongshu's native search-result URL.

## Boundaries

- Pure logic belongs in `focus-core.js`; it must not depend on DOM or Chrome APIs.
- DOM and Chrome integration belongs in `content-script.js`.
- The extension may read limited page DOM to find an avatar and native search input, but must tolerate their absence.
- The extension must not fetch, scrape, persist state, modify account state, or inject remote code.
- Manifest permissions remain empty. Content-script URL matches provide the required access.

## Extension Points

- Add testable URL/profile behavior to `focus-core.js` with unit tests first.
- Add visible overlay behavior to `content-script.js`, then extend static constraints and manually verify Chrome routes.
- Add assets under `assets/` and declare only browser-accessible assets in `manifest.json`.
