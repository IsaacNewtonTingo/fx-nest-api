const express = require("express");
const jwt = require("../middlewares/jwt");
const { getTransactions } = require("../controllers/transaction");

const router = express.Router();

router.get("/:id", jwt, getTransactions);

module.exports = router;
