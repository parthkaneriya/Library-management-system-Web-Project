const User = require("../models").User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    let user = await User.findOne({
      email: req.body.email,
      rollNo: req.body.rollNo,
    });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash_password;

    const temp = await User.create(req.body);
    console.log(temp);
    return res.status(201).json({
      message: "user created sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
      return res.status(401).json({
        message: "Please Enter fields",
      });
    }

    let useremail = await User.findOne({ email: email });
    console.log(useremail);
    if (!useremail) {
      return res.status(401).json({
        message: "Invalid Details",
      });
    }
    let result = await bcrypt.compareSync(password, useremail.password);

    console.log(result);
    if (!result) {
      return res.status(401).json({
        message: "Invalid Details",
      });
    }

    let token = await jwt.sign(
      {
        id: useremail._id,
      },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );
    await User.findOneAndUpdate({email:email},{token:token});
    console.log(token);
    let role;
    if (useremail.admin == true) {
      role = "Admin";
    } else {
      role = "Student";
    }

    return res.status(200).json({
      id: useremail._id,
      role: role,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error..",
    });
  }
};
