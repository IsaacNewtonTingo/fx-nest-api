const express = require("express");
const jwt = require("../middlewares/jwt");
const {
  getTransactions,
  contactManager,
  getAdminTransactions,
} = require("../controllers/transaction");

const router = express.Router();

router.get("/", getTransactions);
router.post("/contact-manager", contactManager);
router.get("/admin-transactions", getAdminTransactions);

module.exports = router;
