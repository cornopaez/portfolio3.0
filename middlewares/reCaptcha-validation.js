module.exports = {
	validate: validate
}

function validate(req) {
	return fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			secret: process.env.TURNSTILE_SECRET_KEY,
			response: req.body.recaptcha
		})
	}).then(response => response.json());
}