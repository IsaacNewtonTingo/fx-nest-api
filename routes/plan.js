const express = require("express");

const { getPlans, createPlan, getUserPlan } = require("../controllers/plan");
const jwt = require("../middlewares/jwt");

const router = express.Router();

router.post("/", createPlan);
router.get("/", getPlans);
router.get("/user-plan", getUserPlan);

module.exports = router;
