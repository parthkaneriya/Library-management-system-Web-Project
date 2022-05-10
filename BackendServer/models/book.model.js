const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    isbn:{
        type:String,
        require:true,
        unique:true,
    },
    category:{
        type:String,
        require:true,
    },
    current_copies:{
        type:Number,
        require:true,
    },
    shelf:{
        type:String,
        require:true,
    },
    floor:{
        type:String,
        require:true,
    },

});

module.exports = mongoose.model("book",Book);