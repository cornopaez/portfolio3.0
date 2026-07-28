# TODO

Project backlog — not in priority order.

## 1. Update Angular — DONE (2026-07-27)

Upgraded 15 → 21 one major version at a time on `feature/angular-upgrade`, merged to `main` (commit `a6ee0be`). Full writeup in `ANGULAR-UPGRADE-PROGRESS.md`.

## 2. Update all other npm packages — DONE (2026-07-28)

Upgraded on `feature/dependency-upgrade` (off `main`, post Angular-21-merge), phased one commit per package/area: dead-dependency removal (`socket.io`, `loadtest`, `guess-parser`), tslint/codelyzer → ESLint, Protractor → Playwright, Express 4→5, MongoDB driver 3→7, Helmet 3→8 with an explicit CSP, and a batch of lower-risk bumps (`dotenv`, `mocha`, `jasmine-core`, karma family, `lodash`, `randomstring`). Also cleared everything reasonably clearable from `npm audit`: 53 → 39 vulnerabilities, with the remainder fully traced to Angular's own bundled tooling (`protractor`/`postcss`/`@modelcontextprotocol/sdk` inside `@angular-devkit/build-angular`/`@angular/cli`) or `browser-sync` (a genuine peer dependency of the `dev:ssr` builder) — none reachable from this app's actual runtime code. `rxjs` 6→7 was left for a future pass (not included in this batch). Full writeup in `DEPENDENCY-UPGRADE-PROGRESS.md`. Merged to `main` (2026-07-28), along with a follow-up round of bug fixes and test-coverage improvements (item 5 below, plus new/expanded Mocha and Karma specs) — not yet pushed anywhere.

## 3. Finish dark mode feature — DONE (2026-07-28)

No prior dark-mode work was ever found (checked all local branches and the current tree; user confirmed it's fine to build from scratch rather than keep hunting for it). Built on `feature/dark-mode` (off `main`, post test-coverage merge):
- CSS custom-property tokens (`src/assets/_theme.sass`): light defaults on `:root`, explicit override via `:root[data-theme="dark"]`, and a `prefers-color-scheme` media-query fallback for users who haven't made an explicit choice.
- `ThemeService` (SSR-safe via `isPlatformBrowser`) toggles the `data-theme` attribute on `<html>` and persists the choice to `localStorage`. Toggle button lives in `app.component.html`'s footer — the only markup actually shared by every page, since there's no single header component (each top-level page repeats its own `<nav>`).
- `src/assets/theme-init.js`: a tiny same-origin `<script src>` (not an inline block — the CSP's `script-src` has no `'unsafe-inline'`) that re-applies a saved choice before first paint, so there's no flash of the wrong theme on reload.
- Re-pointed the site's actual hardcoded chrome colors (page bg/text, the nav/footer bracket-pill borders, avatar/heading borders, `.jumbotron` surface backgrounds) at the tokens, plus targeted dark-mode overrides for the Bootstrap 4 components actually in use (`.card`, `.text-muted`, `.form-control`) since Bootstrap itself (CDN-loaded, v4) has no theming of its own.
- Deliberately left untouched: the project poster cards and the musings-page banner-photo overlays, per user decision — they're intentionally-designed branded artwork/photo-contrast choices, not theme-driven UI chrome (confirmed this reads well against the dark background via screenshot).
- Verified end-to-end via a Playwright driver script against the real SSR+Express server (real CSP headers, real `/data` API): light→dark toggle, persistence across reload (confirmed the attribute is already correct at `commit`, before Angular loads) and navigation, and the system-preference fallback when no explicit choice is stored — zero console errors.
- Incidental SASS cleanup done alongside (see item 5 for the pattern): removed `_base.sass`'s dead/redundant per-component `@import`s (home/about/app.component styles were already being compiled independently via each component's own `styleUrls` — Angular's own pipeline, not this global one), and deduplicated an identical ~50-line block that `rpi-twonky.component.sass`/`ubuntu-hd-audio.component.sass` had copy-pasted verbatim into a shared `musings-jumbotron` mixin.

## 4. New pages from Notes entries

Placeholder — no source data or access yet. Revisit once the Notes export/integration is available.

## 5. Other bugs and issues found while reviewing the codebase

**Security — real secrets committed to git history (downgraded to lowest priority, 2026-07-28):** `.env` is correctly gitignored today and isn't currently tracked, but it *was* committed in early history (commit `af1ba78`, "Added and updated the Node server..."), and that commit is reachable from `main` on both the `github` and `local-origin` remotes — so if either secret were live, it'd already be exposed there, not just sitting in local history. The two values: `MONGODB_LOCAL=mongodb://testDummy:paezTest007@10.0.1.15:27017/portfolio2` and `RECAPTCHA_SECRET=6LeKYk4UAAAAABmxGf2_AcQF4ZpAvNhiNt__VKpZ`. User confirmed neither is a real concern: the Mongo instance is LAN-only (`10.0.1.15`) with no internet connectivity and no real data, and the reCAPTCHA secret is for the now-replaced ng-recaptcha integration (see item 6) — the user's Google console no longer even shows it as enabled. Explicitly deprioritized rather than fixed; revisit only if either credential turns out to matter later. No history scrub planned.

**Requests can hang indefinitely on backend errors — FIXED (2026-07-28):** `controllers/data.js`'s `/data/projects` and `/data/:name` handlers now send `res.status(500).json(...)` from their `.catch()` instead of only logging. The `/contact` handler's `validation.validate(req)` call now has a `.catch()` (responds `502` on reCAPTCHA-service failure instead of hanging), and a failed reCAPTCHA check now responds `res.status(400).json(...)` instead of `res.redirect("/error")` (that endpoint is only ever called via XHR from `DatabaseService.submitContactForm`, so a redirect never navigated the browser — confirmed the existing Angular-side `catchError`/`subscribe` logic in `contact-form.component.ts` already treats any HTTP error as a failed submission and routes to `/Error`, so no frontend changes were needed).

**Broken log interpolation — FIXED (2026-07-28):** `src/app/shared/database.service.ts`'s `handleError()` had `console.error('The baseUrl for this env is ${environment.baseUrl}')` (single quotes) instead of a template literal — now uses backticks so it prints the actual value.

**reCAPTCHA validation never actually blocked anything — already fixed, no longer applies:** this was rewritten wholesale when `ng-recaptcha` was swapped for Cloudflare Turnstile (item 6 below, commit `6e2d04a`). Current `controllers/data.js` correctly checks `if (body.success)` (not an assignment), and `middlewares/reCaptcha-validation.js#validate()` now uses `fetch(...).then(response => response.json())`, so `body.success` is a real boolean, not a raw string.

**`middlewares/mongo-connection.js#connect()` throwing instead of rejecting cleanly — already fixed, no longer applies:** resolved incidentally during the MongoDB driver 3→7 upgrade (Phase 5, `DEPENDENCY-UPGRADE-PROGRESS.md`) when the function was rewritten to `async`/`try`-`catch`.

**`controllers/home.ts` calling `dotenv.config()` on every request — already fixed, no longer applies:** current `controllers/home.ts` doesn't call `dotenv.config()` at all.

## 6. Migrate from ng-recaptcha to a Cloudflare-based option — DONE

Replaced with `ngx-turnstile` (Cloudflare Turnstile) prior to the Angular 19 hop. Full writeup in `ANGULAR-UPGRADE-PROGRESS.md`.

## 7. Push `feature/angular-upgrade`/`main` (and now `feature/dependency-upgrade`) to the local Gitea instance — partially resolved (2026-07-28)

The `github` remote (`git@github.com:cornopaez/portfolio3.0.git`) is 34 commits behind local `main` as of the Angular upgrade merge (2026-07-27), but pushing there is on hold — the user has a local Gitea instance (`local-origin`, `ssh://git@rpi5.cornopaez.net:222/mauriciopaez/portfolio3.1.git`) this should go to instead. Don't push to `github` in the meantime.

`local-origin` remote is now configured. Two distinct issues surfaced getting the first push through:
- **Gitea-side**: initial push failed with "Push to create is not enabled for users" — the target repo didn't exist yet on the Gitea instance and `ENABLE_PUSH_CREATE_USER` was off. User has full admin access to the instance, so this is fixable on their end (create the repo manually, or flip that `app.ini` setting).
- **Network-layer, specific to this Claude Code session's environment**: every attempt to reach `rpi5.cornopaez.net:222` from this session's Bash tool fails with "No route to host" / "Undefined error: 0" — confirmed via `ssh -vT`, `git ls-remote`/`git fetch`, `nc -zv`, and `ping`, and confirmed *not* a sandboxing artifact (identical failure with `dangerouslyDisableSandbox: true`). The user's own terminal can reach the same host successfully. Cause not yet root-caused — could be this environment's network path, DNS, or something Pi/router-side that only affects non-interactive/sandboxed connections.

User pushed manually from their own terminal to work around this (2026-07-28) — scope/branches of that push not confirmed from this session, since `local-origin` is still unreachable here to verify via `git fetch`/`ls-remote`. **Next time this comes up**: (a) re-check whether `local-origin` is reachable from this session before assuming it still isn't, (b) if still unreachable, further connectivity diagnosis needs to happen from the user's side or by comparing routing/DNS config between the two environments — deferred, per explicit instruction, until the user wants to pick it up again.
