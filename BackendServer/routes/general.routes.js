const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
router.use(express.json());
router.use(bodyParser.urlencoded({extended : true}));

const controller = require("../controllers/general.controllers");

router.get("/allbooks",controller.allBooks);
router.get("/searchbook/:isbn",controller.searchBook)
router.get("/allstudents",controller.allStudents);

module.exports = router;