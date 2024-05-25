const mongooose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connection = mongooose.connect(process.env.MONGO_URL);

module.exports = { connection };
