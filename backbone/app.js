var express = require("express");
var bodyParser = require("body-parser");
var pg = require("pg");
var app = express();

const pool = new pg.Pool({
user: 'testUser',
host: 'localhost',
database: 'testDB',
password: 'passw',
port: 5432,
});


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

app.post("/addQues",function(req,res){
  var newQuestion = req.body.newQues;
  pool.query('INSERT INTO test.questions(qname) VALUES ($1)',[newQuestion],
  function(err,result){
  if(err)console.log(err);
  res.redirect("/questions");
  })
});

app.listen(3000,process.env.IP,function(){
  console.log("Server is listening on port 3000!");
});
