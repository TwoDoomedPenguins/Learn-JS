var http = require('http')
var mysql = require('mysql')
var login = require('../logindata')

var final;

http.createServer(function (req, res) {
    var con = mysql.createConnection(
        {
            host: 'www.onlyentertainment.de',
            user: login.user,
            password: login.password,
            database: login.database
        }
    )

    var versprechen = new Promise((SUCCESS, error) => {
        // erst wenn SUCCESS einen Wert bekommt (Zeile 26) dann wird .then ausgeführt (Zeile 31)
        con.connect(function (err) {
            if (err) throw err;

            console.log("Connected to " + con.config.host + " --> " + con.config.database);

            con.query("SELECT * FROM DummyTable;", function (err, results, fields) {
                if (err) throw err;
                SUCCESS(results);
            });
        });
    });

    versprechen.then((value) => {
        aussenFunktion(value, res);
    })


}).listen(8080)


function aussenFunktion(wert, res)
{
    console.log(wert[0].Name)

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(wert[0].Name)
}