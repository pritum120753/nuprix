---
name: nuprix-phase-delivery
description: Use when planning, coordinating, implementing, or reviewing an approved Nuprix project phase.
---

# Nuprix phase delivery

1. Read the root `AGENTS.md`, the nearest app-specific `AGENTS.md`, and `docs/implementation-roadmap.md`.
2. Follow the user's current project-wide authorization and the roadmap status. The master continuation authorizes sequential development through all eight phases; do not revive an older Phase 1-only gate. Record unresolved business inputs and continue safe work that does not depend on them.
3. Inspect the current Git branch and working tree. Preserve pre-existing changes, especially `nuprix-backend/package.json` and `nuprix-backend/package-lock.json`.
4. Work only inside the Nuprix repository, on the dedicated phase feature branch. Feature-branch pushes and draft PR creation/updates are authorized by the master continuation. Never push to `main` or merge.
5. The lead assigns non-overlapping file ownership. Delegate only independent work; describe the file scope, acceptance criteria, and handoff. Do not have concurrent agents edit the same files.
6. Do not install/change dependencies, expose or modify secrets, purchase services, deploy, activate live payments, run production migrations, or perform destructive database operations. Skip blocked high-impact actions and continue safe work.
7. Run no checks unless the task authorizes verification. Report exactly what was and was not verified.
8. For storefront work, inspect the route, module, data helper, and shared UI patterns before editing. Prioritize mobile-first navigation, product discovery, accessible interactions, clear loading/empty/error states, and accurate physical-versus-digital expectations. Do not promise unconfigured suppliers, payments, or delivery timelines.
9. Before handoff, review the diff for unrelated changes and report files changed, risks, verification, branch, and PR status. Feature branch pushes and draft PR creation/updates are authorized; the user retains control of merging and deployment.
