const express = require("express");
const jwt = require("../middlewares/jwt");
const {
  getTransactions,
  contactManager,
  getAdminTransactions,
} = require("../controllers/transaction");

const router = express.Router();

router.get("/", jwt, getTransactions);
router.post("/contact-manager", jwt, contactManager);
router.get("/admin-transactions", jwt, getAdminTransactions);

module.exports = router;
