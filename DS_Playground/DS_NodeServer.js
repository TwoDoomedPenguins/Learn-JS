var http = require('http');
var mysql = require("mysql");

var url = require("url");

var login = require('../logindata')
var nodeTools = require('./DS_Node');

http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    console.log("TEST");
    var connection = mysql.createConnection({
        host: "www.onlyentertainment.de",
        port: 3306,
        user: login.user,
        password: login.password,
        database: login.database
    });

    connection.connect(function (err) {
        if (err) throw err;
        else {
            // console.log("Connected to " + connection.config.host + " --> " + connection.config.database);

            if (connection.state === "disconnected") {
                console.log("DISCONNECTED");
            } else {
                TestQuery(connection);
                connection.end();
            }

        }
    });

    console.log("TEST3 - " + connection.state);

    console.log("TEST4");


    // response.end("Test");
    response.end();

}).listen(8080);


//8081 Server Simple Login Request
http.createServer(function (request, response) {

    console.log(request.method);

    var headers = {};

    // set header to handle the CORS
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Cache-Control, Origin, Content-Length, Authorization, Accept, X-Requested-With';
    headers['Access-Contrl-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS';
    headers["Access-Control-Max-Age"] = '86400';
    response.writeHead(200, headers);

    if (request.method === 'OPTIONS') {
        console.log('OPTIONS SUCCESSFUL CONVERTED');
        // response.statusCode = 99;
    } else if (request.method === 'POST') {
        console.log("Bin im Post");
        let getBodyTask = new Promise(function (SUCCESS, ERROR) {
            let bodyString = "";
            let requestBody;

            request.on('data', function (bodyData) {
                bodyString += bodyData;
                console.log(bodyString);
            })

            request.on('end', function () {
                 console.log(bodyString);
                requestBody = JSON.parse(bodyString);
                //console.log(requestBody);
                SUCCESS(requestBody);
            })
        });

        console.log(getBodyTask);
        getBodyTask.then(function (value) {
            console.log(value.userName);
            response.statusCode = 99999;
            response.statusMessage = "PASST SCHO";
            response.end("Jo hat geklappt");
            

        })
        // console.log(request);
        // console.log(response);

        // console.log(requestBody);
        // console.log("Username = " + requestBody.userName);
        // console.log("Password = " + requestBody.password);
    } else {
        response.statusCode = 99;
    }

    console.log("Habe ich erhalten");
}).listen(8081);

function TestQuery(connection) {
    var resultSet;
    connection.query("SELECT * FROM DummyTable;",
        function (err, result, fields) {
            if (err) throw err;

            console.log(String(result[0].Name));
            console.log(String(result[0].ID));

            // response.write(String(result[0].Name));
            // response.write(result);

        }
    )
}

function ConnectToMySQL(connection, err) {
    if (err) {
        throw err;
    }

    connection.query("SELECT * FROM DummyTable;", ExecuteQuery())
    console.log("Connected");

}

function ExecuteQuery(err, result, fields) {
    if (err) throw err;

    console.log(result);

}