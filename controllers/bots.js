const express = require("express");
const router = express.Router();

module.exports = router;

// Google Search Console has historically indexed a bunch of junk paths for
// this site that were never real routes (leftover from crawling other
// people's Shopify/CMS sites, apparently) -- 404 them outright instead of
// letting them fall through to the Angular SSR catch-all.
router.get(/\/(account|cart|search|wpm.+|v1|comments?|pages|collections|saved_resource|cdn-cgi)/, (req, res) => {
	res.status(404).end();
});
