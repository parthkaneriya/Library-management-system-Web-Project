const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  rollNo: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  gender: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  course: {
    type: String,
  },
  admin: {
      type : Boolean,
      default : false
  },
  fine : {
      type : Number,
      default : 0
  },
  issueHistory : [{
        bookName : String,
        isbn : String,
        issueDate : Date,
        returnDate : Date,
        status : String
  }]
});

module.exports = mongoose.model("user", User);
