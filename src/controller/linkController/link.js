/** @format */

const createError = require("http-errors");
const { validateURL } = require("../../helper/helper");
const {
  handleCreateSortLink,
  handleGetLink,
  handleGetProfileLinks,
} = require("../../model/linkModel/link");

class LinkController {
  constructor() {}

  async createSortLink(req, res, next) {
    try {
      if (!req.body.link.trim()) {
        throw createError.BadRequest("Invalid input value");
      } else if (!validateURL(req.body.link)) {
        throw createError.BadRequest("Invalid URL");
      } else {
        const result = await handleCreateSortLink(req.body, req.user);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async getLink(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("Invalid parameter id");
      } else {
        const result = await handleGetLink(req.params.id);
        return res.redirect(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async getProfileLinks(req, res, next) {
    try {
      const result = await handleGetProfileLinks(req.user._id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LinkController();
