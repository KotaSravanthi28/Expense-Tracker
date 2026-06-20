import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import api from "../services/api";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa"

function Navbar({toggleSidebar}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  
  return (
    <div className="navbar">

      <div className="navbar-left">
        <button
             className="menu-btn"
             onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h2>💰 Expense Tracker</h2>
      </div>
     
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >

        <Link to="/profile">Profile</Link>

        <Link
          to="/dashboard"
          style={{ color: "white" }}
        >
          Dashboard
        </Link>

        <Link
          to="/transactions"
          style={{ color: "white" }}
        >
          Transactions
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

        <button style={{background :"#a6a6b570"}}
        onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? "☀ " : "🌙 "}
        </button>

      
      </div>
    </div>
  );
}

export default Navbar;