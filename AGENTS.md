# Nuprix project instructions

## Scope and approvals

- Work only in this Nuprix repository.
- Continue phases in roadmap order under the user's master development authorization. Record unknown business decisions as blockers; do not invent supplier capabilities or legal/payment policies.
- Do not expose secrets, purchase services, deploy, push directly to `main`, merge pull requests, or perform destructive database operations. Feature-branch pushes and draft PR creation/updates are authorized.
- Do not install packages or change dependencies unless the user separately approves it.
- Keep the pre-existing modifications to `nuprix-backend/package.json` and `nuprix-backend/package-lock.json` intact.
- Use a dedicated `codex/` feature branch and reviewable PR for each phase. Preserve PR #5 and its history. Do not merge PRs or push to `main`.
- Do not modify files owned by another active agent. The lead assigns non-overlapping file scopes and reviews integration.

## Repository facts

- The application monorepo is `nuprix-backend/`.
- `apps/storefront/` is the Next.js 16 storefront; `apps/backend/` is Medusa 2.22.7 with PostgreSQL.
- Check the nearest `AGENTS.md` and applicable skill before changing an app.
- Preserve the current package manager and lockfile; do not create another lockfile.

## Delivery

- Prefer small, phase-scoped changes with clear acceptance criteria.
- Report files changed, decisions, verification performed, limitations, and any follow-up approvals needed.
- Never claim tests or checks were run unless they actually were.
