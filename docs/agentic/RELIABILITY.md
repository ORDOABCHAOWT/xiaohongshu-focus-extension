# Reliability

## Running Locally

Chrome loads the project directory directly as an unpacked extension. The stable path is documented in the root README. There is no dev server or build output.

## Failure Modes

- Xiaohongshu changes its route behavior: update route tests before changing activation logic.
- Xiaohongshu changes DOM structure: avatar/profile/native-input discovery may fail, but the overlay and URL-based search must continue to work; the avatar link falls back to Xiaohongshu's generic profile route.
- Chrome loses the unpacked extension: reload this same directory from `chrome://extensions/`.
- Assets move or disappear: `npm run validate` must fail.

## Debugging

- Run `npm run check`.
- Inspect the Xiaohongshu page console for content-script errors.
- Confirm `globalThis.XHSFocusCore` exists.
- Confirm `#xhs-focus-extension-root` exists only on explore routes.
- Use `tests/visual-fixture.html` as a manual visual reference, but treat live Chrome behavior as authoritative.

## Recovery

Because there is no stored state or backend, recovery is limited to reverting source changes, restoring required assets, and reloading the unpacked extension.
