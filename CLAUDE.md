# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site built with Angular 15 (originally scaffolded from Angular CLI 8) and rendered server-side via Angular Universal (`@nguniversal/express-engine`). An Express server serves the SSR'd app and exposes a small `/data` API backed by MongoDB. Deployed to Heroku (see `Procfile`).

## Commands

Frontend (Angular CLI, via `ng`):
- `npm start` / `ng serve` — dev server at `http://localhost:4200`
- `npm run build` / `ng build` — production browser build only (`--configuration production` for prod)
- `npm test` / `ng test` — Karma/Jasmine unit tests for `src/app`, launched in Firefox (see `karma.conf.js`). To run against a single file, use Angular's `--include`, e.g. `ng test --include='**/about.component.spec.ts'`
- `npm run lint` / `ng lint` — TSLint (config in `tslint.json`)
- `npm run e2e` / `ng e2e` — Protractor e2e tests (config in `e2e/protractor.conf.js`)

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
- `TURNSTILE_SECRET_KEY` — used by `middlewares/reCaptcha-validation.js` to verify the contact form's Cloudflare Turnstile token server-side
- `NODE_ENV` — when `production`, `controllers/home.ts` forces HTTPS redirects

## Deploying to Heroku

Immediately before every `git push heroku main`, as part of that same commit:
- Bump `package.json`'s `version` to `0.0.<N>`, where `N` is the release number this push will become (check the current release with `heroku releases -n 1`, then use `current + 1` — Heroku's counter increments on every release, not just code deploys, so re-check right before pushing rather than assuming).
- Bump the "Site last updated on" date in `src/app/contact/contact-home/contact-home.component.html` to the current date.

## Architecture

**Two build targets share one codebase.** `angular.json`'s `portfolio3` project has both a browser target (`src/`) and a server target (`server.ts` → `src/main.server.ts` → `AppServerModule` in `src/app/app.server.module.ts`). `server.ts` is the actual Express entrypoint: it builds the `app()`, wires the Angular Universal template engine (`ngExpressEngine`), starts the Mongo connection, mounts middleware, and only calls `run()` (starts listening) when invoked directly rather than required as a module — this lets the same `app()` be reused as a serverless function export.

**Request flow for a page load:** `server.ts` → Express routes `*.* ` to static files in `dist/portfolio3/browser`, everything else falls through to `controllers/home.ts`'s `home` handler, which renders `index.html` (or `index.original.html` if present) through the Angular Universal engine, injecting `APP_BASE_HREF`.

**Request flow for data:** the Angular app's `DatabaseService` (`src/app/shared/database.service.ts`) calls `environment.baseUrl + '/data/...'`. Those requests hit `controllers/data.js` (an Express router mounted at `/data` in `server.ts`), which calls into `middlewares/mongo-queries.js` for the actual MongoDB reads/writes, using the shared connection managed as a module-level singleton in `middlewares/mongo-connection.js` (`connect()` is called once at server boot; `getDb()` returns the cached db handle afterward — there is no per-request connection or reconnect logic).

**Angular module/routing structure:** everything is registered in the single root `AppModule` (`src/app/app.module.ts`) — there is no lazy-loaded feature module. Top-level routes in `app-routing.module.ts` map to: `Home`, `Projects` (list + `:name` detail, both backed by resolvers — `ProjectsResolver`/`ProjectDetailResolver` — that pre-fetch data via `DatabaseService` before navigation completes), `About`, `Contact` (sub-routes for the form, a success page, and a landing page; the form route has a `CanDeactivateGuard` to warn on navigating away with unsaved input), and `Musings` (a small blog-like section with hardcoded sub-pages, e.g. `rpi-twonky`, `ubuntu-hd-audio`). Unmatched paths redirect to `Error`.

**Contact form submission path:** `ContactFormComponent` → `DatabaseService.submitContactForm()` → `POST /data/contact` → `controllers/data.js` validates the Cloudflare Turnstile token via `middlewares/reCaptcha-validation.js`, then persists via `mongo-queries.js#postContactRequest` into the `requests` collection.

## Known rough edges

Worth being aware of before assuming behavior is intentional:
- Dependencies are dated (Angular 15, `mongodb` v3, `rxjs` 6, `tslint`/Protractor — both deprecated upstream) relative to current tooling.
