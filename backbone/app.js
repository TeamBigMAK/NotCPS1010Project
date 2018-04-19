var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    cors = require('cors'),
    app = express();

var data;

// Connect to DB STRING
var connectionString = "postgres://projBB:123456@localhost:5432/poldb";

// Enable cors
app.all('/test/:file', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Allowing Access");
    next()
});

app.all('/data', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Allowing Access for data");
    next()
});

app.all('/update', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Content-Type", "application/json");
    console.log("Allowing Access for data");
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

// Set dust as default extension
app.set('view engine', 'dust');
app.set('views', __dirname + "/views");

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
var urlencodedParser = bodyParser.urlencoded({ extended: false});

// PG Connect
app.get('/', function(req, res){
    pg.connect(connectionString, function(err, client, done){
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM test', function(err, result){
            if(err){
                return console.error('error running query', err);
            }
            res.render('index', {test: result.rows});
            data = result.rows;
            console.log(data);
            done();
        });
    });
});

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

app.get('/data', function(req,res){
    return res.json(data);

});

app.post('/update', urlencodedParser, function(req, res){
    console.log(req.body);
    console.log(req.param("fname"));
});


// Server
app.listen(3030, function(){
    console.log('Server started on port 3030');
});
