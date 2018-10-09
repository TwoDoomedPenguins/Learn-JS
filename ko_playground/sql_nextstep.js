// var http = require('http')
var express = require('express');
var mysql = require('mysql');
var login = require('../logindata');

// startet den Server
var app = express();

// sagt dem Server das HTML Seiten mit ejs-engine generiert werden sollen (ist ein Modul)
app.set('view engine', 'ejs')

// mySQL Configs werden gesetzt
var connection = mysql.createConnection(
    {
        host: 'www.onlyentertainment.de',
        user: login.user,
        password: login.password,
        database: login.database
    }
)
    
// Verbindung mit der mySQL Datenbank wird hergestellt
connection.connect((err) => {
    if (!!err) {
        console.log(err);
    } else {
        console.log('connected as '+ connection.config.user + " @ " + connection.config.host);
    }
})

// wenn der User auf die genaue URL (127.0.0.1:8080<hier unteren String>) zugreift, wird diese Funktion ausgelöst
app.get('/', (request, response) => {
    // mehr zum Thema Promises (gehört zu JS!) --> https://www.youtube.com/watch?v=yswb4SkDoj0
    var versprechen = new Promise((SUCCESS, error)=>{
        connection.query("SELECT * FROM DummyTable;", function (err, results, fields) {
            if (err) throw err;
            SUCCESS(results);
        });
        
    });
    // sobald in Zeile 37 die Variable SUCCESS gefüllt ist, wird .then ausgeführt
    // von hier aus kann man dann die Daten mit denen man arbeiten will, weiterverwursten
    versprechen.then((value) =>{
        aussenFunktion(value, response);
    })
})

// auf welchem Port die App hört
app.listen(8080)

// diese Funktion wird im .then ausgeführt
function aussenFunktion(sqlData, response) {
    console.log(sqlData[0].Name)

    // zur besseren Benutzung führe ich hier alle Namen der DB in eine Liste
    var ausgabe = [];
    for(item of sqlData) {
        ausgabe.push(item.Name);
    }
    
    // hier wird mit dem render() Befehl auf die ViewEngine hingewiesen
    // sql -> ist ein so genanntes View und liegt im entsprechenden Unterordner
    // {haustiernamen: ausgabe}
    // haustiernamen <- liegt als Variable in der sql.ejs im Views Ordner
    // mit der {...} Anweisung wird quasi haustiername = ausgabe ausgeführt und schick im Fenster ausgegeben
    response.render('sql', {haustiername: ausgabe})
}