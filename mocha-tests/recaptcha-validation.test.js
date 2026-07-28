// Integration test: hits the real Cloudflare Turnstile siteverify endpoint,
// using Cloudflare's publicly documented dummy secret keys reserved for
// exactly this purpose (server-side testing without a live widget/token):
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/
//   1x0000000000000000000000000000000AA - always passes
//   2x0000000000000000000000000000000AA - always fails
// Requires network access to challenges.cloudflare.com, same category as
// the mongo-*.test.js files requiring a live MongoDB connection.

const validation = require('../middlewares/reCaptcha-validation.js')
const expect = require('expect.js')

const ALWAYS_PASSES_SECRET = '1x0000000000000000000000000000000AA'
const ALWAYS_FAILS_SECRET = '2x0000000000000000000000000000000AA'

describe('middlewares/reCaptcha-validation.js', () => {
  let originalSecret

  beforeEach(() => {
    originalSecret = process.env.TURNSTILE_SECRET_KEY
  })

  afterEach(() => {
    process.env.TURNSTILE_SECRET_KEY = originalSecret
  })

  it('resolves with success: true for a passing token', async () => {
    process.env.TURNSTILE_SECRET_KEY = ALWAYS_PASSES_SECRET
    const req = { body: { recaptcha: 'any-token-works-with-the-dummy-secret' } }

    const body = await validation.validate(req)

    expect(body.success).to.be(true)
  })

  it('resolves with success: false for a failing token', async () => {
    process.env.TURNSTILE_SECRET_KEY = ALWAYS_FAILS_SECRET
    const req = { body: { recaptcha: 'any-token-works-with-the-dummy-secret' } }

    const body = await validation.validate(req)

    expect(body.success).to.be(false)
  })
})
