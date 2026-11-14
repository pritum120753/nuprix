# Nuprix project instructions

## Scope and approvals

- Work only in this Nuprix repository.
- Follow the currently approved phase in `docs/implementation-roadmap.md`. Phase 1 is authorized; Phases 2–8 require separate user approval.
- Do not expose secrets, purchase services, deploy, push to `main`, merge pull requests, or perform destructive database operations.
- Do not install packages or change dependencies unless the user separately approves it.
- Keep the pre-existing modifications to `nuprix-backend/package.json` and `nuprix-backend/package-lock.json` intact.
- Use a dedicated `codex/` feature branch for each approved phase. Prepare a reviewable branch and report PR readiness; never push or merge without explicit authorization.
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
