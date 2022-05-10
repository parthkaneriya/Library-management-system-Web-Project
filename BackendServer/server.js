const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

var envirornment = process.env.NODE_ENV || "development";
if (envirornment === "development") {
  require("dotenv").config();
}

//routes
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const generalRoutes = require("./routes/general.routes");

//Database Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());



var corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

//enable cors
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// app.use((req,res,next)=>{
//   res.setHeader('Acces-Control-Allow-Origin','*');
//   res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//   res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next(); 
// })

// app.use(express.static(__dirname));

app.get("/", (req, res) => {
  //res.sendFile(__dirname+"/public/homePage.html");
   res.send("Welcome to Web project");
});

// app.get("/register", (req, res) => {
//   res.sendFile(__dirname+"/public/register.html");
//   // res.send("Welcome to Web project");
// });
//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/general",generalRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Port Listening on ${PORT}`);
});
