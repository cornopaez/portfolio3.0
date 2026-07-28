# TODO

Project backlog — not in priority order.

## 1. Update Angular — DONE (2026-07-27)

Upgraded 15 → 21 one major version at a time on `feature/angular-upgrade`, merged to `main` (commit `a6ee0be`). Full writeup in `ANGULAR-UPGRADE-PROGRESS.md`.

## 2. Update all other npm packages — DONE (2026-07-28)

Upgraded on `feature/dependency-upgrade` (off `main`, post Angular-21-merge), phased one commit per package/area: dead-dependency removal (`socket.io`, `loadtest`, `guess-parser`), tslint/codelyzer → ESLint, Protractor → Playwright, Express 4→5, MongoDB driver 3→7, Helmet 3→8 with an explicit CSP, and a batch of lower-risk bumps (`dotenv`, `mocha`, `jasmine-core`, karma family, `lodash`, `randomstring`). Also cleared everything reasonably clearable from `npm audit`: 53 → 39 vulnerabilities, with the remainder fully traced to Angular's own bundled tooling (`protractor`/`postcss`/`@modelcontextprotocol/sdk` inside `@angular-devkit/build-angular`/`@angular/cli`) or `browser-sync` (a genuine peer dependency of the `dev:ssr` builder) — none reachable from this app's actual runtime code. `rxjs` 6→7 was left for a future pass (not included in this batch). Full writeup in `DEPENDENCY-UPGRADE-PROGRESS.md`. Not yet merged to `main` — awaiting go-ahead.

## 3. Finish dark mode feature

Checked for this: no local branch (`dev`, `karma`, `ng-update`, `sockets`, `universal`, `update/update-dependencies`, `winston`) has commits diverging from `main` related to dark mode, and there's no dark-mode theming code in the current tree (only an unrelated Bootstrap `btn-dark` class in `home.component.html`). Didn't check the GitHub remote per instruction to skip it for now — the work may live there, on another machine, or may not have been pushed. Worth tracking down before starting from scratch.

## 4. New pages from Notes entries

Placeholder — no source data or access yet. Revisit once the Notes export/integration is available.

## 5. Other bugs and issues found while reviewing the codebase

**Security — real secrets committed to git history (highest priority, still open):** `.env` is correctly gitignored today and isn't currently tracked, but it *was* committed in early history (e.g. commit `af1ba78`, "Added and updated the Node server..."). `git show af1ba78:.env` reveals a live-looking `RECAPTCHA_SECRET` and a `MONGODB_LOCAL` connection string. Since this repo has a GitHub remote, these may already be exposed there. Recommend rotating the reCAPTCHA secret (and Mongo credentials, if that instance/user still exists) regardless, and deciding whether to scrub git history (`git filter-repo`/BFG) — that's a destructive, history-rewriting operation on a repo with a remote, so it needs explicit go-ahead rather than being done as a drive-by fix.

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
