var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var db = require('./config')

var connection = mysql.createConnection({
   host     : db.host,
   user     : db.user,
   password : db.password
});

connection.query('USE javabase');

app.set('port', process.env.NODE_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
   connection.query('SELECT * FROM services', function(err, rows){
      if(err) return res.json({error: err});
     res.json({users : rows});
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
   connection.query('INSERT INTO services (name, password, email, description, price) VALUES ("' + user_name + '","' + password + '","' + email + '","' + desc + '","' + price + '")', function(err, rows) {
      if (err) return console.log(err);
      res.send('done');
   });
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
