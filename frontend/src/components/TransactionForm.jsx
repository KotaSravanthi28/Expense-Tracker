import { useState, useEffect } from "react";
import api from "../services/api";

function TransactionForm({
  refreshTransactions,
  editingTransaction,
  setEditingTransaction,
}) {
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    description: "",
    transaction_date: "",
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        type: editingTransaction.type || "expense",
        category: editingTransaction.category || "",
        amount: editingTransaction.amount || "",
        description: editingTransaction.description || "",
        transaction_date: editingTransaction.transaction_date
          ? editingTransaction.transaction_date.split("T")[0]
          : "",
      });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!formData.category || !formData.amount) {
        alert("Please fill all required fields");
        return;
      }

      if (editingTransaction) {
        await api.put(
          `/transactions/${editingTransaction.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Transaction Updated");
        setEditingTransaction(null);
      } else {
        await api.post(
          "/transactions",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Transaction Added");
      }

      setFormData({
        type: "expense",
        category: "",
        amount: "",
        description: "",
        transaction_date: "",
      });

      refreshTransactions();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="form-card">
      <h2 style={{color:"black"}}>
        {editingTransaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="form-grid"
      >
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="transaction_date"
          value={formData.transaction_date}
          onChange={handleChange}
        />

        <button type="submit">
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;