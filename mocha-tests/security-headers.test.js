// Regression coverage for a bug found testing dark mode in Safari: Helmet's
// HSTS header and CSP upgrade-insecure-requests directive both tell the
// browser "always use HTTPS for this host" -- correct once Heroku is
// terminating TLS in front of us, but locally the dev/SSR servers are plain
// HTTP, and a browser that picks up either signal once will then rewrite
// (and fail) every later local request, on any port, until that policy
// expires. See middlewares/security-headers.js.

const express = require('express')
const helmet = require('helmet')
const request = require('supertest')
const expect = require('expect.js')

const { getHelmetOptions } = require('../middlewares/security-headers.js')

function buildApp(isProduction) {
  const app = express()
  app.use(helmet(getHelmetOptions(isProduction)))
  app.get('/', (req, res) => res.send('ok'))
  return app
}

describe('middlewares/security-headers.js', () => {
  describe('non-production (local HTTP dev/testing)', () => {
    it('does not send Strict-Transport-Security (regression: broke all local HTTP testing in Safari)', async () => {
      const res = await request(buildApp(false)).get('/')

      expect(res.headers['strict-transport-security']).to.be(undefined)
    })

    it('does not send upgrade-insecure-requests in the CSP (regression: silently rewrote http:// asset requests to https://, which then failed with no TLS listener)', async () => {
      const res = await request(buildApp(false)).get('/')

      expect(res.headers['content-security-policy']).to.not.contain('upgrade-insecure-requests')
    })
  })

  describe('production', () => {
    it('sends Strict-Transport-Security', async () => {
      const res = await request(buildApp(true)).get('/')

      expect(res.headers['strict-transport-security']).to.be.ok()
    })

    it('sends upgrade-insecure-requests in the CSP', async () => {
      const res = await request(buildApp(true)).get('/')

      expect(res.headers['content-security-policy']).to.contain('upgrade-insecure-requests')
    })
  })
})
