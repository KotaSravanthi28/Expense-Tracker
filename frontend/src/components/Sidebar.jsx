import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar({ open }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`sidebar ${open ? "open" : ""}`}>

        <div className="sidebar-header">
            <h2>💰 Expense Tracker</h2>
        </div>
      
      <Link to="/dashboard">
        <FaHome /> Dashboard
      </Link>

      <Link to="/transactions">
        <FaWallet /> Transactions
      </Link>

      <Link to="/profile">
        <FaUser /> Profile
      </Link>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default Sidebar;