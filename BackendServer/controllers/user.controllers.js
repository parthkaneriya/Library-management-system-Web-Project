const User = require("../models").User;
const Book = require("../models").Book;
const Request = require("../models").Request;
const bcrypt = require("bcryptjs");

exports.issueRequest = async (req,res)=>{
    try{
        let book = await Book.findOne({isbn:req.query.isbn})
        let student = await User.findOne({_id:req.query._id});
        // console.log(student);
        // console.log(book);
        if(book.current_copies<1)
        {
            return res.status(400).json({
				message:'Book is not available'
			})
        }
        else
        {
            // console.log(book);
            let studentName = student.firstName.concat(" ",student.lastName);
            let new_request = {
                rollNo : student.rollNo,
                studentName : studentName,
                book : book.title, 
                isbn : book.isbn,
            }
            console.log(new_request);
            await Request.create(new_request);
            return res.status(200).json({
				message:'Request sent successfully'
			})
        }
    }
    catch(err)
    {
        return res.status(500).json({
            message:'Server Error..'
        })
    }
};


exports.profile = async (req,res) => {
    try{
        console.log(req.params.rollno);
        const student = await User.findOne({ rollNo : req.params.rollno});
        console.log(student);
        return res.status(200).json(student);
    }
    catch(err)
    {
        return res.status(500).json({
            message:'Server Error..'
        })
    }
};


exports.editProfile = async (req,res) => {
    try{
        console.log(req.body);
        await User.updateOne({ _id: req.params.id }, {
            $set: req.body
          })
  
          return res.status(200).json({
            message : "profile updated sucessfully"
          })
    }
    catch(err)
    {
        return res.status(500).json({
            message:'Server Error..'
        })
    }
};

exports.changePassword = async (req,res) => {
    try{
        console.log(req.body);
        let user = await User.findOne({_id : req.params.id});
        console.log(user);
        let test = await bcrypt.compareSync(req.body.password,user.password);
        if(!test)
        {
            return res.status(401).json({
                message:'invalid password'
            })
        }
        console.log(test);
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(req.body.newpassword, salt);
        user.password = hash_password;
        await User.updateOne({rollNo : req.params.rollno},{
            $set: user
          })
        return res.status(200).json({message : "password changed sucessfully"});
    }
    catch(err)
    {
        return res.status(500).json({
            message:'Server Error..'
        })
    }
};

exports.issueHistory = async (req,res) => {
    try{
        let student = await User.findOne({_id:req.params.id});
        return res.status(200).json(student.issueHistory)
    }
    catch(err)
    {
        return res.status(500).json({
            message:'Server Error..'
        })
    }
};