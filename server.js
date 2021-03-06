const express = require('express')
const app = express()
const connection = require("./middlewares/mongo-connection.js");
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require("./controllers/routes.js");
const data = require("./controllers/data.js");
const DIST_FOLDER = process.cwd() + '/dist/portfolio3';

// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));

// Start MongoDB connection
connection.connect()
	.then((response) => {
		// console.log("I'm booted and connected. Moving on...");
	})
	.catch((data) => {
		console.log("Cannot conntect to db. Exiting program: " + data);
		process.exit(1);
	});

// Use Helmet for security
app.use(helmet());

// 
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Static files
app.use(express.static(DIST_FOLDER))

// Routes for getting and posting data in the site
app.use('/data', data)

// Main router -- ****OTHER ROUTERS NEED TO BE ABOVE THIS LINE!!!!******
app.use("/", routes);

const port = process.env.PORT? process.env.PORT : 3000

app.listen(port, () => console.log('Portfolio 3.0 up and running on port ' + port))