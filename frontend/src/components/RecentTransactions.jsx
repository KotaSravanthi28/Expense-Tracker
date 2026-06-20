import { useEffect, useState } from "react";
import api from "../services/api";

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const fetchRecentTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recent-card">
      <h2>Recent Transactions</h2>

      {transactions.length > 0 ? (
        transactions.map((item) => (
          <div
            key={item.id}
            className="recent-item"
          >
            <div>
              <strong>{item.category}</strong>
              <p>{item.description}</p>
            </div>

            <div
              style={{
                color:
                  item.type === "income"
                    ? "green"
                    : "red",
                fontWeight: "bold",
              }}
            >
              ₹{item.amount}
            </div>
          </div>
        ))
      ) : (
        <p>No Transactions Found</p>
      )}
    </div>
  );
}

export default RecentTransactions;