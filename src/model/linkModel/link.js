/** @format */

const createError = require("http-errors");
const Link = require("../../schema/linkSchema/link");
const { default: mongoose } = require("mongoose");

class LinkModel {
  constructor() {}

  async handleCreateSortLink(body, user) {
    try {
      const isExists = await Link.findOne({ original_url: body.link });
      if (isExists) {
        return { msg: "Link already modified", data: isExists };
      } else {
        const _id = new mongoose.Types.ObjectId();
        const temp = body.link.split("/");
        const short_url = `${temp[2]}/${_id}`;

        const newUrl = Link({
          _id: _id,
          original_url: body.link,
          short_url: short_url,
          user: user._id,
        });
        const data = await newUrl.save();
        return { msg: "Link has been modified", data: data };
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleGetLink(id) {
    try {
      const data = await Link.findById(id);
      if (!data) {
        throw createError.BadRequest("Invalid URL");
      } else {
        await Link.updateOne(
          { _id: id },
          { $inc: { count: 1 } },
          { new: true }
        );
        console.log(data);
        return data.original_url;
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleGetProfileLinks(id) {
    try {
      const lists = await Link.find({ user: id });
      return lists;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}
module.exports = new LinkModel();
