/** @format */

const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

class Helper {
  constructor() {}

  async hashPassword(password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async comparePassword(password, data) {
    try {
      const result = await bcrypt.compare(password, data.password);
      return result;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async generateToken(data) {
    try {
      const token = await jwt.sign(
        {
          _id: data._id,
          name: data.name,
          username: data.username,
          email: data.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "30d" }
      );
      return token;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async validateURL(value) {
    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
  }
}
module.exports = new Helper();
