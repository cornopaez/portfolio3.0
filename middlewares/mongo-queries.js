// const express = require("express");
const connection = require("./mongo-connection.js");

module.exports = {
	getProjectView : getProjectView,
	getProjectsCards: getProjectsCards,
	postContactRequest: postContactRequest
}

function getProjectView(projectName) {

	return new Promise((resolve, reject) => {
		var db = connection.getDb();
		var query = {'project_name' : projectName};

		db.collection('projects').findOne(query).then(data =>{
			resolve(data)
		})
		.catch(error =>{
			console.log(error)
			reject(error)
		})
	})
}

function getProjectsCards() {
	return new Promise((resolve, reject) => {
		var db = connection.getDb()
		var query = {}
		var projection = {
			'_id': 0,
			'card': 1,
			'project_name': 1
		}
		var sort = {'lastUpdate':-1}
		var cursor = db.collection('projects').find().sort(sort).project(projection)

		cursor.toArray()
			.then(docs => {
				if (docs === null || docs === undefined) {
					// res.redirect("/error");
					reject('Meine Damen und Herren, dieser Inhalt ist verboten')
				} else {
					resolve(docs)
				}
			})
			.catch(error => reject(error))
	})
}

function postContactRequest(info) {
	return new Promise((resolve, reject) => {
		var db = connection.getDb()
		var query = {
			"name": info.name,
			"email": info.email,
			"text": info.message,
			"urgent": info.urgent,
			"date": Date()
		}

		db.collection('requests').insertOne(query)
			.then(response => resolve(response))
			.catch(error => reject(error))
	})
}