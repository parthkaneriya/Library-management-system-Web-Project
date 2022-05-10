const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
router.use(express.json());
router.use(bodyParser.urlencoded({extended : true})); 

const controller = require("../controllers/admin.controllers");
const middleware = require("../middleware/middleware");
// const { route } = require("express/lib/application");

router.post("/addbook",middleware.middleware,controller.addBook);
router.put("/editbook/:isbn",middleware.middleware,controller.editBook);
router.delete("/deletebook/:isbn",middleware.middleware,controller.deleteBook);
router.get("/description/:isbn",middleware.middleware,controller.description);
router.get("/searchbook",middleware.middleware,controller.searchBook);
router.get("/searchstudent/:rollno",middleware.middleware,controller.findStudent);
router.get("/allrequest",middleware.middleware,controller.allRequest);
router.post("/accept/:rollno",middleware.middleware,controller.accept);
router.post("/reject/:rollno",middleware.middleware,controller.reject);
router.get("/issuebook/:rollno",middleware.middleware,controller.issueBook);
router.post("/return/:rollno",middleware.middleware,controller.return);
router.get("/issuehistory",middleware.middleware,controller.issueHistory);
module.exports = router;