var http = require('http');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '060510shiba',
  database : 'blog'
});

connection.connect();

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.writeHead(200, {'Content-Type': 'application/json'});
    console.log(req);
    url = req.url.split("?")[0];
    if (url == '/blog') {
        connection.query('SELECT * FROM `nikki`', function (error, results, fields) {
            console.log(results);
            res.end(JSON.stringify(results));
        });
    } else if (url == '/blog/detail') {
        id = req.url.split("?")[1].split('=')[1]
        connection.query('SELECT * FROM `nikki` where id = ' + id , function (error, results, fields) {
            console.log(results);
            res.end(JSON.stringify(results));
        });
    } else if (url == '/blog/delete') {
        id = req.url.split("?")[1].split('=')[1]
        console.log("delete");
        connection.query('DELETE FROM `nikki` where id = ' + id , function (error, results, fields) {
            console.log(results);
            res.end(JSON.stringify(results));
        });
    } else {
        console.log("hello");
    }
}).listen(1337, '127.0.0.1');
