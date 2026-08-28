# AGENTS.md

## Repository Map

- `manifest.json`: Chrome Manifest V3 registration. Keep permissions and runtime surface minimal.
- `src/focus-core.js`: pure URL/profile helpers; this is the preferred home for testable logic.
- `src/content-script.js`: DOM overlay and browser integration. It runs on Xiaohongshu pages at `document_start`.
- `tests/focus-core.test.js`: Node built-in unit tests for pure behavior.
- `tests/visual-fixture.html`: manual visual fixture.
- `scripts/validate-extension.js`: manifest, asset, visual-regression, security, and architecture constraints.
- `scripts/check-agentic-docs.js`: validates the repository's agent-facing documentation.
- `docs/agentic/`: current agent-facing architecture, product, quality, reliability, security, and maintenance guidance.

## Commands

- Full verification: `npm run check`
- Unit tests: `npm test`
- Extension/static constraints: `npm run validate`
- Agent documentation audit: `npm run check:agentic`

There is no dependency installation or build step. Chrome loads this directory directly as an unpacked extension.

## Non-Negotiable Behavior

- Activate the focus overlay only on Xiaohongshu `/explore` routes.
- Do not alter search-result or profile pages.
- Do not block requests, scrape content, modify account state, or add remote code.
- Keep `src/focus-core.js` before `src/content-script.js` in the manifest.
- Discover the signed-in profile from the page at runtime; never hard-code or persist an account identifier.
- Keep runtime permissions empty unless the user approves a specific need.
- Keep source and assets directly loadable by Chrome; do not add a build step without explicit approval.

## Working Agreements

- Read `docs/agentic/INDEX.md` before non-trivial changes.
- Put pure behavior in `focus-core.js` and cover it with Node tests.
- Treat Xiaohongshu DOM selectors as unstable; degrade safely when expected elements are absent.
- For visible changes, verify the unpacked extension manually on `/explore`, a search-result route, and a profile route.
- Convert repeated review feedback into tests or `scripts/validate-extension.js`.
- Keep changes scoped; do not refactor the runtime while performing documentation or constraint work.

## Done Criteria

- `npm run check` passes.
- User-visible behavior matches `docs/agentic/PRODUCT.md`.
- Manifest/runtime/security constraints still hold.
- Visible changes have manual Chrome verification notes.
- Durable decisions and repeated lessons are reflected under `docs/agentic/`.
