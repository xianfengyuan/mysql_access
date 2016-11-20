var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var db = require(path.join(__dirname, 'config.json'))

var connection = mysql.createConnection({
   host     : db.host,
   user     : db.user,
   password : db.password
});

connection.query('USE javabase');

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  connection.query('SELECT * FROM services', function(err, rows){
    res.render('users', {users : rows});
  });
});
app.get('/register', function(req, res){
   res.sendFile(path.join(__dirname+'/public/register.html'));
});

app.post('/login',function(req,res){
   var user_name=req.body.user;
   var password=req.body.password;
   var email=req.body.email;
   var desc=req.body.desc;
   var price=req.body.price;
   
   console.log("User name = "+user_name+", password is "+password);
   connection.query('INSERT INTO services VALUES (5, ' + user_name + ',' + password + ',' + email + ',' + desc + ',' + price + ')', function(err, rows) {
      res.send('done');
   });
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
