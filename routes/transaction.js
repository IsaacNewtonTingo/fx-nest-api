const express = require("express");
const jwt = require("../middlewares/jwt");
const {
  getTransactions,
  contactManager,
  getAdminTransactions,
  withdraw,
} = require("../controllers/transaction");

const router = express.Router();

router.get("/", getTransactions);
router.post("/contact-manager", contactManager);
router.get("/admin-transactions", getAdminTransactions);
router.post("/withdraw", withdraw);

module.exports = router;
