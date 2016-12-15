var Message = require("../dbmodels/Message");

module.exports = {
    getMessages : function (req,res){
    Message.find({}).exec(function(err, result){
        res.send(result);
        })
    },

    postMessages : function(req,res){
    //console.log(req.body);
    res.status(200);
    var message = new Message(req.body);
    message.save();
    //datab.collection("messages").insertOne(req.body);
    }
}
