var mongoose = require("mongoose");

var msgSchema = new mongoose.Schema({stmt: String});
module.exports = mongoose.model('Message', msgSchema);
