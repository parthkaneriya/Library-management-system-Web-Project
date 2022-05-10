const mongoose = require("mongoose");

const issue = new mongoose.Schema({
rollNo: {
    type: String,
    required : true,
},

studentName: {
    type: String,
    required : true
},

book: {
    type: String,
    required : true
},

isbn: {
    type: String,
    required : true
},

issueDate: {
    type: Date,
    default : Date.now()
},

returnDate: {
    type: Date,
    default : Date.now() + 14*24*60*60*1000
},

status: {
    type: String,
    required : true
},

});

module.exports = mongoose.model("issue",issue);