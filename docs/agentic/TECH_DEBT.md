# Technical Debt

| Area | Issue | Proposed Guardrail | Status |
| --- | --- | --- | --- |
| Browser verification | Runtime and visual behavior still require manual Chrome checks. | Add a small automated browser smoke test only when it can run reliably against the extension. | Open |
| Version control | This folder is not currently a Git repository, so CI and plan history are not active workflows yet. | Initialize Git when the user wants versioned history or GitHub automation. | Open |
| Original plan | The original implementation plan has incomplete checkboxes despite the implementation existing. | Preserve it as historical context; use `docs/agentic/plans/` for future active plans. | Accepted |
