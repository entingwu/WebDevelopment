/* npm install express --save
*  1-1 mapping in node module and package.json*/
var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var mongoose      = require('mongoose');

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');//session.current login

mongoose.connect('mongodb://localhost/passport-example');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
multer();
app.use(session({
    secret: 'this is the secret',//secret string to encrypt the cookie
    resave: true,
    saveUninitialized: true
}));

/* Add features to express object
* the current login user will be available in the request object */
//1. cookieParser
app.use(cookieParser());
//2. passport, use the session already configure
app.use(passport.initialize());
app.use(passport.session());//configure passport to use the session
app.use(express.static(__dirname + '/public'));

require("./app/app.js")(app);

app.listen(3000);