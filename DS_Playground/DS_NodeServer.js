var http = require('http');
var nodeTools = require('./DS_Node');
var url = require("url");
var mysql = require("mysql");
var login = require('../logindata')

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    console.log("TEST");
    var connection = mysql.createConnection(
        {
            host: "www.onlyentertainment.de",
            port: 3306,
            user: login.user,
            password: login.password,
            database: login.database
        }
    );

    connection.connect();

    console.log("Connected to " + connection.config.host + " --> " + connection.config.database);

    var resultSet;
    connection.query("SELECT * FROM DummyTable;",
        function (err, result, fields) {
            if (err) throw err;

            console.log(String(result[0]));
            // response.write(String(result[0].Name));
            // response.write(result);
            
        }
    )
connection.ExecuteQuery(err,resultSet);
    console.log(resultSet.result);
response.write(resultSet.result[0].Name);
    
connection.end();



    // con.connect(function(err)
    // {
    //     if (err) {throw err;}
    //     console.log("Connected");
    // });



    // response.writeHead(200,{'Content-Type':'text/html'});
    // response.write("The current DateTime is "+ nodeTools.GetCurrentDateTime()+"<br>");
    // response.write(request.url+"<br>");
    // var query = url.parse(request.url,true).query; ///?year=2017&month=July
    // response.write(query.year + " - "+query.month+"<br>");
    // response.end("Hello World!");



    // response.end("Test");
    response.end();

}
).listen(8080);



function ConnectToMySQL(connection, err) {
    if (err) { throw err; }

    connection.query("SELECT * FROM DummyTable;", ExecuteQuery())
    console.log("Connected");

}

function ExecuteQuery(err, result, fields) {
    if (err) throw err;

    console.log(result);

}
