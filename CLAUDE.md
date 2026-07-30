# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site built with Angular 21 (originally scaffolded from Angular CLI 8, upgraded one major at a time — see "Known rough edges" below) and rendered server-side via Angular Universal (`@angular/ssr`, not the older `@nguniversal/express-engine` this project started with). An Express server serves the SSR'd app and exposes a small `/data` API backed by MongoDB. Deployed to Heroku (see `Procfile`).

Local dev should run **Node 24.x**, matching Heroku's auto-resolved runtime (`package.json` has no `engines` field, so Heroku always picks up current LTS — re-check `heroku releases`/build logs if this drifts). No per-project version manager (nvm/volta/fnm) is set up; Node is pinned machine-wide via a `PATH` entry in `~/.zshrc` pointing at a Homebrew `node@<major>` keg.

## Commands

Frontend (Angular CLI, via `ng`):
- `npm start` / `ng serve` — dev server at `http://localhost:4200`
- `npm run build` / `ng build` — production browser build only (`--configuration production` for prod)
- `npm test` / `ng test` — Karma/Jasmine unit tests for `src/app`, launched headless Chrome by default (`test:watch` uses Firefox — see `karma.conf.js`). To run against a single file, use Angular's `--include`, e.g. `ng test --include='**/about.component.spec.ts'`
- `npm run lint` / `ng lint` — ESLint (flat config in `eslint.config.js`, via `@angular-eslint`). Clean as of 2026-07-30 (was 108 findings — see "Known rough edges").
- `npm run e2e` — Playwright (`playwright.config.ts`, tests in `e2e/`), invoked directly rather than through `ng e2e` (no official Angular/Playwright builder integration).

SSR / server build and run:
- `npm run dev:ssr` — build + serve with SSR for local dev (`ng run portfolio3:serve-ssr`)
- `npm run build:ssr` — production browser build + server bundle (`ng run portfolio3:server:production`)
- `npm run serve:ssr` — run the already-built server bundle (`node dist/portfolio3/server/main.js`)
- `npm run prerender` — static prerender (`ng run portfolio3:prerender`)
- `npm run heroku-postbuild` — what Heroku runs on deploy; identical to `build:ssr`

Backend/API tests:
- Tests in `mocha-tests/` (using Mocha + `expect.js`) are **not** wired into `package.json` scripts — run directly with `npx mocha mocha-tests/*.test.js`. These are integration tests: `mongo-connection.test.js` and `mongo-queries.test.js` require a live MongoDB connection (see Environment below) and will fail/hang without one.

## Environment

Configuration is loaded via `dotenv` from a `.env` file at the repo root (not committed). Required keys, based on `controllers/`, `middlewares/`, and `server.ts`:
- `MONGODB_LOCAL` — local MongoDB connection string (production instead reads `MONGOLAB_COPPER_URI`, set on Heroku)
- `TURNSTILE_SECRET_KEY` — used by `middlewares/reCaptcha-validation.js` to verify the contact form's Cloudflare Turnstile token server-side. `server.ts` fails fast at boot (logs and `process.exit(1)`s) if this is unset — added 2026-07-29 after a ~2-day production gap where a `RECAPTCHA_SECRET`→`TURNSTILE_SECRET_KEY` rename landed in `.env` but not in Heroku's config vars, so every siteverify call silently went out with no `secret` field and Cloudflare's dashboard flagged siteverify as never being called for the widget. If this check ever fires on Heroku, that's almost certainly the failure mode: check `heroku config` has the current var name, not a stale one from a prior rename.
- `NODE_ENV` — when `production`, `controllers/home.ts` forces HTTPS redirects

## Deploying to Heroku

Immediately before every `git push heroku main`, as part of that same commit:
- Bump `package.json`'s `version` to `0.0.<N>`, where `N` is the release number this push will become (check the current release with `heroku releases -n 1`, then use `current + 1` — Heroku's counter increments on every release, not just code deploys, so re-check right before pushing rather than assuming).
- Bump the "Site last updated on" date in `src/app/contact/contact-home/contact-home.component.html` to the current date.

## Architecture

**Two build targets share one codebase.** `angular.json`'s `portfolio3` project has both a browser target (`src/`) and a server target (`server.ts` → `src/main.server.ts` → `src/app/app.config.server.ts`). `server.ts` is the actual Express entrypoint: it builds the `app()`, starts the Mongo connection, mounts middleware, and only calls `run()` (starts listening) when invoked directly rather than required as a module — this lets the same `app()` be reused as a serverless function export. The actual Angular Universal rendering happens in `controllers/home.ts`, which instantiates `CommonEngine` from `@angular/ssr/node` (not the older `ngExpressEngine` this project used pre-Angular-21) and calls `.render()` per request.

**All-standalone components, no `NgModule`s** (migrated 2026-07-30, `todo.md` item 17). `src/main.ts` bootstraps the browser via `bootstrapApplication(AppComponent, appConfig)`; `src/main.server.ts` exports a `bootstrap(context: BootstrapContext)` function calling `bootstrapApplication(AppComponent, config, context)` — Angular 21's SSR bootstrap requires that `BootstrapContext` be threaded through explicitly, or it throws `NG0401: Missing Platform`. `src/app/app.config.ts` holds the shared `ApplicationConfig` (router, `HttpClient`, app-level providers like `DatabaseService`/`ThemeService`/the route resolvers); `src/app/app.config.server.ts` merges in `provideServerRendering()` for the server build. Routes live in `src/app/app.routes.ts` (a plain `Routes` array, wired in via `provideRouter(...)` in `app.config.ts`) rather than an `app-routing.module.ts`.

**Request flow for a page load:** `server.ts` → Express routes `*.* ` to static files in `dist/portfolio3/browser`, everything else falls through to `controllers/home.ts`'s `home` handler, which renders `index.html` (or `index.original.html` if present) through the Angular Universal engine, injecting `APP_BASE_HREF`. `CommonEngine` (since Angular 21) validates the request's `Host` header against an explicit `allowedHosts` list (`controllers/home.ts`: `localhost`, `cornopaez.com`, `www.cornopaez.com`) and throws (`"URL with hostname ... is not allowed"`, currently surfaced as a 500) for any other host. Confirmed 2026-07-29: hitting the bare `cornopaez.herokuapp.com` URL directly (bypassing Cloudflare/the real domain) 500s for exactly this reason — not an app crash, and unrelated to whatever else was just deployed.

**Request flow for data:** the Angular app's `DatabaseService` (`src/app/shared/database.service.ts`) calls `this.baseUrl + '/data/...'`, where `baseUrl` is `environment.baseUrl` (`''`, i.e. a same-origin relative path — `todo.md` item 18) unless `INTERNAL_BASE_URL` (`src/app/shared/internal-base-url.token.ts`) is injected, which `controllers/home.ts` provides per-request during SSR as `http://localhost:$PORT` (`todo.md` item 19). That loopback override exists because SSR resolvers self-fetching the site's own public domain round-trips out through Cloudflare's edge, which challenges/blocks the request as bot traffic (confirmed live via `heroku logs`, both historical production incidents and a fresh repro) — the loopback path reaches the same dyno's Express process directly instead. Browser-side requests never see the token, so they stay relative. These `/data/...` requests hit `controllers/data.js` (an Express router mounted at `/data` in `server.ts`), which calls into `middlewares/mongo-queries.js` for the actual MongoDB reads/writes, using the shared connection managed as a module-level singleton in `middlewares/mongo-connection.js` (`connect()` is called once at server boot; `getDb()` returns the cached db handle afterward — there is no per-request connection or reconnect logic).

**Angular routing structure:** top-level routes in `app.routes.ts` map to: `Home`, `Projects` (list + `:name` detail, both backed by resolvers — `ProjectsResolver`/`ProjectDetailResolver` — that pre-fetch data via `DatabaseService` before navigation completes), `About`, `Contact` (sub-routes for the form, a success page, and a landing page; the form route has a `CanDeactivateGuard` to warn on navigating away with unsaved input), and `Musings` (a small blog-like section with hardcoded sub-pages, e.g. `rpi-twonky`, `ubuntu-hd-audio`). Unmatched paths redirect to `Error`.

**Contact form submission path:** `ContactFormComponent` → `DatabaseService.submitContactForm()` → `POST /data/contact` → `controllers/data.js` validates the Cloudflare Turnstile token via `middlewares/reCaptcha-validation.js`, then persists via `mongo-queries.js#postContactRequest` into the `requests` collection.

## Known rough edges

Worth being aware of before assuming behavior is intentional:

- **`rxjs` is still on 6.x** (`~6.5.5`) — everything else went through a dependency-upgrade pass in 2026-07-28 (Express 4→5, `mongodb` 3→7, Helmet 3→8, TSLint/Protractor→ESLint/Playwright), but `rxjs` 6→7 was explicitly deferred out of that pass and hasn't been picked up since.
- **`ng lint` was 108 findings as of 2026-07-29, now 0** (fixed 2026-07-30 across `todo.md` items 14 and 17). It had been a no-op for years (no lint target was ever configured before the 2026-07-28 ESLint migration), so this was six Angular-major-versions' worth of accumulated style debt surfacing for the first time, not a regression from any single change: mostly architectural-preference rules (`@angular-eslint/prefer-standalone`, `@angular-eslint/prefer-inject`) plus unused imports/vars and a few `template/alt-text` misses. `prefer-standalone` specifically wasn't clearable without the full standalone migration (item 17), which is why it was split out from item 14's mechanical cleanup rather than fixed alongside it.
- **This project lives on a network-mounted SMB share** (a Raspberry Pi NAS, not local disk), which causes real, recurring flakiness: corrupted `node_modules` entries mid-install, `rm -rf` hitting "Resource busy", a hung file watcher under `ng run portfolio3:serve-ssr` / `npm run dev:ssr` (and equally under raw `ts-node` against `server.ts`), and the esbuild-based Angular `application` builder reproducibly crashing with `SIGABRT` under full-build load specifically on this volume (a trivial isolated `esbuild.build()` call works fine; only sustained/heavy concurrent file I/O triggers it — diagnosed as far as "healthy ZFS ARC, no SLOG so every fsync hits mirrored HDDs directly, `smbd` seen spiking to 100% CPU during stalls," not fully root-caused beyond that). **Practical implications:** if a build/watch/install step inexplicably hangs or crashes, suspect the volume before the code — retry once or twice, or reboot. Prefer verifying changes by running the **compiled** server directly (`node dist/portfolio3/server/main.js`, after `npm run build:ssr`) over the `dev:ssr` watch-mode dev server, which has hung repeatedly on this volume across multiple sessions. This is also why the project deliberately still uses the legacy webpack builder rather than Angular's now-default esbuild-based `application` builder — worth revisiting once the mount issue is understood, or if the project moves to local disk, since the webpack builder won't be supported forever.
