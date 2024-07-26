const express = require("express");
const { contactUs } = require("../controllers/contact-us");
const anonymous = require("../middlewares/anonymous");

const router = express.Router();

router.post("/", anonymous, contactUs);

module.exports = router;
