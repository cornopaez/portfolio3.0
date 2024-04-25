import { getDb } from './mongo-connection.js';

export function getProjectView(projectName) {

	return new Promise((resolve, reject) => {
		const db = getDb();
		const query = {'project_name' : projectName};

		db.collection('projects').findOne(query).then(data =>{
			resolve(data)
		})
		.catch(error =>{
			console.log(error)
			reject(error)
		})
	})
}

export function getProjectsCards() {
	return new Promise((resolve, reject) => {
		const db = getDb()
		const query = {}
		const projection = {
			'_id': 0,
			'card': 1,
			'project_name': 1
		}
		const sort = {'lastUpdate':-1}

		db.collection('projects').find().sort(sort).project(projection).toArray().then(result => {
			if (result !== null || result !== undefined) {
				resolve(result)
			}
		})
		.catch(error => {
			console.log(error)
			reject('Meine Damen und Herren, dieser Inhalt ist verboten')
		})
	})
}

export function postContactRequest(info) {
	return new Promise((resolve, reject) => {
		const db = getDb()
		const query = {
			"name": info.name,
			"email": info.email,
			"text": info.message,
			"urgent": info.urgent,
			"date": Date()
		}

		db.collection('requests').insertOne(query).then(result =>{
			resolve(response)
		})
		.catch(error =>{
			reject(error)
		})

		// var cursor = db.collection('requests').insertOne(query, (error, response) => {
		// 	if (error) {
		// 		reject(error)
		// 	} else {
		// 		resolve(response)
		// 	}
		// })
	})
}