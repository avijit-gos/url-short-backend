/** @format */

const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw createError.BadGateway("Token not found");
    } else {
      const verify = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = verify;
      next();
    }
  } catch (error) {
    next(error);
  }
};
