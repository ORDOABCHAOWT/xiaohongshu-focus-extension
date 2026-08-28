# Doc Gardening

## Maintenance Rules

- Keep `AGENTS.md` concise and operational.
- Update `PRODUCT.md` when user-visible behavior changes.
- Update `ARCHITECTURE.md` when boundaries, manifest surface, or runtime components change.
- Update `QUALITY.md` and `SECURITY.md` when checks or permissions change.
- Convert repeated review feedback into tests or validator assertions.
- Move completed multi-step plans from `plans/active/` to `plans/completed/`.

## Audit

Run:

```bash
npm run check:agentic
```

Run the full gate after any documentation or constraint change:

```bash
npm run check
```

Review these docs after meaningful runtime changes or when an agent repeatedly needs missing context.
