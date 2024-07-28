const express = require("express");
const jwt = require("../middlewares/jwt");
const { getTransactions } = require("../controllers/transaction");

const router = express.Router();

router.get("/", jwt, getTransactions);

module.exports = router;
