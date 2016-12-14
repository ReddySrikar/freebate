var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//var mongo = require("mongodb").MongoClient;
var mongoose = require("mongoose");

var Message = require("./dbmodels/Message");
var User = require("./dbmodels/User");

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

app.get("/api/message", GetMessages);

app.post("/api/message", function(req,res){
    //console.log(req.body);
    res.status(200);  
    var message = new Message(req.body);
    message.save();
    //datab.collection("messages").insertOne(req.body);
});

app.post("/auth/register",function(req, res){
    console.log(req.body);

    var user = new User(req.body);
    user.save();
});

function GetMessages(req,res)
{
    Message.find({}).exec(function(err, result){
        res.send(result);
    })
}

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
