import { NextFunction, Request, Response } from "express";
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import { existsSync } from 'fs';
import { join } from 'path';
import bootstrap from '../src/main.server';
import { INTERNAL_BASE_URL } from '../src/app/shared/internal-base-url.token';

const distFolder = join(process.cwd(), 'dist/portfolio3/browser');
const commonEngine = new CommonEngine({
  allowedHosts: ['localhost', 'cornopaez.com', 'www.cornopaez.com'],
});

// The port this same process is actually listening on (server.ts). SSR
// resolvers use this to call /data over loopback instead of the public
// domain -- see INTERNAL_BASE_URL's doc comment for why.
const internalBaseUrl = `http://localhost:${process.env['PORT'] || 4000}`;

export const home = (req: Request, res: Response, next: NextFunction) => {
  // Check for secure connection
  if (req.headers["x-forwarded-proto"] !== "https" && process.env.NODE_ENV == 'production' && !req.secure){
    console.log("Forcing HTTPS...")
    res.redirect('https://'+req.hostname+req.url);
    return;
  }

  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: distFolder,
      providers: [
        { provide: APP_BASE_HREF, useValue: baseUrl },
        { provide: INTERNAL_BASE_URL, useValue: internalBaseUrl },
      ],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
}