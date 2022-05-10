const mongoose = require("mongoose");

const request = new mongoose.Schema({
    rollNo: {
        type: String,
        required : true
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
        required : true,
    } 
});

module.exports = mongoose.model("request",request);