const jwt = require("jsonwebtoken");

exports.middleware = async (req, res, next) => {
    try {
      // console.log("middleware called");
      // const token = req.cookies.token;
      // console.log(req.headers.authorization.split(' ')[1]);
    const token=req.headers.authorization.split(' ')[1];
      if(!token){
          return res.status(400).json({
              message : "No token"
          })
      }
      // console.log("test1");
      jwt.verify(token, process.env.SECRET, (err, result) => {
        // console.log("1.5");
        if (err) {
          return res.status(401).json({
              message : "User is not verified"
          });
        }
        // console.log("test2");
        next();
      });
    } catch (err) {
      res.status(500).json({
          message : "Server Error.."
      });
    }
  };
//   module.exports = middleware