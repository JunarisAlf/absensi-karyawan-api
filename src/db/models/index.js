const mongoose = require("mongoose");
require('dotenv').config();

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URL;

db.User = require("./user-model.js")(mongoose);

module.exports = db;