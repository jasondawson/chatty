var express = require('express');
var bodyParser = require('body-parser');
var port = 8834;
var messages = [];
var app = express();
app.use(bodyParser());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	next();
})

app.get('/', function(req, res) {
	res.type('application/json');
	res.json(messages);
});

app.post('/', function(req, res) {
	timestamp = new Date();
	messages.push({'text': req.body.text,
	    			'name': req.body.name,
					'created': timestamp});
	res.json(messages);
})

app.listen(port);
console.log('Listening on port ' + port);