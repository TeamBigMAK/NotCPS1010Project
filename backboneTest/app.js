<<<<<<< HEAD
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    cors = require('cors')
    app = express();

// Connect to DB STRING
var connectionString = "postgres://projBB:123456@localhost:5432/poldb";

// Enable cors
app.all('/test/:file', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Allowing Access");
    next()
});

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Allowing Access on Root");
    next()
});

// Assign dust engine to dust file
app.engine('dust', cons.dust);
=======
var express = require("express");
var bodyParser = require("body-parser");
var pg = require("pg");
var app = express();

var 23;

const pool = new pg.Pool({
user: 'testUser',
host: 'localhost',
database: 'testDB',
password: 'passw',
port: 5432,
});
>>>>>>> 57e227b6923a1693870cb41687d5e94f8df574c6


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

app.get("/questions",function(req,res){
  pool.query('SELECT * FROM test.questions',
function(err,result){
  if(err)console.log(err);
  var questions = result.rows;
  res.render("ques",{questions: questions});
    })
});

<<<<<<< HEAD
app.get('/test/:file', function(req,res, next){
    console.log("YO FAM WELCOME TO TEST");

    var directory = {
        root: __dirname + '/public'

    }

    var fName = req.params.file;
    res.sendFile(fName, directory, function(err){
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fName);
        }
    });
});

=======
app.post("/addQues",function(req,res){
  var newQuestion = req.body.newQues;
  pool.query('INSERT INTO test.questions(qname) VALUES ($1)',[newQuestion],
  function(err,result){
  if(err)console.log(err);
  res.redirect("/questions");
  })
});
>>>>>>> 57e227b6923a1693870cb41687d5e94f8df574c6

app.listen(3000,process.env.IP,function(){
  console.log("Server is listening on port 3000!");
});
