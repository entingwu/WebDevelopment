var express       = require('express');//load the express library
var app           = express();//create instance
var bodyParser = require('body-parser');
var multer = require('multer');
/* SECURITY */
var cookieParser  = require('cookie-parser');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session       = require('express-session');//valid session
var mongoose      = require('mongoose');// install and require the mongoose library

/* DATABASE */
// create a default connection string : mongodb://localhost/database
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


/* JSON : include body-parser, multer library */
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended:true }));// for parsing application/x-
app.use(multer());
//app.use(session({ secret: process.env.PASSPORT_SECRET }));//private key to identify the person
app.use(cookieParser());//1
app.use(session({
    secret : process.env.SESSION_SECRET || '123',
    resave : true,
    saveUninitialized: true
}));
app.use(passport.initialize());//2
app.use(passport.session());

/* 4. serve static content for the app from the "public" directory in the application directory */
app.use(express.static(__dirname + '/public'));



var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


/* 5. mapping the coming http request with url pattern '/hello' to the executable function,
 * pass the url, res.send() generate the correct type to go back to client 3 party API */
app.get('/hello', function(req, res){ res.send('hello world'); });

/* 3. listen to particular port */
app.listen(port, ipaddress);

/* ASSIGNMENT3 : pass app(express instance) to create web service end point */
require("./public/assignment/Assignment3/server/app.js")(app);

/* ASSIGNMENT4 : mongoose instance library */
require("./public/assignment/Assignment4/server/app.js")(app, db, mongoose);

/* ASSIGNMENT5 : security */
require("./public/assignment/Assignment5/server/app.js")(app, db, mongoose, passport, LocalStrategy);

/* PROJECT */
require("./public/project/server/app.js")(app, db, mongoose);

require("./public/application/server/app.js")(app, db, mongoose);

/* LECTURE */
/* physical location : load server3.js in other folder, passing app
 * var app = express()
 * this file requires the module and function, when I have the function, I invoke it and pass app */
require("./public/lectures/server/expressjs/server.js")(app);
//require("./public/lectures/Security/app/app.js")(app);
app.set('view engine', 'ejs');