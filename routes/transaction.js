const express = require("express");
const jwt = require("../middlewares/jwt");
const {
  getTransactions,
  contactManager,
} = require("../controllers/transaction");

const router = express.Router();

router.get("/", jwt, getTransactions);
router.post("/contact-manager", jwt, contactManager);

module.exports = router;
