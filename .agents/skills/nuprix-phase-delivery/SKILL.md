---
name: nuprix-phase-delivery
description: Use when planning, coordinating, implementing, or reviewing an approved Nuprix project phase.
---

# Nuprix phase delivery

1. Read the root `AGENTS.md`, the nearest app-specific `AGENTS.md`, and `docs/implementation-roadmap.md`.
2. Confirm the requested phase is explicitly approved. Only Phase 1 is currently authorized. Stop before Phases 2–8 unless the user separately approves one.
3. Inspect the current Git branch and working tree. Preserve pre-existing changes, especially `nuprix-backend/package.json` and `nuprix-backend/package-lock.json`.
4. Work only inside the Nuprix repository, on the dedicated phase feature branch. Keep changes phase-scoped and never push or merge unless separately authorized.
5. The lead assigns non-overlapping file ownership. Delegate only independent work; describe the file scope, acceptance criteria, and handoff. Do not have concurrent agents edit the same files.
6. Do not install dependencies, expose secrets, purchase services, deploy, or perform destructive database operations. Ask for approval before any action that would do so.
7. Run no checks unless the task authorizes verification. Report exactly what was and was not verified.
8. For storefront work, inspect the route, module, data helper, and shared UI patterns before editing. Prioritize mobile-first navigation, product discovery, accessible interactions, clear loading/empty/error states, and accurate physical-versus-digital expectations. Do not promise unconfigured suppliers, payments, or delivery timelines.
9. Before handoff, review the diff for unrelated changes and report files changed, risks, verification, branch, and PR readiness. The user retains control of pushing, opening/merging PRs, and deployment.
