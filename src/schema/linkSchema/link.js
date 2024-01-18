/** @format */

const mongoose = require("mongoose");

const LinkSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    original_url: { type: String, trim: true, require: true, unique: true },
    short_url: { type: String, trim: true, require: true, unique: true },
    click_count: { type: Number, default: 0 },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Link", LinkSchema);
