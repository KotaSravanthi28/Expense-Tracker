const express = require("express");
const router = express.Router();

const verifyToken =
require("../middleware/verifyToken");

const {
  getSavings,
  addSavings,
  getSavingsTotal,
  deleteSaving,
} = require("../controllers/savingsController");

router.get(
  "/",
  verifyToken,
  getSavings
);

router.post(
  "/",
  verifyToken,
  addSavings
);

router.get(
  "/total",
  verifyToken,
  getSavingsTotal
);

router.delete(
  "/:id",
  verifyToken,
  deleteSaving
);

module.exports = router;