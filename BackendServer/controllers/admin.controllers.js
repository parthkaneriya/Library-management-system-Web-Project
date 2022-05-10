const { find } = require("../models/user.model");

const Books = require("../models").Book;
const User = require("../models").User;
const Request = require("../models").Request;
const Issue = require("../models").Issue;

exports.addBook = async (req, res) => {
  try {
    //console.log(req.body);
    let book = await Books.findOne({ isbn: req.body.isbn });
    if (book) {
      return res.status(409).json({
        message: "Book already exists",
      });
    }
    const temp = await Books.create(req.body);
    console.log(temp);
    return res.status(201).json({
      message: "book added sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.editBook = async (req, res) => {
  console.log(req.body);
  try {
    await Books.updateOne(
      { isbn: req.params.isbn },
      {
        $set: req.body,
      }
    );

    return res.status(200).json({
      message: "book updated sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.description = async (req, res) => {
  console.log(req.body);
  try {
    let book = await Books.findOne({ isbn: req.params.isbn });
    return res.status(200).json(book);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  // console.log(req.body);
  try {
    await Books.deleteOne({ isbn: req.params.isbn });
    return res.status(200).json({
      message: "book deleted sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.searchBook = async (req, res) => {
  let name = req.query.name;
  let author = req.query.author;
  console.log(name, author);
  try {
    if (!name) {
      const book = await Books.find({ author: author });
      console.log(book);
      return res.status(200).json(book);
    } else if (!author) {
      const book = await Books.find({ title: name });
      console.log(book);
      return res.status(200).json(book);
    } else {
      const book = await Books.find({ title: name, author: author });
      console.log(book);
      return res.status(200).json(book);
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.findStudent = async (req, res) => {
  try {
    const student = await User.find({ rollNo: req.params.rollno });
    return res.status(200).json(student);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.accept = async (req, res) => {
  try {
    let request = await Request.findOne({ rollNo: req.params.rollno });
    console.log(request);
    let new_request = {
      rollNo: request.rollNo,
      studentName: request.studentName,
      book: request.book,
      isbn: request.isbn,
      status: "Issued",
    };
    await Request.deleteOne({ rollNo: req.params.rollno });
    let issue = await Issue.create(new_request);
    new_request = {
      bookName: issue.book,
      isbn: issue.isbn,
      issueDate: issue.issueDate,
      returnDate: issue.returnDate,
      status: issue.status,
    };
    await User.findOneAndUpdate(
      { rollNo: request.rollNo },
      { $push: { issueHistory: new_request } }
    );
    await Books.findOneAndUpdate(
      { isbn: new_request.isbn },
      { $inc: { current_copies: -1 } }
    );
    return res.status(200).json({
      message: "book issued sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.reject = async (req, res) => {
  try {
    let request = await Request.findOne({ rollNo: req.params.rollno });
    let new_request = {
      bookName: request.book,
      isbn: request.isbn,
      status: "Rejected",
    };
    await Request.deleteOne({ rollNo: req.params.rollno });
    await User.findOneAndUpdate(
      { rollNo: request.rollNo },
      { $push: { issueHistory: new_request } }
    );
    return res.status(200).json({
      message: "book request rejected",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.issueBook = async (req, res) => {
  try {
      const issue = await Issue.find({ rollNo: req.params.rollno,status :"Issued" });
      return res.status(200).json(issue);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.issueHistory = async (req,res) => {
  try {
    const issue = await Issue.find({status : "Issued"});
    // console.log(issue);
    return res.status(200).json(issue);
    
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.allRequest = async (req, res) => {
  try {
    let request = await Request.find({});
    return res.status(200).json(request);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.return = async (req, res) => {
  try {
    let issue = await Issue.findOneAndUpdate(
      { rollNo: req.params.rollno },
      { status: "Returned" }
    );
    // console.log(issue);
    let user=await User.findOneAndUpdate(
      { rollNo: req.params.rollno },
      {
        $set: { "issueHistory.$[outer].status": "Returned" },
      },
      {
        arrayFilters: [
          {
            "outer.bookName": issue.book,
            "outer.status": "Issued",
            "outer.issueDate": issue.issueDate,
          },
        ],
      }
    );
    // console.log(user);
    let current = new Date().getTime();
    console.log(current);
    typeof(current);
    let returnDate = issue.returnDate.getTime();
    console.log(returnDate);
    let time_diff = Math.floor((current/(3600*24*1000)) - (returnDate/(3600*24*1000)));
    console.log(time_diff);
    let fine = 0;
    if (time_diff > 0) {
      fine = 2 * time_diff;
    }
    console.log(fine);
    
    let user1 = await User.findOneAndUpdate(
      { rollNo: req.params.rollno },
      { $inc : { fine: fine }}
    );
    console.log(user1);
    const user2=await Books.findOneAndUpdate(
      { isbn: issue.isbn },
      { $inc: { current_copies: 1 } }
    );
    console.log(user2);
    return res.status(200).json({
      message: "book returned",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
