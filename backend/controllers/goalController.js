const db = require("../config/db");

exports.getGoal = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM savings_goals WHERE user_id = ?",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0] || {});
    }
  );
};

exports.updateGoal = (req, res) => {
  const userId = req.user.id;

  const {
    goal_amount,
    extra_savings,
    target_date,
  } = req.body;

  db.query(
    "SELECT * FROM savings_goals WHERE user_id = ?",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        // UPDATE EXISTING GOAL
        db.query(
          `UPDATE savings_goals
           SET goal_amount = ?,
               extra_savings = ?,
               target_date = ?
           WHERE user_id = ?`,
          [
            goal_amount,
            extra_savings,
            target_date,
            userId,
          ],
          (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              success: true,
              message: "Goal Updated Successfully",
            });
          }
        );
      } else {
        // INSERT NEW GOAL
        db.query(
          `INSERT INTO savings_goals
           (
             user_id,
             goal_amount,
             extra_savings,
             target_date
           )
           VALUES (?, ?, ?, ?)`,
          [
            userId,
            goal_amount,
            extra_savings,
            target_date,
          ],
          (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              success: true,
              message: "Goal Created Successfully",
            });
          }
        );
      }
    }
  );
};