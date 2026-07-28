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

Not yet merged to `main` — holding on the Safari investigation (item 8) first, found while reviewing this work locally. 4 commits on `feature/dark-mode`.

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

## 8. Site doesn't work well in Safari (works fine in Firefox) — FIXED (2026-07-28)

Reported by user (2026-07-28) after reviewing the dark mode work locally, via `feature/dark-mode`. Symptoms: images not loading, some icons not loading, the dark-mode toggle unresponsive, `/Projects` and `/Musings` not loading at all.

The `.browserslistrc`/Safari-26-version lead logged here originally turned out to be a dead end — `caniuse-lite` was up to date and Safari 26.x is a real, current version (Apple aligned Safari's numbering to the OS year), not a phantom/unsupported one.

**Actual root cause, confirmed via desktop Safari's Web Inspector against the real `dev:ssr` server**: not a Safari compatibility bug at all. `helmet()` in `server.ts` was sending `Strict-Transport-Security` (HSTS, `max-age=31536000`) and a CSP with `upgrade-insecure-requests` on every response, including from the plain-HTTP local dev/SSR servers. Once Safari picked up either signal (from an earlier session where a `--configuration production`-built server was tested locally, see item 2/the port-confusion note in memory), it cached "always use HTTPS for `localhost`" and began silently rewriting every subsequent `http://localhost:*` request — any port — to `https://`, which then failed with a TLS error since nothing was listening with TLS. That explains every symptom at once: `main.js`/`runtime.js`/`polyfills.js` failing to load meant Angular's client bundle never booted, which killed client-side routing (`/Projects`, `/Musings`) and the JS-driven theme toggle; `theme-init.js`, images, and `devicon.min.css` failed the same way. Firefox was unaffected because it never had that HSTS state cached for `localhost` in the first place — nothing Safari-specific about the underlying bug.

**Fix**, on `fix/local-https-headers` (off `main`, 1 commit, merged locally into `feature/dark-mode`, not yet merged to `main`): extracted the Helmet CSP/HSTS config into `middlewares/security-headers.js#getHelmetOptions(isProduction)`, gating both HSTS and `upgrade-insecure-requests` behind `process.env.NODE_ENV === 'production'` — safe to keep in production since Heroku actually terminates TLS there. Added `mocha-tests/security-headers.test.js` (Mocha, not Karma — this is Express/Helmet config, no Angular code involved) asserting both headers are present in production and absent otherwise. Verified against the real `dev:ssr` server via `curl` headers before/after. All existing Mocha tests still pass.

**Two more bugs surfaced once the above unblocked actual page loads in Safari, both fixed and verified (2026-07-28):**
- **Every project detail banner was broken**, not just a Safari thing: `projects-details.component.sass` set each banner's `background-image` via relative `'../assets/foo.png'` paths, which Angular's SSR style-inlining strips down to a bare filename — the browser then resolved it against the current page URL (e.g. `/Projects/PYTDance/foo.png`) instead of `/assets/`, silently 404ing through the SPA's catch-all route. Fixed on `fix/project-banner-asset-paths` (off `main`, 1 commit, merged locally into `feature/dark-mode`) by switching all 16 references to absolute `/assets/...` paths. Added `mocha-tests/project-banner-asset-paths.test.js`, which compiles the real `.sass` file via the `sass` package (added as an explicit devDependency) and asserts every banner URL is absolute and points at a real file.
- **PYT Dance's project-list card had no image**: not a missing/wrong asset — `card.image` (the field the `<img>` binding reads) was empty, while a correct, already-uploaded asset sat unused in `card.background_image`. Confirmed via the second, production-tracking checkout (item 9) that production renders this field as a CSS `background-image` on the card div, a binding this checkout never had. Ported that binding (`projects-home.component.html`, guarded against `undefined`) instead of touching the database. Added `ProjectCard#background_image` and two Karma specs to `projects-home.component.spec.ts` (the fixture already had the right test data, just no assertions on it). Committed directly to `feature/dark-mode` (small, tightly-scoped, avoided another branch-switch around the live test server).

All three fixes verified end-to-end against the real `dev:ssr` server and confirmed working by the user in desktop Safari.

## 9. Port content changes from a second, divergent local checkout

User has another clone of this repo at `/Users/mauriciopaez/projects/websites/portfolio3` (2026-07-28) with content that never made it into the repo actively worked on here. Not a simple stale/duplicate copy — it's genuinely diverged:
- Same GitHub remote (`cornopaez/portfolio3.0.git`) plus `heroku` and a `local-origin` pointing at `rpi5.cornopaez.net:222/mauriciopaez/portfolio3.git` (note: `.git`, not `.1.git` like this repo's `local-origin` — worth double-checking these are actually the same Gitea target, see item 7).
- Currently on branch `cleanup/remove-dead-code` at Angular **16** — well behind this repo's Angular 21 (`feature/angular-upgrade`/`main`), so this isn't a fast-forward or clean cherry-pick situation; version-gap-aware care is needed when porting.
- Most recent commit: `cbf2016` "Remove dead code and fix string interpolation bug". Earlier history includes what look like **two entire new Musings sections never ported here**: a "pihole" writeup and an "acme"/TLS-for-lab writeup (commits like "First draft of pihole section is complete", "Initial draft of acme section is complete", "Migrated most `pre` tags into components to improve maintainability", "Updated sitemap to include new musing"), plus assorted content/style fixes ("Fixed various style inconsistencies for images and size breaks", "Cleaned up inconsistent tags and spelling errors").
- Also has an **uncommitted** local edit to its own `TODO.md` (different file from this repo's lowercase `todo.md`) adding a "Test Coverage" section listing specs to flesh out — overlaps somewhat with the test-coverage work already done here (item 5's Mocha/Karma additions), worth comparing before assuming it's still needed.

Not yet diffed or scoped in detail — just confirmed the checkout exists and skimmed its `git log`/pending diff. Next step: a proper content diff (probably page-by-page for the two new Musings sections, since the underlying Angular scaffolding has moved on too much for a mechanical merge) before deciding how to port it into the current Angular-21 codebase.
