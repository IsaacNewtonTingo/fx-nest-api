const express = require("express");
const { upload } = require("../middlewares/multer");
const { fileUpload } = require("../controllers/file-upload");
const jwt = require("../middlewares/jwt");
const anonymous = require("../middlewares/anonymous");
const router = express.Router();

router.post("/", upload.single("file"), fileUpload);

module.exports = router;
