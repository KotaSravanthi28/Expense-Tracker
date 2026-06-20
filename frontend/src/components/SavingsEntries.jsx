import { useState, useEffect } from "react";
import api from "../services/api";

function SavingsEntries({setRefreshSavings,}) {
  const [entries, setEntries] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const fetchSavings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/savings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEntries(res.data || []);
    } catch (error) {
      console.log("Fetch Savings Error:", error);
    }
  };

  useEffect(() => {
    fetchSavings();
  }, []);

  const addSavings = async () => {
    try {
      if (!amount || !description) {
        alert("Please fill all fields");
        return;
      }

      const token = localStorage.getItem("token");

      await api.post(
        "/savings",
        {
          amount,
          description,
          created_at: new Date()
            .toISOString()
            .split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAmount("");
      setDescription("");

      fetchSavings();
      setRefreshSavings(prev => !prev);
    } catch (error) {
      console.log("Add Saving Error:", error);
      alert("Failed to add saving");
    }
  };

  const deleteSaving = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/savings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchSavings();
      setRefreshSavings(prev => !prev);
    } catch (error) {
      console.log("Delete Saving Error:", error);
      alert("Failed to delete saving");
    }
  };

  return (
    <div className="savings-card">
      <h2>💰 Savings Entries</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button onClick={addSavings}>
        Add Saving
      </button>

      <hr />

      <div className="savings-list">
        {entries.length === 0 ? (
          <p>No savings added yet</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="saving-item"
            >
              <div className="saving-left">
                <h3>
                  ₹
                  {Number(
                    entry.amount
                  ).toLocaleString()}
                </h3>

                <p>
                  {entry.description}
                </p>
              </div>

              <div className="saving-right">
                <div>
                  {entry.created_at
                    ? entry.created_at
                        .split("T")[0]
                    : ""}
                </div>

                <button
                  className="delete-saving"
                  onClick={() =>
                    deleteSaving(entry.id)
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavingsEntries;