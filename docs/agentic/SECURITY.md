# Security

## Permission Policy

- Keep `permissions`, `optional_permissions`, `host_permissions`, `background`, and `action` absent unless the user explicitly approves a specific capability.
- Keep the content-script match limited to `https://www.xiaohongshu.com/*`.
- Do not add remote scripts, `eval`, `new Function`, network requests, or extension storage.

These constraints are enforced by `npm run validate`.

## Data Handling

- Do not persist account identifiers, search queries, cookies, page content, or browsing history.
- Discover the signed-in profile only from the current page DOM; never hard-code or persist an account identifier.
- Do not log sensitive page or account data.

## Supply Chain

The project intentionally has no runtime or development dependencies. Adding dependencies or a build step requires explicit approval and a documented reason.
