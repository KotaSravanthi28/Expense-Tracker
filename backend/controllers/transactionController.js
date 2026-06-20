const db = require("../config/db");

// Add Transaction
exports.addTransaction = (req, res) => {
  const { type, category, amount, description, transaction_date } =
    req.body;

  const user_id = req.user.id;

  const sql =
    "INSERT INTO transactions (user_id,type,category,amount,description,transaction_date) VALUES (?,?,?,?,?,?)";

  db.query(
    sql,
    [
      user_id,
      type,
      category,
      amount,
      description,
      transaction_date,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Transaction Added Successfully",
      });
    }
  );
};

// Get Transactions
exports.getTransactions = (req, res) => {
  const user_id = req.user.id;

  db.query(
    "SELECT * FROM transactions WHERE user_id=? ORDER BY id DESC",
    [user_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        data: results,
      });
    }
  );
};

// Update Transaction
exports.updateTransaction = (req, res) => {
  const { id } = req.params;

  const { type, category, amount, description, transaction_date } =
    req.body;

  db.query(
    `UPDATE transactions
     SET type=?, category=?, amount=?, description=?, transaction_date=?
     WHERE id=?`,
    [
      type,
      category,
      amount,
      description,
      transaction_date,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Transaction Updated Successfully",
      });
    }
  );
};

// Delete Transaction
exports.deleteTransaction = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM transactions WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Transaction Deleted Successfully",
      });
    }
  );
};

exports.categoryWise = (req, res) => {
  const sql = `
    SELECT category, SUM(amount) as amount
    FROM transactions
    WHERE user_id=?
    GROUP BY category
  `;

  db.query(sql, [req.user.id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ data: result });
  });
};

exports.monthlyWise = (req, res) => {
  const sql = `
    SELECT MONTH(transaction_date) as month,
           SUM(amount) as amount
    FROM transactions
    WHERE user_id=?
    GROUP BY MONTH(transaction_date)
    ORDER BY month
  `;

  db.query(sql, [req.user.id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ data: result });
  });
};

exports.setBudget = (req, res) => {
  const { budget } = req.body;

  const sql = "UPDATE users SET budget=? WHERE id=?";

  db.query(sql, [budget, req.user.id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Budget updated" });
  });
};