const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Auth = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (decoded) next();
    else res.status(400).send({ message: err });
  });
};

module.exports = { Auth };
