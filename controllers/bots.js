const express = require("express");
const router = express.Router();

module.exports = router;

// Google Search Console has historically indexed a bunch of junk paths for
// this site that were never real routes (leftover from crawling other
// people's Shopify/CMS sites, plus generic WordPress/config-file probing
// that hits every server on the internet regardless of what it actually
// runs) -- 404 them outright instead of letting them fall through to the
// Angular SSR catch-all.
router.get(/\/(account|cart|checkout|search|wpm.+|v1|comments?|pages|products?|collections?|saved_resource|cdn-cgi|shop|wp-admin|wp-login|wp-content|wp-includes|wp-json|xmlrpc\.php|phpmyadmin|pma|\.env|\.git|\.aws|feed)/, (req, res) => {
	res.status(404).end();
});
