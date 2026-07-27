import { NextFunction, Request, Response } from "express";
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import { existsSync } from 'fs';
import { join } from 'path';
import bootstrap from '../src/main.server';

const distFolder = join(process.cwd(), 'dist/portfolio3/browser');
const commonEngine = new CommonEngine({
  allowedHosts: ['localhost', 'cornopaez.com', 'www.cornopaez.com'],
});

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
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
}