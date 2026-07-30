import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * Explicit choices are persisted to localStorage and applied via a
 * data-theme attribute on <html> (see theme-init.js, which re-applies a
 * saved choice before first paint on every load). Until the user makes a
 * choice, theme.sass's prefers-color-scheme media query drives the
 * default -- this service only takes over once toggle() is first called.
 */
@Injectable()
export class ThemeService {
  private platformId = inject<object>(PLATFORM_ID);

  getCurrentTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      // Doesn't affect what's actually shown: theme-init.js and the
      // prefers-color-scheme media query resolve the real theme
      // client-side before this service is ever consulted.
      return 'light';
    }

    const explicit = document.documentElement.getAttribute('data-theme');
    if (explicit === 'dark' || explicit === 'light') {
      return explicit;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  toggle(): Theme {
    const next: Theme = this.getCurrentTheme() === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage can throw in some privacy modes -- the attribute
      // above still applies for the rest of this session.
    }

    return next;
  }
}
