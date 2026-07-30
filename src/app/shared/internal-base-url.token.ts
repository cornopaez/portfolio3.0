import { InjectionToken } from '@angular/core';

/**
 * Absolute base URL DatabaseService should use for its SSR-side HTTP
 * requests. Provided per-request in controllers/home.ts, pointed at the
 * Express server's own loopback address so SSR resolvers don't have to
 * round-trip through Cloudflare to reach their own /data API (todo.md
 * item 19 -- that round trip gets blocked by Cloudflare's bot challenge).
 * Never provided in the browser, so DatabaseService falls back to a
 * same-origin relative path there.
 */
export const INTERNAL_BASE_URL = new InjectionToken<string>('INTERNAL_BASE_URL');
