const db={};

db.User = require("./user.model");
db.Issue = require("./issue.model");
db.Request = require("./request.model");
db.Book = require("./book.model");
module.exports = db;