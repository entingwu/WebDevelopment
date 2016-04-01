/* 1. load the express library */
var express       = require('express');
/* 2. create instance */
var app           = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');//valid session

app.use(session({
    secret : 'this is the secret',
    resave : true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/* 6. JSON : include body-parser, multer library */
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended:true }));// for parsing application/x-
app.use(multer());
//app.use(session({ secret: process.env.PASSPORT_SECRET }));//private key to identify the person
app.use(cookieParser());


// install and require the mongoose library
var mongoose      = require('mongoose');
// create a default connection string
// mongodb://localhost/database
var connectionString = 'mongodb://127.0.0.1:27017/cs5610spring2016';

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

/* physical location : load server.js in other folder, passing app
 * var app = express()
 * this file requires the module and function, when I have the function, I invoke it and pass app */
require("./public/lectures/server/expressjs/server.js")(app);

require("./public/lectures/server/omdb/get/server/app.js")(app);
require("./public/lectures/server/omdb/post/server/app.js")(app);
//require("./public/lectures/server/omdb/delete/server/app.js")(app);
//require("./public/lectures/server/omdb/update/server/app.js")(app);

// pass db and mongoose reference to server side application module, mongoose instance library
require("./public/lectures/OMDB/server/app.js")(app, db, mongoose);

/* ASSIGNMENT3 : pass app(express instance) to create web service end point */
require("./public/assignment/Assignment3/server/app.js")(app);

/* ASSIGNMENT4 : mongoose instance library */
require("./public/assignment/Assignment4/server/app.js")(app, db, mongoose);