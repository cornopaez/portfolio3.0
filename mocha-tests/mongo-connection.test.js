const assert = require('assert').strict
const connection = require('../middlewares/mongo-connection.js')
const expect = require('expect.js')
const _ = require('lodash')

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
})