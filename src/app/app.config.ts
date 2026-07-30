import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { Title, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, withInMemoryScrolling, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgxTurnstileModule, NgxTurnstileFormsModule } from 'ngx-turnstile';

import { routes } from './app.routes';
import { ProjectsResolver } from './projects/projects-resolver.component';
import { ProjectDetailResolver } from './projects/projects-details/project-details-resolver.component';
import { DatabaseService } from './shared/database.service';
import { DialogService } from './shared/dialog.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';
import { ThemeService } from './shared/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, NgxTurnstileModule, NgxTurnstileFormsModule),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation()
    ),
    Title,
    ProjectsResolver,
    ProjectDetailResolver,
    DatabaseService,
    DialogService,
    CanDeactivateGuard,
    ThemeService,
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ]
};
