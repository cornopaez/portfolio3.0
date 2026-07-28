const { MongoClient } = require('mongodb')
const connection = require('../middlewares/mongo-connection.js')
const expect = require('expect.js')

describe('MongoDB connection functions', (done)=>{
  it('should connect to the db successfully', (done) =>{
    const log = false
    connection.connect(log).then(status =>{
      expect(status).to.be(true)
      done()
    })
  })

  it('should return a db object when needed', (done)=>{
    const log = false
    connection.connect(log).then(status =>{
      const db = connection.getDb()
      expect(db).to.not.be(null)
      done()
    })
  })

  it('should reject cleanly (not throw) when the connection fails', async ()=>{
    // Regression test for a bug where connect() called reject(false) on
    // error but didn't return, falling through to code that dereferenced
    // the undefined `db` and threw a TypeError instead of rejecting.
    const originalConnect = MongoClient.connect
    MongoClient.connect = () => Promise.reject(new Error('simulated connection failure'))

    let caught = null
    try {
      await connection.connect(false)
    } catch (err) {
      caught = err
    } finally {
      MongoClient.connect = originalConnect
    }

    expect(caught).to.be(false)
  })
})
