const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true,
    min: 2,
  },
  password: {
    type: String,
    trim: true,
    min: 6,
    default: null,
  },
  fullname: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: null,
  },
  is_lock: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre(/^(save|findOneAndUpdate)/, async function (next) {
  try {
    const user = this;
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;
      return next();
    }

    const { password } = user.getUpdate();
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user._update.password = hashPassword;
    }

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", UserSchema);
