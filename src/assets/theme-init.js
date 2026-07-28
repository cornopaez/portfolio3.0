// Applies a saved theme preference before first paint, so there's no
// flash of the wrong theme. Runs as an early, synchronous, same-origin
// <script src> (not an inline block) because the site's CSP locks
// script-src down to 'self' plus a specific allowlist -- no
// 'unsafe-inline'. Kept deliberately tiny and dependency-free since it
// has to run before Angular (and everything else) loads.
(function () {
	try {
		var stored = localStorage.getItem('theme');
		if (stored === 'dark' || stored === 'light') {
			document.documentElement.setAttribute('data-theme', stored);
		}
	} catch (e) {
		// localStorage can throw in some privacy modes -- fall back to the
		// prefers-color-scheme CSS media query, no explicit attribute set.
	}
})();
