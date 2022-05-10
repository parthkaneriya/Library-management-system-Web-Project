const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
router.use(express.json());
router.use(bodyParser.urlencoded({extended : true}));

// const auth = require("../middlewares/auth.middleware");
//controller
const controller = require("../controllers/auth.controllers");

router.post("/register", controller.register);
router.post("/signin", controller.login);

module.exports = router;