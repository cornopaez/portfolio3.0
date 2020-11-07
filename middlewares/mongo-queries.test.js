const queryDb = require('./mongo-queries.js')
const assert = require('assert').strict
const connection = require('./mongo-connection.js')
const expect = require('expect.js')

describe('MongoDB query',(done)=>{
  // Setup the db connection before the tests
  before((done) =>{
    connection.connect().then(data =>{
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

  it('should get a project view details', (done)=>{
    queryDb.getProjectView('Portfolio3.0').then(data=>{
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
  
  done()
})