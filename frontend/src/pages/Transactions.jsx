import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import "../styles/transactions.css";
import Sidebar from "../components/Sidebar";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [editingTransaction, setEditingTransaction] = useState(null);

  // ✅ Budget state (FIXED)
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    fetchTransactions();

    // optional: load budget from localStorage
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) setBudget(Number(savedBudget));
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Search + Filter
  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch = item.category
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  // Summary
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const incomeCount = transactions.filter(
    (t) => t.type === "income"
  ).length;

  const expenseCount = transactions.filter(
    (t) => t.type === "expense"
  ).length;

  // ✅ SAFE budget calculation
  //const remaining = budget - totalExpense;

  return (
    <>
      <Navbar
         toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
          }
       />
      <Sidebar open={sidebarOpen} />

      <div className="transactions-container">
        <h1 >Transactions</h1>

        {/* Summary Counts */}
        <div className="count-row">
          <p><strong>Income Entries:</strong> {incomeCount}</p>
          <p><strong>Expense Entries:</strong> {expenseCount}</p>
          <p><strong>Total Transactions:</strong> {transactions.length}</p>
        
        </div>

        {/* Summary Cards */}

        <div style={{ display: "flex", gap: "50px", marginBottom: "20px", }} ></div>
        <div className="summary-row">
          <div className="summary-card income"
          style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", }}
          >
            <h3>Total Income</h3>
            <h2>₹{totalIncome.toLocaleString()}</h2>
          </div>

          <div className="summary-card expense"
          style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", }}
          >
            <h3>Total Expense</h3>
            <h2>₹{totalExpense.toLocaleString()}</h2>
          </div>

          <div className="summary-card balance"
          style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", }}
          >
            <h3>Balance</h3>
            <h2>₹{balance.toLocaleString()}</h2>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="filter-row">
          <input
            type="text"
            placeholder="Search Category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Transaction Form */}
        <TransactionForm
          refreshTransactions={fetchTransactions}
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction}
        />

        {/* Transaction Table */}
        <TransactionTable
          transactions={filteredTransactions}
          refreshTransactions={fetchTransactions}
          setEditingTransaction={setEditingTransaction}
        />

        
      </div>
    </>
  );
}

export default Transactions;