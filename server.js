/*
console.log('vwallajabad')
*/
var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res){
	var query = url.parse(req.url, true);
	var filename = '.' + query.pathname;
	if(filename == './'){filename = './home';}

	filename = filename + '.html';
	fs.readFile(filename, function(err, data){

		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end('404 Page Not Found Error');
		}

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();

	});
}).listen(8080);

console.log('Hey, vwallajabad the website is up and running!');
