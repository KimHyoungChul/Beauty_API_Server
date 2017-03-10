const message = require('../message');
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    user : 'root',
    password : '159753', 
    database : 'BeautyProject', 
    host : '13.112.190.217'
});

router.get('/', function(req, res, next) {
	connection.query('select * from brand;', function (error, cursor) {
		if (error) res.status(message.code(11)).json(message.json(11));
		
		if (cursor.length > 0) {
			res.status(message.code(0)).json(cursor);
		} else res.status(message.code(2)).json(message.json(2));
    });
});

router.get('/images/:filename', function(req, res) {
    var filename = req.params.filename;
    var img = fs.readFileSync('./public/images/brand/' + filename);
    res.writeHead(200, {'Content-Type': 'image/gif'});
    res.end(img, 'binary');
});

module.exports = router;
