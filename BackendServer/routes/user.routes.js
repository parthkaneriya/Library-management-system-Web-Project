const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
router.use(express.json());
router.use(bodyParser.urlencoded({extended : true}));

const middleware = require("../middleware/middleware");

const controller = require("../controllers/user.controllers");

router.post("/issueRequest",middleware.middleware,controller.issueRequest);
//router.get("/profile/:id",controller.profile);
router.post("/editprofile/:id",middleware.middleware,controller.editProfile);
router.post("/changepassword/:id",middleware.middleware,controller.changePassword);
router.get("/issuehistory/:id",middleware.middleware,controller.issueHistory);
router.get("/profile/:rollno",middleware.middleware,controller.profile);

module.exports = router;