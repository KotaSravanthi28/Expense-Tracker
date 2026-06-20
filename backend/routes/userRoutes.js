const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

// import controllers ONCE only
const {
  getProfile,
  updateProfile,
  getBudget,
  updateBudget,
} = require("../controllers/userController");

// routes
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.get("/budget", verifyToken, getBudget);
router.put("/budget", verifyToken, updateBudget);

module.exports = router;