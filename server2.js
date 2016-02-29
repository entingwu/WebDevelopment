var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});

var users = [
    {username: "Alex"},
    {username: "Bob"},
    {username: "Charlie"},
];

app.get('/getUsers', function(req, res){
    res.send(users);
});

app.get('/getUsers/:index', function(req, res){
    console.log("server side get users by index");
    var index = req.params["index"];
    res.send(users[index]);
});

app.listen(port, ipaddress);
