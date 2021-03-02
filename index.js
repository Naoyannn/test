var express = require('express'); // require Express
var router = express.Router(); // setup usage of the Express router engine

/* PostgreSQL and PostGIS module and connection setup */
const { Client, Query } = require('pg')



// Setup connection
var username = "postgres" // sandbox username
var password = "53320703" // read only privileges on our table
var host = "localhost:5433"
var database = "gisdb" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection

// Set up your database query to display GeoJSON
var data = "SELECT * FROM a26-10_27-g_sedimentdisasterhazardarea_surface";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', function (req, res) {
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(data));
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        res.send(result.rows[0].row_to_json);
        res.end();
    });
});

module.exports = router;