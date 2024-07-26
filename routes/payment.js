const express = require("express");
const { makePayment } = require("../controllers/payment");
const jwt = require("../middlewares/jwt");

const router = express.Router();

router.post("/initiate", makePayment);

module.exports = router;
