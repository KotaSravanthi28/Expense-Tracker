const db = require("../config/db");

// Dashboard Summary
exports.getDashboardSummary = (req, res) => {
  const user_id = req.user.id;

  db.query(
    `
    SELECT
    SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS totalIncome,
    SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS totalExpense
    FROM transactions
    WHERE user_id=?
    `,
    [user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      const income =
        Number(result[0].totalIncome) || 0;

      const expense =
        Number(result[0].totalExpense) || 0;

      res.json({
        success: true,
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
      });
    }
  );
};

// Category Analytics
exports.getCategoryAnalytics = (req, res) => {
  const user_id = req.user.id;

  db.query(
    `
    SELECT category,
    SUM(amount) as amount
    FROM transactions
    WHERE user_id=? AND type='expense'
    GROUP BY category
    `,
    [user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        data: result,
      });
    }
  );
};

// Monthly Analytics
exports.getMonthlyAnalytics = (req, res) => {
  const user_id = req.user.id;

  db.query(
    `
    SELECT
    MONTH(transaction_date) as month,
    SUM(amount) as amount
    FROM transactions
    WHERE user_id=? AND type='expense'
    GROUP BY MONTH(transaction_date)
    ORDER BY month ASC
    `,
    [user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        data: result,
      });
    }
  );
};