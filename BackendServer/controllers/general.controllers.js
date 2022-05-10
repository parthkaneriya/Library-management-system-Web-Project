const User = require("../models").User;
const Book = require("../models").Book;

exports.allBooks = async (req,res) => {
    let allbook = await Book.find({});
    return res.status(200).json(allbook);
};

exports.allStudents = async (req,res) => {
    let allstudent = await User.find({admin : false})
    return res.status(200).json(allstudent);
};

exports.searchBook = async (req,res) => {
    // console.log(req.params.isbn);
    let book = await Book.findOne({isbn:req.params.isbn});
    return res.status(200).json(book);
}