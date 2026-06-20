import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import BudgetCard from "../components/BudgetCard";
import WelcomeBanner from "../components/WelcomeBanner";
import RecentTransactions from "../components/RecentTransactions";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import SavingsGoal from "../components/SavingsGoal";
import SavingsEntries
from "../components/SavingsEntries";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [budget, setBudget] = useState(0);
  const [sidebarOpen, setSidebarOpen] =useState(false);
  const [refreshSavings, setRefreshSavings] =
  useState(false);

  useEffect(() => {
    fetchSummary();
    fetchCategoryData();
    fetchMonthlyData();
    fetchBudget();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/dashboard/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategoryData(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/dashboard/monthly", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMonthlyData(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBudget = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudget(res.data.budget || 0);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      <Navbar 
         toggleSidebar={()=>
          setSidebarOpen(!sidebarOpen)
        }
      />
      <Sidebar open={sidebarOpen} />

      <div className={`dashboard-container ${
              sidebarOpen ? "sidebar-open" : ""
            }`}>
        <div style={{ padding: "20px" }}>
           <WelcomeBanner />
        </div> 
        <h1 className="dashboard-title" >
          Expense Tracker Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="dashboard-cards">
          <StatCard
            title="Total Income"
            amount={summary.totalIncome}
          />

          <StatCard
            title="Total Expense"
            amount={summary.totalExpense}
          />

          <StatCard
            title="Balance"
            amount={summary.balance}
          />
        </div>

        <BudgetCard
            budget={budget}
            totalExpense={summary.totalExpense}
          />

        {/* Charts */}
        <div className="charts-row">

          <div className="chart-card">
            <h2>Expense Categories</h2>

            <div className="pie-chart-container">
              <ExpensePieChart
                chartData={{
                  labels: categoryData.map(
                    (item) => item.category
                  ),
                  datasets: [
                    {
                      data: categoryData.map(
                        (item) => item.amount
                      ),
                      backgroundColor: [
                        "#6366f1",
                        "#8b5cf6",
                        "#ec4899",
                        "#14b8a6",
                        "#f59e0b",
                        "#06b6d4",
                        "#84cc16",
                        "#f97316",
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h2>Monthly Expenses</h2>

            <div className="bar-chart-container">
              <MonthlyBarChart
                chartData={{
                  labels: monthlyData.map(
                    (item) => `Month ${item.month}`
                  ),
                  datasets: [
                    {
                      label: "Expenses",
                      data: monthlyData.map(
                        (item) => item.amount
                      ),
                      backgroundColor: "#6366f1",
                      borderRadius: 12,
                    },
                  ],
                }}
              />
            </div>
           
          </div>  

        </div>
            
            <div className="savings-section">
              <SavingsGoal
                balance={summary.balance}
                refreshSavings={refreshSavings}
              />             
              <SavingsEntries 
                 
                 setRefreshSavings={setRefreshSavings}
              />  
            </div>


        {/* Monthly Chart */}
            <div className="recent-card">
              <RecentTransactions />
            </div>



      </div>
    </>
  );
}

export default Dashboard;