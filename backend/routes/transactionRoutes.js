const express = require("express");

const router = express.Router();

const {
  createTransaction,
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  categoryWise,
  monthlyWise,
  setBudget 
} = require("../controllers/transactionController");

const {
  verifyToken,
} = require("../middleware/authMiddleware");

router.post("/", verifyToken, addTransaction);

router.get("/", verifyToken, getTransactions);

router.put("/:id", verifyToken, updateTransaction);

router.delete("/:id", verifyToken, deleteTransaction);

router.get("/category", verifyToken, categoryWise);
router.get("/monthly", verifyToken, monthlyWise);
router.put("/budget", verifyToken, setBudget);

module.exports = router;