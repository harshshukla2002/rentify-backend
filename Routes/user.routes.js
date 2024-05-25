const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/user.model");

const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    res.status(200).send({ message: "User Already Exist" });
    return;
  }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) res.status(400).send({ err: err });
      else {
        const user = UserModel({ ...req.body, password: hash });
        await user.save();
        res.status(200).send({ message: "Signup Successful" });
      }
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).send({ message: "This Email Not Found" });
      return;
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(400).send({ message: err });
        } else if (result) {
          const token = jwt.sign({ name: user.firstname }, process.env.SECRET);
          res.status(200).send({ message: "Login Success", token, user });
        } else {
          res.status(404).send({ message: "wrong password" });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = { UserRouter };
