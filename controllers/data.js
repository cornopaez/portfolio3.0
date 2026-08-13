const express = require("express");
const router = express.Router();
const dotenv = require('dotenv').config({ quiet: true });
const queryDb = require('../middlewares/mongo-queries.js')
const validation = require('../middlewares/reCaptcha-validation.js')

module.exports = router;

router.post('/contact', (req, res) => {
	// Perform recaptcha validation
	validation.validate(req)
	.then((body) => {
		// If validation was successful, continue on
		if (body.success) {
			queryDb.postContactRequest(req.body)
			.then(success => {
				res.json(success)
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({ error: "Failed to save contact request." })
			})
		} else {
			// Reject with an error status if reCaptcha validation failed.
			// This endpoint is only ever called via XHR, so a redirect wouldn't navigate the browser.
			console.log("reCaptcha validation failed. There was an error.")
			res.status(400).json({ error: "reCaptcha validation failed." });
		}
	})
	.catch((error) => {
		console.log(error)
		res.status(502).json({ error: "reCaptcha validation request failed." })
	});
})

router.get('/projects', (req, res) => {
	queryDb.getProjectsCards()
	.then((data) => {
		res.json(data)
	})
	.catch((error) => {
		console.log(error)
		res.status(500).json({ error: "Failed to fetch projects." })
	})

})

router.get('/:name', (req, res) => {

	var name = req.params.name;
	queryDb.getProjectView(name)
	.then((data) => {
		res.json(data)
	})
	.catch((error) => {
		console.log(error)
		res.status(500).json({ error: "Failed to fetch project." })
	})

})