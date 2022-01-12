var express = require("express");
//var mysql = require("mysql");

var app = express();
var connection = require('./database');

app.get('/', function(req, res){
    res.send('HEY!!');
} );

app.listen(3000, function(){
    console.log('App is listening on port 3000');
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database Connected');
    })
});