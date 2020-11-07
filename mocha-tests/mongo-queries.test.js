const queryDb = require('../middlewares/mongo-queries.js')
const assert = require('assert').strict
const connection = require('../middlewares/mongo-connection.js')
const expect = require('expect.js')
const _ = require('lodash')
const { ObjectId } = require('mongoDb')
const rs = require('randomstring')

describe('MongoDB queries',(done)=>{
  // Setup the db connection before the tests
  before((done) =>{
    const log = false
    connection.connect(log).then(data =>{
      done()
    })
  })

  it('should get a project view details', (done)=>{
    queryDb.getProjectView('Portfolio3.0').then(data=>{
      expect(data.length).to.be.greaterThan(0)
      done()
    })
  })

  // Get the project cards
  it('should get the project cards', (done)=>{
    queryDb.getProjectsCards().then(data =>{
      expect(data.length).to.be.greaterThan(0)
      done()
    })
  })

  it('should not return information for a project it doesn\'t exist', (done)=>{
    queryDb.getProjectView('notarealproject').then(data=>{
      expect(data.length).to.be(0)
      done()
    })
  })

  it('should post a contact request to the db', async ()=>{

    // Create dummy payload
    const info = {
      name: rs.generate(50),
      email: rs.generate(50),
      message: rs.generate(200),
      urgent: Math.random() < 0.5
    }

    // Get mongo db object to perform calls
    const db = connection.getDb()

    // Insert message to db and catch if anything does wrong
    const insertResponse = await queryDb.postContactRequest(info).catch(error =>{
      console.log(error)
      done()
    })

    // Retrieve the inserted message
    const findResponse = await db.collection('requests').findOne({'_id':ObjectId(insertResponse.insertedId)})

    // Conpare the values
    expect(findResponse.name).to.equal(info.name)
    expect(findResponse.email).to.equal(info.email)
    expect(findResponse.text).to.equal(info.message)
    expect(findResponse.urgent).to.equal(info.urgent)

  })
})