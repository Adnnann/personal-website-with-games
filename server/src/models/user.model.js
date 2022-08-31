import mongoose from "mongoose";
import crypto from "crypto";
import validate from "mongoose-validator";

const emailValidator = [
  validate({
    validator: "isEmail",
    message: "Email is not valid",
  }),
];

const firstNameAndLastNameValidator = [
  validate({
    validator: "isAlphanumeric",
    message: "First name and last name can only contain letters",
  }),
];

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "First name is required",
    trim: true,
    minlength: 3,
    maxlength: [15, "Firstname must be less than 15 characters"],
    validate: firstNameAndLastNameValidator,
  },
  lastName: {
    type: String,
    required: "Lastname is required",
    trim: true,
    minlength: 3,
    maxlength: [15, "Lastbane must be less than 15 characters"],
    validate: firstNameAndLastNameValidator,
  },
  email: {
    type: String,
    required: "Email is required",
    trim: true,
    validate: emailValidator,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashed_password: {
    type: String,
    required: "Password is required",
    minlength: [8, "Password must be at least 8 characters"],
  },
  salt: String,
  updated: Date,
});

UserSchema.virtual("password").set(function (password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
});

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 8) {
    this.invalidate("password", "Password must be at least 8 characters");
  }
}, null);

UserSchema.path("email").validate(async function (email) {
  const user = await this.constructor.findOne({ email });
  if (user) {
    if (user.id === this.id) {
      return true;
    }
    return false;
  }
  return true;
}, "Email is already in use");

export default mongoose.model("User", UserSchema);
