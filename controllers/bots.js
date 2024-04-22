const express = require("express");
const router = express.Router();
const rgx = '(account|cart|search|wpm.+|v1|comments?|pages|collections|saved_resource|cdn-cgi)'

module.exports = router;

// These routes come from Google's Search Console traffic that's invalid.
router.get(/\/(account|cart|search|wpm|v1|comments?|pages|collections|saved_resource|cdn-cgi)/, (req, res) => {
	res.status(404).end()
})
