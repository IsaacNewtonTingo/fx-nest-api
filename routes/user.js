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

router.get("/", jwt, getUsers);
router.put("/", jwt, checkAdmin, updateUser);

module.exports = router;
