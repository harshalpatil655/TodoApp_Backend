const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/User.Model");
require("dotenv").config();

const userController = Router();

userController.get("/", async (req, res) => {
  let data = await userModel.find({});
  res.send(data);
});

userController.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.status(500).send({ bcryptErr: err });
    } else {
      const newuser = userModel({
        name,
        email,
        password: hash,
      });
      await newuser.save();
      res.send("Successfully registered");
    }
  });
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  const hash = user.password;

  bcrypt.compare(password, hash, function (err, result) {
    if (result && user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({
        Message: "Login Successfull",
        token,
      });
    } else {
      res.send({ err: "Login UnSuccessfull" });
    }
  });
});

module.exports = { userController };
