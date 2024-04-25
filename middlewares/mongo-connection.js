// Declare module vars
var _db = null;

// Import things needed
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

// Populate the env variables
config();

// Get the url for the mongodb connection
const uri = process.env.MONGOLAB_COPPER_URI ? process.env.MONGOLAB_COPPER_URI : process.env.MONGODB_LOCAL

// Creates a connection to MongoDB and returns the db object.
export async function connect(log = true) {

	const options = {
		useUnifiedTopology: true
	};

	try {
		const client = new MongoClient(uri);
		_db = client.db();
		console.log('Connected to db.')
	} catch(err) {
		console.log(err)
	}

};

// Gets the db object created by MongoClient.connect()
export function getDb() {
	return _db;
}