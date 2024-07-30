const express = require("express");
const {
  getUsers,
  googleLogin,
  verifyCode,
  signup,
  login,
  forgotPassword,
  resetPassword,
  updateUser,
  getUser,
} = require("../controllers/user");
const jwt = require("../middlewares/jwt");
const { checkAdmin } = require("../middlewares/check-admin");

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/verify-code", verifyCode);
router.post("/auth/login", login);
router.post("/auth/google-login", googleLogin);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);

router.get("/:id", getUser);
router.get("/", getUsers);
router.put("/", checkAdmin, updateUser);

module.exports = router;
