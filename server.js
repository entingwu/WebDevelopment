/* 1. load the express library */
var express = require('express');
/* 2. create instance */
var app = express();

/* 6. JSON : include body-parser, multer library */
var bodyParser = require('body-parser');
//var multer = require('multer');
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended:true }));// for parsing application/x-
//app.use(multer());

/* 4. serve static content for the app from the "public" directory in the application directory */
app.use(express.static(__dirname + '/public'));

 var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

/* 5. mapping the coming http request with url pattern '/hello' to the executable function,
 * pass the url, res.send() generate the correct type to go back to client
 * 3 party API */
app.get('/hello', function(req, res){
 res.send('hello world');
});

/* 3. listen to particular port */
app.listen(port, ipaddress);

/* physical location : load server.js, passing app
 * var app = express()
 * this file requires the module and function, when I have the function, I invoke it and pass app */
require("./public/lectures/server/expressjs/server.js")(app);

require("./public/lectures/server/omdb/get/server/app.js")(app);
require("./public/lectures/server/omdb/post/server/app.js")(app);
//require("./public/lectures/server/omdb/delete/server/app.js")(app);
//require("./public/lectures/server/omdb/update/server/app.js")(app);