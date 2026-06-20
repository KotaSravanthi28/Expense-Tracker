const express = require("express");

const router = express.Router();

const {
  getDashboardSummary,
  getCategoryAnalytics,
  getMonthlyAnalytics,
} = require("../controllers/dashboardController");

const {
  verifyToken,
} = require("../middleware/authMiddleware");

router.get("/", verifyToken, getDashboardSummary);

router.get(
  "/category",
  verifyToken,
  getCategoryAnalytics
);

router.get(
  "/monthly",
  verifyToken,
  getMonthlyAnalytics
);

module.exports = router;