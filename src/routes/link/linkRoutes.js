/** @format */

const {
  createSortLink,
  getLink,
  getProfileLinks,
} = require("../../controller/linkController/link");
const Authentication = require("../../middleware/middleware");
const router = require("express").Router();

router.post("/create", Authentication, createSortLink);
router.get("/:id", getLink);
router.get("/", Authentication, getProfileLinks);
module.exports = router;
