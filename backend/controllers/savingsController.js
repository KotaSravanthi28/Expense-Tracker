const db = require("../config/db");

exports.getSavings = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM savings_entries WHERE user_id=? ORDER BY created_at DESC",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
};

exports.addSavings = (req, res) => {
  const userId = req.user.id;

  const {
    amount,
    description,
    created_at
  } = req.body;

  db.query(
    `INSERT INTO savings_entries
    (user_id,amount,description,created_at)
    VALUES(?,?,?,?)`,
    [
      userId,
      amount,
      description,
      created_at
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true
      });
    }
  );
};

exports.getSavingsTotal = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT SUM(amount) as total
     FROM savings_entries
     WHERE user_id=?`,
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        total: result[0].total || 0,
      });
    }
  );
};

exports.deleteSaving = (
  req,
  res
) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM savings_entries WHERE id=?",
    [id],
    () => {
      res.json({
        success: true,
      });
    }
  );
};