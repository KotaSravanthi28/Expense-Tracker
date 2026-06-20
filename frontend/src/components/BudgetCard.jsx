import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/budget.css";

function BudgetCard({ totalExpense }) {
  const [budget, setBudget] = useState(0);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const percentage = (totalExpense / budget) * 100;


  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/user/budget", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBudget(res.data.budget);
  };

  const updateBudget = async () => {
    const token = localStorage.getItem("token");

    await api.put(
      "/user/budget",
      { budget: value },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEdit(false);
    fetchBudget();
  };

  const remaining = budget - totalExpense;

  return (
    <div className="budget-card" style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h3>Monthly Budget</h3>

      <h4>
        {percentage < 70
          ? "✅ Budget Healthy"
          : percentage < 90
          ? "⚠️ Near Limit"
          : "🚨 Budget Exceeded"}
      </h4>

      {!edit ? (
        <>
          <p>Budget: ₹{budget}</p>
          <p>Remaining: ₹{remaining}</p>

          <button onClick={() => setEdit(true)}>Set Budget</button>
        </>
      ) : (
        <>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter budget"
          />

          <button className="budget-btn"
           onClick={updateBudget}>Save</button>
        </>
      )}
    </div>
  );
}

export default BudgetCard;