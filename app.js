var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'aurora.cqiybs4tphyt.us-west-2.rds.amazonaws.com',
  user     : 'master',
  password : '12345678'
});

connection.query('USE javabase');

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  connection.query('SELECT * FROM users', function(err, rows){
    res.render('users', {users : rows});
  });
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
