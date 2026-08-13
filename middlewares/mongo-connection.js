const MongoClient = require('mongodb').MongoClient
var _db = null;
const dotenv = require('dotenv').config({ quiet: true });

module.exports =  {
	getDb: getDb,
	connect: connect
}

const url = process.env.MONGOLAB_COPPER_URI ? process.env.MONGOLAB_COPPER_URI : process.env.MONGODB_LOCAL

// Creates a connection to MongoDB and returns the db object.
async function connect(log = true) {
	try {
		const client = await MongoClient.connect(url);
		if (log) {
			console.log("Connected successfully to database")
		}
		// No args -> the database named in the connection string's path.
		_db = client.db()
		return true;
	} catch (err) {
		console.log(err)
		return Promise.reject(false)
	}
};

// Gets the db object created by MongoClient.connect()
function getDb() {
	return _db;
}