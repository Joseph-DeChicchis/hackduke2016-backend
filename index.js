'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');
const coinbase = require('coinbase');
const app = express();

var sessions = {};	// store session information
var citiesArray = [];

app.set('port', (process.env.PORT || 5000));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// index
/*
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot');
});*/

// for facebook verification
/*
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'joseph') {
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong token');
});
*/
// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));

	//size, languages, roles, platforms, locations
	//company_search.findCompanies("large",["java", "python", "c++"],["SE"],["mobile"],["mountain view, new york, seattle"]);
});

// api code

/*app.get("/api", function(request, response, next) {
		response.json({ message: 'hooray! welcome to our api!' });
		//var user_id = req.bodyParser.id;
    //var token = req.body.token;
    //var geo = req.body.geo;
		console.log(request.query("greeting"));
		console.log(request.bodyParser.greeting);
});*/

app.post('/api/', function (req, res) {
  console.log("api call recieved");
	//let messaging_events = req.body.entry[0].messaging;
	var user_preferences = req.body;
	console.log(user_preferences);
	var companies = company_search.findCompanies(user_preferences["size"],user_preferences["languages"],user_preferences["roles"],user_preferences["platforms"],user_preferences["locations"],user_preferences["fields"]);
	var results = {
		"company1" : [companies[0][0],companies[0][2]],
		"company2" : [companies[1][0],companies[1][2]],
		"company3" : [companies[2][0],companies[2][2]],
		"company4" : [companies[3][0],companies[3][2]],
		"company5" : [companies[4][0],companies[4][2]]
	}
	var array = JSON.stringify(results);
	res.send({redirect: '/results?data=' + encodeURIComponent(array)});
});

// static website code

app.get("/sendMoney/", function(request, response, next) {
    console.log("send money")
		var color = request.param('color');
		console.log(color);
    response.json({"hellp" : "world"})
});

app.get("/*", function(request, response, next) {
    console.log("404 not found")
    response.sendFile(__dirname + '/public/404.html')
});
