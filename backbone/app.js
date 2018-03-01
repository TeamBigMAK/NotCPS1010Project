var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();

// Connect to DB STRING
var connectionString = "postgres://projBB:123456@localhost:5432/poldb";

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
            done();
        });
    });
});


// Server
app.listen(3030, function(){
    console.log('Server started on port 3030');
});
