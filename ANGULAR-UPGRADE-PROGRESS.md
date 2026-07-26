# Angular 15 → 21 Upgrade — Progress Log

Working branch: `feature/angular-upgrade` (created off `feature/gen-maintenance`).
Full plan: see the plan approved at the start of this effort — one commit per major version, `ng update` one hop at a time, non-Angular packages only bumped if they genuinely block a step.

## Status: v17 done and committed, starting v18

### Done and committed
- **v16** — commit `85fe661` "Upgrade Angular to v16" on `feature/angular-upgrade`.
  - `ng update @angular/core@16 @angular/cli@16 @nguniversal/express-engine@16 @nguniversal/builders@16 --allow-dirty`
  - Automatic migrations: removed deprecated `CanActivate`/`Resolve` `implements` clauses from resolvers/guard; disabled `buildOptimizer` for non-optimized server builds in `angular.json`.
  - Manual fix: dropped the dead `renderModuleFactory` re-export from `src/main.server.ts` (removed from `@angular/platform-server` in v16, wasn't referenced anywhere).
  - Verified: browser build ✓, SSR server build ✓, 59/59 unit tests ✓.

### In progress — v17 (uncommitted working-tree changes right now)
This is the step flagged as riskiest in the plan: `@nguniversal/express-engine` + `@nguniversal/builders` fold into `@angular/ssr`.

Ran: `ng update @angular/core@17 @angular/cli@17 ng-recaptcha@13 --allow-dirty`
- `ng-recaptcha` had to be bumped 11.0.0 → 13.2.1 in the same command — its peer dep on `@angular/core` (`^15.0.0`) blocked the update otherwise. This is the "bump a blocking non-Angular package" case pre-approved in the plan.
- Automatic migrations: replaced `@nguniversal/builders`/`@nguniversal/*` usage with `@angular/ssr` + `@angular-devkit/build-angular` (rewrote `angular.json` builders, renamed old `server.ts` → `server.ts.bak` and generated a fresh templated `server.ts`); escaped literal `@`/`}` characters in `src/app/musings/rpi-twonky/rpi-twonky.component.html` for the new control-flow parser; added `browser-sync` as a dev dependency.

**Problem found:** the generated `server.ts` template is a generic scaffold — it dropped all of this app's actual Express wiring (Helmet, body-parser, the MongoDB connection bootstrap, the `/data` API router) and inlined rendering directly instead of going through `controllers/home.ts`. It also didn't give `src/main.server.ts` a default export, which the new `server.ts` needs (`import bootstrap from './src/main.server'`) — that import would have failed to compile as-is.

**Manually reconciled** (matches the CLAUDE.md-documented request flow: static passthrough → `/data` API → `home.ts` handles the SSR fallback):
- `src/main.server.ts` — added `export default AppServerModule;` alongside the existing named export.
- `server.ts` — kept the new `@angular/ssr`/`CommonEngine` import, but restored: `helmet()`, `body-parser` (json + urlencoded), the `middlewares/mongo-connection` startup call, `/data` mounted via `controllers/data`, and delegates the catch-all route back to `home.home` (was inlined into an anonymous handler by the schematic — moved that logic into `controllers/home.ts` instead, see below).
- `controllers/home.ts` — rewritten to use `CommonEngine.render()` instead of the removed `ngExpressEngine`/view-engine mechanism, keeping its function signature Express-compatible (`(req, res, next)` — added `next` for error propagation from the render promise, which `ngExpressEngine` used to handle internally). Preserved the existing HTTPS-forcing redirect behavior. Dropped the per-request `dotenv.config()` call — it was already fully redundant (both `middlewares/mongo-connection.js` and `controllers/data.js` call `dotenv.config()` at module-load time, before any request arrives), so removing it changes nothing functionally; it's also the exact behavior flagged as a bug in `todo.md` item 5, so this is a small incidental win, not a deliberate detour to fix that item.

### Also hit and fixed: unrelated node_modules corruption
Mid-upgrade, `node_modules/@jridgewell/resolve-uri` (and a couple of sibling packages) ended up with just a `package.json` and no actual files — an `npm install` on its own didn't repair it (npm treated it as already-satisfied). `rm -rf node_modules` hit "Resource busy" errors on this network volume (`/Volumes/Rome`) a couple of times; the user manually deleted `node_modules` at the source, then a fresh `npm install` completed cleanly (1346 packages, ~15 min — this volume is slow). Not an Angular issue, just noting it in case it recurs at a later step.

### v17 — done
- Fixed a second issue: schematic template used `node:path` (Node-prefixed built-in import); this project's `@types/node` (`^12.20.12`) predates type declarations for `node:`-prefixed specifiers. Changed back to plain `import { join } from 'path'` in `server.ts`, matching the rest of the codebase's convention. Did not bump `@types/node` — out of scope.
- All verification passed: browser build ✓, SSR server build ✓, 59/59 unit tests ✓, and a live `npm run dev:ssr` smoke test — curled `http://localhost:4200/` and got real SSR'd HTML (200, correct `<title>`, ~26KB, `ng-version` present confirming real rendered content not an empty shell), plus curled `http://localhost:4200/data/projects` and got real Mongo-backed JSON back. Killed the dev server afterward.
- Deleted `server.ts.bak` (schematic backup, no longer needed).
- Committed as `a22801d` "Upgrade Angular to v17" (7 files: `angular.json`, `controllers/home.ts`, `package.json`, `package-lock.json`, `server.ts`, `src/main.server.ts`, `src/app/musings/rpi-twonky/rpi-twonky.component.html`).

### Note for later steps
The `npm run dev:ssr` smoke test connects to the **real** MongoDB Atlas cluster configured in the local `.env` (`MONGODB_LOCAL`) — it worked fine (outbound network egress is allowed in this environment), so re-run this smoke test at each remaining step, not just v17. Be careful never to echo or write the Mongo connection string (it contains live credentials) into this file, commit messages, or any other tracked output — Node itself prints it once via a `DEP0170` deprecation warning on startup, which is harmless locally but don't propagate it further.

### Next up: v18, v19, v20, v21
Same pattern each time:
1. `npx ng update @angular/core@N @angular/cli@N --allow-dirty` (add any other package `ng update` flags as incompatible, matching its major if one exists — that's how `@nguniversal/*` and `ng-recaptcha` got handled at v16/v17).
2. Fix any resulting compile/test breakage by hand.
3. Verify: `ng build`, `ng run portfolio3:server`, `ng test --watch=false --browsers=ChromeHeadless`, and a `dev:ssr` smoke test (curl `/` and `/data/projects`).
4. `git diff --stat | awk '$0 !~ /\|\s+0$/'` to find just the real changes, stage only those, commit as "Upgrade Angular to vN".
5. Update this file.

### Still to do after v17
- v18: `ng update @angular/core@18 @angular/cli@18 --allow-dirty` (watch for further peer-dep conflicts the same way as v16/v17).
- v19, v20, v21: same pattern.
- Final pass once at v21: full build + SSR build + tests + `dev:ssr` smoke test, then a summary for the user covering what moved and anything worth a future todo item (e.g. standalone/control-flow migration, was explicitly left out of scope).

### Standing rules for the rest of this task
- Always `git diff --stat | awk '$0 !~ /\|\s+0$/'` before staging, to separate real changes from the pre-existing mode-bit noise (159 files, `.gitignore`'s `TODO.md` line) that isn't part of this task — never `git add -A`.
- `ng lint` has no target configured in `angular.json` at all (pre-existing, not caused by this upgrade) — dropped as a per-step gate; worth a mention in the final summary since `todo.md` item 2 already flags moving off TSLint.
- Bump a non-Angular package only as far as needed to unblock a step (peer-dep conflict or break), not to its own latest — call it out when it happens. (`ng-recaptcha` → 13.2.1 is the one so far.)
- `CLAUDE.md` shows as untracked in git — pre-existing, not part of this task, leave it alone.
