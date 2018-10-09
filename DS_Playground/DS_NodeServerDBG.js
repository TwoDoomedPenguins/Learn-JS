var http = require('http');
var url = require("url");

http.createServer(function (request, response) {

    response.writeHead(200, { 'Content-Type': 'text/html' });

    console.log("TEST");

    response.end("Test");

}
).listen(8080);

