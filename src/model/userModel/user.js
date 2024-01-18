/** @format */

const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../../schema/userSchema/user");
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../../helper/helper");

class UserModel {
  constructor() {}

  async handleRegisterUser(body) {
    try {
      const user = await User.findOne({ username: body.username });
      if (!user) {
        const hash = await hashPassword(body.password);
        const newUser = User({
          _id: new mongoose.Types.ObjectId(),
          name: body.name,
          email: body.email,
          username: body.username,
          password: hash,
        });
        const userData = await newUser.save();
        const token = await generateToken(userData);
        return {
          msg: "User registration successfull",
          user: userData,
          token: token,
        };
      } else {
        throw createError.BadRequest("Username already taken");
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleLoginUser(body) {
    try {
      const user = await User.findOne({ username: body.username });
      if (!user) {
        throw createError.BadRequest("No user found with this username");
      } else {
        const isPasswordCorrect = await comparePassword(body.password, user);
        if (!isPasswordCorrect) {
          throw createError.BadRequest("Password is not correct");
        } else {
          const token = await generateToken(user);
          return { msg: "User login successfull", user, token };
        }
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}
module.exports = new UserModel();
