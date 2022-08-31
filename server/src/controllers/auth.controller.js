import User from "../models/user.model.js";
import dbErrorHandler from "./helpers/dbErrorHandler.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../config/config.js";
const signupUser = (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({ firstName, lastName, email, password });
  newUser.save((err, user) => {
    if (err) {
      res.send({
        error: dbErrorHandler.getErrorMessage(err),
      });
    } else {
      res.status(200).send(user);
    }
  });
};

const loginUser = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user || err) {
      return res.send({
        error: "User not found",
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.send({
        error: "Email and password do not match",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      config.secret
    );
    res.cookie("userJwtToken", token, {
      expires: new Date(Date.now() + 9999),
      httpOnly: true,
    });

    res.send({
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  });
};

const logOutUser = (req, res, next) => {
  res.clearCookie("userJwtToken");
  res.send({
    message: "User signed out successfully",
  });
};

export default { signupUser, loginUser, logOutUser };
