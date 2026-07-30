import { enableProdMode } from '@angular/core';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

if (environment.production) {
  enableProdMode();
}

const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
