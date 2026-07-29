import 'zone.js/node';

import express from 'express';
import { join } from 'path';
import * as connection from 'middlewares/mongo-connection';
import * as data from 'controllers/data';
import * as bots from 'controllers/bots';
import helmet from 'helmet';
import { getHelmetOptions } from 'middlewares/security-headers';
import * as home from 'controllers/home';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/portfolio3/browser');

  // Fail fast if the Turnstile secret is missing -- without it,
  // reCaptcha-validation.js silently posts to Cloudflare's siteverify
  // endpoint with no `secret` field (JSON.stringify drops undefined),
  // so the contact form's bot protection quietly does nothing instead
  // of erroring, and there's no client-visible symptom to catch it.
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.log("Missing TURNSTILE_SECRET_KEY env var. Exiting program.");
    process.exit(1);
  }

  // Start MongoDB connection
  connection.connect()
    .then((response) => {
      // console.log("I'm booted and connected. Moving on...");
    })
    .catch((data) => {
      console.log("Cannot conntect to db. Exiting program: " + data);
      process.exit(1);
    });

  // Use Helmet for security. Helmet 4+ enables a restrictive default CSP
  // (v3 enabled none), so the external resources this site actually loads
  // -- Bootstrap/jQuery/Popper CDNs, a Font Awesome Kit script, and
  // Cloudflare Turnstile -- need to be allow-listed explicitly or they'd
  // silently stop loading. HSTS and upgrade-insecure-requests are only
  // safe once Heroku is actually terminating TLS in front of us -- see
  // middlewares/security-headers.js for why they break local HTTP testing.
  server.use(helmet(getHelmetOptions(process.env.NODE_ENV === 'production')));

  server.use(express.json()); // support json encoded bodies
  server.use(express.urlencoded({ extended: true })); // support encoded bodies

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // 404 known-junk crawler paths (bad Google Search Console traffic) before
  // they reach the SSR catch-all.
  server.use(bots);

  // Routes for getting and posting data in the site
  server.use('/data', data);

  // Serve static files from /browser. index: false so that '/' (and other
  // extensionless routes) still fall through to the Angular SSR handler
  // below instead of being served the static, unrendered index.html shell.
  server.use(express.static(distFolder, {
    maxAge: '1y',
    index: false
  }));

  // All regular routes use the Angular engine. The braces make the
  // wildcard optional so this also matches the bare '/' route, not just
  // '/foo' and deeper paths.
  server.get('/{*splat}', home.home);

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export default bootstrap;
