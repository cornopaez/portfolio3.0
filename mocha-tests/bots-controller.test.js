// Ported from the second, divergent local checkout (todo.md item 10) --
// 404s known-junk crawler paths from bad Google Search Console traffic
// before they reach the SSR catch-all.

const express = require('express')
const request = require('supertest')
const expect = require('expect.js')

const bots = require('../controllers/bots.js')

function buildApp() {
  const app = express()
  app.use(bots)
  app.get('/{*splat}', (req, res) => res.status(200).send('ok'))
  return app
}

describe('controllers/bots.js', () => {
  const junkPaths = ['/account', '/cart/foo', '/search?q=x', '/wpmSomething', '/v1', '/comment', '/comments', '/pages/1', '/collections/all', '/saved_resource', '/cdn-cgi/l/email-protection']

  junkPaths.forEach((path) => {
    it(`404s ${path}`, async () => {
      const res = await request(buildApp()).get(path)

      expect(res.status).to.be(404)
    })
  })

  const realPaths = ['/', '/About', '/Projects', '/Musings/tls-for-local-lab']

  realPaths.forEach((path) => {
    it(`does not block ${path}`, async () => {
      const res = await request(buildApp()).get(path)

      expect(res.status).to.be(200)
    })
  })
})
