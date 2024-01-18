/** @format */

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    name: { type: String, trim: true, require: true },
    email: { type: String, trim: true, require: true, unique: true },
    username: { type: String, trim: true, require: true, unique: true },
    password: { type: String, trim: true, require: true },
    links: [{ type: mongoose.Types.ObjectId, ref: "Links" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
