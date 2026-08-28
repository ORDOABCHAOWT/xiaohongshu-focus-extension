# Quality Score

| Area | Score (0-5) | Evidence | Next Improvement |
| --- | ---: | --- | --- |
| Agent map | 4 | Project-specific `AGENTS.md` and indexed docs. | Add nested instructions only if the project grows. |
| Architecture clarity | 4 | Small runtime with documented boundaries and static checks. | Add DOM integration tests if runtime complexity grows. |
| Verification | 4 | Unit tests, validator, docs audit, unified check, CI config. | Add automated browser smoke testing when stable and worthwhile. |
| Reliability | 3 | Failure modes and manual Chrome workflow documented. | Capture browser screenshots or smoke-test evidence automatically. |
| Security | 4 | Minimal permission/data policy enforced statically. | Add dependency scanning only if dependencies are introduced. |
| Entropy control | 3 | Golden principles, doc gardening, and audit exist. | Establish recurring cleanup after the project enters Git. |

## Scoring Guide

- 0: absent.
- 1: scaffolded.
- 2: accurate but mostly manual.
- 3: executable checks cover common paths.
- 4: checks are reliable and integrated into review/CI.
- 5: agents can diagnose, fix, verify, and recover with minimal human input.
