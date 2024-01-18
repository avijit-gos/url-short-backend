/** @format */

const {
  handleRegisterUser,
  handleLoginUser,
} = require("../../model/userModel/user");
const createError = require("http-errors");

class UserController {
  constructor() {}

  async registerUser(req, res, next) {
    try {
      if (
        !req.body.name.trim() ||
        !req.body.username.trim() ||
        !req.body.email.trim() ||
        !req.body.password.trim()
      ) {
        throw createError.Conflict("Registration request invalid");
      } else {
        const result = await handleRegisterUser(req.body);
        return res.status(201).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req, res, next) {
    try {
      if (!req.body.username.trim() || !req.body.password.trim()) {
        throw createError.BadRequest(
          "Username & Password is required for login"
        );
      } else {
        const result = await handleLoginUser(req.body);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
