var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    cors = require('cors')
    app = express();

var qst, ans;

// Connect to DB STRING
var connectionString = "postgres://BigMAK:123456@localhost:5432/politikapp";

// Enable cors for qst
app.all('/qst', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Allowing Access on QST");
    next()
});

// Enable cors for ans
app.all('/ans', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Allowing Access on ANS");
    next()
});

// Enable cors for root
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Allowing Access on Root");
    next()
});

// Assign dust engine to dust file
app.engine('dust', cons.dust);

// Set dust as default extension
app.set('view engine', 'dust');
app.set('views', __dirname + "/views");

// Set pool
const pool = new pg.Pool({
user: 'BigMAK',
host: 'localhost',
database: 'politikapp',
password: 'urmumlul',
port: 5432,
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
var urlencodedParser = bodyParser.urlencoded({ extended: false});

// Get Questions
app.get("/qst",function(req,res){

    return res.json(qst);
});

// Get Answers
app.get("/ans",function(req,res){
    return res.json(ans);
});

// Get root
app.get("/",function(req,res){
  //Query the database for questions
  pool.query('SELECT * FROM qst ORDER BY qid;',
  function(err,result){
    //if error
    if(err)console.log("911 ERROR ERROR HOLY QST: " + err);
    //otherwise
    qst = result.rows;
    console.log(qst);
  });

  //Query the database for answers
  pool.query('SELECT * FROM ans GROUP BY qid, aid ORDER BY aid;',
  function(err,result){
    //if error
    if(err)console.log("112 ERROR ERROR HOLY ANS: " + err);
    //otherwise
    ans = result.rows;
    console.log(ans);
  });

  res.render('index');
  console.log("root working");
});

app.listen(3030,function(){
  console.log("Server started on port 3030!");
});
