# Quality

## Automated Verification

Run the complete local gate:

```bash
npm run check
```

It runs:

- `npm test`: pure behavior tests using Node's built-in test runner.
- `npm run validate`: manifest, required assets, visual-regression strings, architecture, and security constraints.
- `npm run check:agentic`: required agent docs, documented commands, and local Markdown links.

GitHub Actions runs the same `npm run check` command if this folder is later committed to GitHub.

## Manual Chrome Verification

Required for runtime or visible changes:

1. Reload the unpacked extension in `chrome://extensions/`.
2. Open `https://www.xiaohongshu.com/explore` and confirm the overlay, search, avatar, artwork, and focus behavior.
3. Submit a search and confirm the search-result route is not covered.
4. Open a profile route and confirm it is not covered.
5. Check the browser console for new errors.

## Review Checklist

- Runtime behavior stays inside the documented product boundary.
- Pure logic has tests.
- No permissions, fetches, persistence, remote code, or build step were added unintentionally.
- Visual changes preserve responsive/mobile behavior.
- Documentation changed when a durable constraint or decision changed.
