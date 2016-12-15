var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//var mongo = require("mongodb").MongoClient;
var mongoose = require("mongoose");


var auth = require("./controllers/auth");
var message = require("./controllers/message");
var jwt = require("jwt-simple");

mongoose.Promise = require('bluebird');
//var datab;

app.use(bodyParser.json());

//Custom middleware for CORS - cross Origin requests
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    //next() function ensures that it (i.e. this custom middleware chain) does not freeze the middleware chain
    next();
});

function checkAuthenticated(req,res,next){
    if(!req.header('Authorization')){
        return res.status(401).send({message: 'Please make sure your request has an authorization header!'});
    }

    var token = req.header('Authorization').split('')[1];
}

app.get("/api/message", message.getMessages);

app.post("/api/message", message.postMessages);

app.post("/auth/register", auth.register);



mongoose.connect("mongodb://localhost:27017/sample", function(err,db){
    if(!err){
        console.log("Connection to MongoDB: Successful");
        //datab = db;
        //GetMessages();
    }
    else
        console.log("Connection to MongoDB: Failed");
    
});

var server = app.listen(5000, function(){
    console.log("Listening on Port "+server.address().port);
});
