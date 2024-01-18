/** @format */

const {
  registerUser,
  loginUser,
} = require("../../controller/userController/user");

const router = require("express").Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
