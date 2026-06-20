const router = require("express").Router();

const verifyToken =
  require("../middleware/verifyToken");

const {
  getGoal,
  updateGoal,
} = require("../controllers/goalController");

router.get(
  "/",
  verifyToken,
  getGoal
);

router.put(
  "/",
  verifyToken,
  updateGoal
);

module.exports = router;