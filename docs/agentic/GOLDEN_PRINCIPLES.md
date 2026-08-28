# Golden Principles

- Preserve intentional simplicity: static Manifest V3 files, no build step, no dependencies.
- Make the focused experience additive and reversible: overlay the explore page; do not mutate account or remote state.
- Keep route decisions pure and tested.
- Treat external DOM as unstable and degrade safely.
- Prefer mechanical constraints over repeated review comments.
- Keep visual polish purposeful; protect responsive behavior and avoid distorted artwork.

## Mechanically Enforced

- Exact content-script order and route match.
- Empty permission surface.
- Required local assets.
- No fetch, XHR, storage, eval, or constructed executable code.
- Key visual invariants for the bottom artwork, top bar, and search-group offset.

Add repeated, stable review lessons to `scripts/validate-extension.js` when a clear static assertion is possible.
