const db = require("../config/db");

exports.getProfile = (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT id, name, email, created_at FROM users WHERE id=?";

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
};

exports.updateProfile = (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  const sql = "UPDATE users SET name=?, email=? WHERE id=?";

  db.query(sql, [name, email, userId], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Profile updated successfully" });
  });
};

// GET budget
exports.getBudget = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT budget FROM users WHERE id=?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ budget: result[0].budget });
    }
  );
};

// UPDATE budget
exports.updateBudget = (req, res) => {
  const userId = req.user.id;
  const { budget } = req.body;

  db.query(
    "UPDATE users SET budget=? WHERE id=?",
    [budget, userId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Budget updated" });
    }
  );
};