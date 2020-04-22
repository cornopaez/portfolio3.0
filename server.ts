import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import * as connection from 'middlewares/mongo-connection';
import * as data from 'controllers/data';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as home from 'controllers/home'

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const app = express();
  const distFolder = join(process.cwd(), 'dist/portfolio3/browser');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  // Start MongoDB connection
  connection.connect()
    .then((response) => {
      // console.log("I'm booted and connected. Moving on...");
    })
    .catch((data) => {
      console.log("Cannot conntect to db. Exiting program: " + data);
      process.exit(1);
    });

  // Use Helmet for security
  app.use(helmet());

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  app.set('view engine', 'html');
  app.set('views', distFolder);

  // Routes for getting and posting data in the site
  app.use('/data', data)

  // Serve static files from /browser
  app.get('*.*', express.static(distFolder, {
    maxAge: '1w'
  }));

  // All regular routes use the Universal engine
  app.get('*', home.home);

  return app;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log('Portfolio 3.0 up and running on port ' + port)
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

export * from './src/main.server';
