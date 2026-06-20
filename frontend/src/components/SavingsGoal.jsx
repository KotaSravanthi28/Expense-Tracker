import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";

function SavingsGoal({ balance, refreshSavings, }) {
  const [goal, setGoal] = useState("");
  const [extraSavings, setExtraSavings] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [savedAmount, setSavedAmount] = useState(0);

  useEffect(() => {
    fetchGoal();
    fetchSavingsTotal();
  }, [refreshSavings]);

  const fetchGoal = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/goal", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoal(res.data.goal_amount || "");
      setExtraSavings(res.data.extra_savings || "");

      setTargetDate(
        res.data.target_date
          ? res.data.target_date.split("T")[0]
          : ""
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSavingsTotal = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/savings/total", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedAmount(res.data.total || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const saveGoal = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        "/goal",
        {
          goal_amount: goal,
          extra_savings: extraSavings,
          target_date: targetDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Goal Saved Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Calculations

  const totalSaved =
    Number(balance) +
    Number(extraSavings) +
    Number(savedAmount);

  const remainingAmount = Math.max(
    Number(goal) - totalSaved,
    0
  );

  const percent =
    Number(goal) > 0
      ? Math.min(
          (totalSaved / Number(goal)) * 100,
          100
        )
      : 0;

  const getTimeLeft = () => {
    if (!targetDate) {
      return "No target date";
    }

    const today = new Date();
    const target = new Date(targetDate);

    const diff = target - today;

    if (diff <= 0) {
      return "Goal Date Reached";
    }

    const totalDays = Math.floor(
      diff / (1000 * 60 * 60 * 24)
    );

    const years = Math.floor(
      totalDays / 365
    );

    const months = Math.floor(
      (totalDays % 365) / 30
    );

    const days =
      (totalDays % 365) % 30;

    return `${years} Year${years !== 1 ? "s" : ""}
            ${months} Month${months !== 1 ? "s" : ""}
            ${days} Day${days !== 1 ? "s" : ""}`;
  };

  const target = targetDate
    ? new Date(targetDate)
    : null;

  const today = new Date();

  const daysLeft = target
    ? Math.max(
        Math.ceil(
          (target - today) /
            (1000 * 60 * 60 * 24)
        ),
        0
      )
    : 0;

  const monthsLeft = target
    ? Math.max(
        (
          (target.getFullYear() -
            today.getFullYear()) *
          12
        ) +
          (
            target.getMonth() -
            today.getMonth()
          ),
        1
      )
    : 1;

  const monthlyRequired =
    remainingAmount / monthsLeft;

  return (
    <div className="goal-card">
      <h2 style={{ color: "black" }}>
        🎯 Savings Goal Tracker
      </h2>

      <input
        type="number"
        placeholder="Enter Goal Amount"
        value={goal}
        onChange={(e) =>
          setGoal(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Enter External Savings"
        value={extraSavings}
        onChange={(e) =>
          setExtraSavings(
            e.target.value
          )
        }
      />

      <input
        type="date"
        value={targetDate}
        onChange={(e) =>
          setTargetDate(
            e.target.value
          )
        }
      />

      <button onClick={saveGoal}>
        Save Goal
      </button>

      <hr />

      <p>
        🎯 Goal Amount:
        ₹{Number(goal).toLocaleString()}
      </p>

      <p>
        💰 Account Balance:
        ₹{Number(balance).toLocaleString()}
      </p>

      <p>
        🏦 External Savings:
        ₹{Number(
          extraSavings
        ).toLocaleString()}
      </p>

      <p>
        📂 Savings Entries:
        ₹{Number(
          savedAmount
        ).toLocaleString()}
      </p>

      <p>
        ✅ Total Saved:
        ₹{Number(
          totalSaved
        ).toLocaleString()}
      </p>

      <p>
        📉 Remaining:
        ₹{Number(
          remainingAmount
        ).toLocaleString()}
      </p>

      <p>
        📅 Target Date:
        {targetDate ||
          " Not Set"}
      </p>

      <p>
        ⏳ Time Left:
        {getTimeLeft()}
      </p>

      <p>
        📆 Days Left:
        {daysLeft} Days
      </p>

      <p>
        💵 Required Saving:
        ₹
        {monthlyRequired.toFixed(
          0
        )}
        /month
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percent}%`,
          }}
        ></div>
      </div>

      <p
       className="completion-text"
      >
         🎯 {percent.toFixed(0)}%
        Completed
      </p>
    </div>
  );
}

export default SavingsGoal;