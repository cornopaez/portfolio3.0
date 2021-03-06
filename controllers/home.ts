import { Request, Response } from "express";
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv'

export const home = (req: Request, res: Response) => {
  dotenv.config()
  const distFolder = join(process.cwd(), 'dist/portfolio3/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Check for secure connection
  if (req.headers["x-forwarded-proto"] !== "https" && process.env.NODE_ENV == 'production' && !req.secure){
    console.log("Forcing HTTPS...")
    res.redirect('https://'+req.hostname+req.url);
  } else  {
    // Send page if everything is OK
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  }
}