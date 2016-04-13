/* 1. load the express library */
var express       = require('express');
/* 2. create instance */
var app           = express();
var bodyParser = require('body-parser');
var multer = require('multer');

/* SECURITY */
var cookieParser  = require('cookie-parser');
var passport      = require('passport');
var session       = require('express-session');//valid session

app.use(session({
    secret : process.env.SESSION_SECRET || '123',
    resave : true,
    saveUninitialized: true
}));

app.use(cookieParser());//1
app.use(passport.initialize());//2
app.use(passport.session());

/* 6. JSON : include body-parser, multer library */
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended:true }));// for parsing application/x-
app.use(multer());
//app.use(session({ secret: process.env.PASSPORT_SECRET }));//private key to identify the person

// install and require the mongoose library
var mongoose      = require('mongoose');
// create a default connection string
// mongodb://localhost/database
var connectionString = 'mongodb://localhost/cs5610spring2016'|| process.env.OPENSHIFT_MONGODB_DB_URL;

// use remote connection string if running in remote server
// process provided by nodejs
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
 connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
     process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
     process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
     process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
     process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

/* 4. serve static content for the app from the "public" directory in the application directory */
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


/* 5. mapping the coming http request with url pattern '/hello' to the executable function,
 * pass the url, res.send() generate the correct type to go back to client
 * 3 party API */
app.get('/hello', function(req, res){ res.send('hello world'); });

/* 3. listen to particular port */
app.listen(port, ipaddress);

/* physical location : load server3.js in other folder, passing app
 * var app = express()
 * this file requires the module and function, when I have the function, I invoke it and pass app */
require("./public/lectures/server/expressjs/server.js")(app);

//require("./public/lectures/server/omdb/get/server/app.js")(app);
//require("./public/lectures/server/omdb/post/server/app.js")(app);

// pass db and mongoose reference to server side application module, mongoose instance library
//require("./public/lectures/OMDB/server/app.js")(app, db, mongoose);

/* ASSIGNMENT3 : pass app(express instance) to create web service end point */
//require("./public/assignment/Assignment3/server/app.js")(app);

/* ASSIGNMENT4 : mongoose instance library */
require("./public/assignment/Assignment4/server/app.js")(app, db, mongoose);

///* PROJECT */
var request = require('request');
var CLIENT_ID = '03ffe0cac0a0401aa6673c3cf6d02ced';
var CLIENT_SECRET = 'a57c43efb9644574a96d6623fb8bfbc2';
var REDIRECT_URI = 'http://localhost:3000/callback';

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        console.log(token);
        /*var options = {
         url: 'https://api.spotify.com/v1/users/jmperezperez',
         headers: {
         'Authorization': 'Bearer ' + token
         },
         json: true
         };
         request.get(options, function(error, response, body) {
         console.log(body);
         });*/
    }
});
require("./public/application/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose);
/* Load the HTTP library */
//var http = require("http");

/* Create an HTTP server to handle responses */
/*http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888);*/

/* SECURITY */
require("./public/lectures/Security/app/app.js")(app);

app.set('view engine', 'ejs');