// Helmet's HSTS header and the CSP's upgrade-insecure-requests directive
// both tell the browser to remember "always use HTTPS for this host" --
// HSTS for a year, cached by hostname regardless of port. That's correct
// for production (Heroku terminates TLS), but locally the dev/SSR servers
// are plain HTTP. A browser that picks up either signal once will then
// silently rewrite (and fail) every subsequent local request, including
// ones on a different port started later. Gate both behind isProduction.
function getHelmetOptions(isProduction) {
  return {
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          'https://code.jquery.com',
          'https://cdnjs.cloudflare.com',
          'https://stackpath.bootstrapcdn.com',
          'https://kit.fontawesome.com',
          'https://challenges.cloudflare.com',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://stackpath.bootstrapcdn.com',
          'https://*.fontawesome.com',
          'https://fonts.googleapis.com',
        ],
        // Bootstrap/jQuery/a third-party widget attach at least one inline
        // event-handler attribute (e.g. onclick=) at runtime -- this is a
        // separate, narrower allowance than scriptSrc itself, which stays
        // locked down to the specific origins above.
        scriptSrcAttr: ["'unsafe-inline'"],
        fontSrc: ["'self'", 'data:', 'https://*.fontawesome.com', 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://*.fontawesome.com'],
        connectSrc: ["'self'", 'https://challenges.cloudflare.com', 'https://*.fontawesome.com'],
        frameSrc: ["'self'", 'https://challenges.cloudflare.com'],
        ...(isProduction ? {} : { upgradeInsecureRequests: null }),
      },
    },
    hsts: isProduction,
  };
}

module.exports = { getHelmetOptions };
