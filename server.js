var http = require('http');
var port = 8834;

var messages = [];

var onRequest = function(req, res) {

	if (req.method === 'GET') {
		res.writeHead(200, {
			'Connection': 'close',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		});
		res.end(JSON.stringify(messages));
	}

	if (req.method === 'POST') {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk.toString();
		});
		req.on('end', function() {
			console.log("Got POST data: ");
			console.log(JSON.parse(postData));
			message = JSON.parse(postData);
			timestamp = new Date();
			messages.push({'text': message.text,
							'name': message.name,
						'created': timestamp});

			res.writeHead(200, {
				'Connection': 'close',
				'Content-Type': 'text/html',
				'Access-Control-Allow-Origin': '*'
			});
			res.end(JSON.stringify(messages));

		});


	}

	if (req.method === 'OPTIONS') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' 
		})
		res.end();
	}

}


http.createServer(onRequest).listen(port);
console.log('Listening on port: ' + port);