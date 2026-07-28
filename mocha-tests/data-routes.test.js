// Unlike the other mocha-tests files, this one is a fast, isolated test of
// controllers/data.js's routing/error-handling logic: it mocks
// middlewares/mongo-queries.js and middlewares/reCaptcha-validation.js
// (relying on Node's module cache so the mocks reach the same instances
// controllers/data.js requires) so it needs neither a live MongoDB
// connection nor a real call to Cloudflare's Turnstile endpoint.

const express = require('express')
const request = require('supertest')
const expect = require('expect.js')

const queryDb = require('../middlewares/mongo-queries.js')
const validation = require('../middlewares/reCaptcha-validation.js')

function buildApp() {
  const app = express()
  app.use(express.json())
  app.use('/data', require('../controllers/data.js'))
  return app
}

describe('controllers/data.js routes', () => {
  let originalPostContactRequest, originalGetProjectsCards, originalGetProjectView, originalValidate

  beforeEach(() => {
    originalPostContactRequest = queryDb.postContactRequest
    originalGetProjectsCards = queryDb.getProjectsCards
    originalGetProjectView = queryDb.getProjectView
    originalValidate = validation.validate
  })

  afterEach(() => {
    queryDb.postContactRequest = originalPostContactRequest
    queryDb.getProjectsCards = originalGetProjectsCards
    queryDb.getProjectView = originalGetProjectView
    validation.validate = originalValidate
  })

  describe('POST /data/contact', () => {
    it('saves the request and returns 200 when reCaptcha passes and the db write succeeds', async () => {
      validation.validate = async () => ({ success: true })
      queryDb.postContactRequest = async () => ({ insertedId: 'abc123' })

      const res = await request(buildApp())
        .post('/data/contact')
        .send({ name: 'Test', email: 'test@example.com', message: 'hi', recaptcha: 'token' })

      expect(res.status).to.be(200)
      expect(res.body.insertedId).to.be('abc123')
    })

    it('returns 500 when reCaptcha passes but the db write fails (regression: used to hang, no response sent)', async () => {
      validation.validate = async () => ({ success: true })
      queryDb.postContactRequest = async () => { throw new Error('simulated db failure') }

      const res = await request(buildApp())
        .post('/data/contact')
        .send({ name: 'Test', email: 'test@example.com', message: 'hi', recaptcha: 'token' })

      expect(res.status).to.be(500)
      expect(res.body.error).to.be.ok()
    })

    it('returns 400 when reCaptcha validation fails (regression: used to res.redirect, a no-op on an XHR-only endpoint)', async () => {
      validation.validate = async () => ({ success: false })

      const res = await request(buildApp())
        .post('/data/contact')
        .send({ name: 'Test', email: 'test@example.com', message: 'hi', recaptcha: 'bad-token' })

      expect(res.status).to.be(400)
      expect(res.body.error).to.be.ok()
    })

    it('returns 502 when the reCaptcha validation call itself fails (regression: used to hang, no .catch existed)', async () => {
      validation.validate = async () => { throw new Error('simulated network failure calling Cloudflare') }

      const res = await request(buildApp())
        .post('/data/contact')
        .send({ name: 'Test', email: 'test@example.com', message: 'hi', recaptcha: 'token' })

      expect(res.status).to.be(502)
      expect(res.body.error).to.be.ok()
    })
  })

  describe('GET /data/projects', () => {
    it('returns 200 with the project cards on success', async () => {
      queryDb.getProjectsCards = async () => ([{ project_name: 'Portfolio3.0' }])

      const res = await request(buildApp()).get('/data/projects')

      expect(res.status).to.be(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].project_name).to.be('Portfolio3.0')
    })

    it('returns 500 on failure (regression: used to hang, no response sent)', async () => {
      queryDb.getProjectsCards = async () => { throw new Error('simulated db failure') }

      const res = await request(buildApp()).get('/data/projects')

      expect(res.status).to.be(500)
      expect(res.body.error).to.be.ok()
    })
  })

  describe('GET /data/:name', () => {
    it('returns 200 with the project details on success', async () => {
      queryDb.getProjectView = async (name) => ({ project_name: name })

      const res = await request(buildApp()).get('/data/Portfolio3.0')

      expect(res.status).to.be(200)
      expect(res.body.project_name).to.be('Portfolio3.0')
    })

    it('returns 500 on failure (regression: used to hang, no response sent)', async () => {
      queryDb.getProjectView = async () => { throw new Error('simulated db failure') }

      const res = await request(buildApp()).get('/data/notarealproject')

      expect(res.status).to.be(500)
      expect(res.body.error).to.be.ok()
    })
  })
})
