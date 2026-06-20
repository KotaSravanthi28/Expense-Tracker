import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  budget: 0,
  goal: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Real-time Preferences States
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  // Live System Audit Logs Stream
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Profile security settings initialized.", time: "Just now" },
    { id: 2, text: "Successful login detected from client gateway.", time: "10 mins ago" },
    { id: 3, text: "Monthly expense breakdown compiled successfully.", time: "2 hours ago" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setFormData({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchStats = async () => {
     try {
        const token = localStorage.getItem("token");
        const dashboardRes = await api.get("/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        
        
        const goalRes = await api.get("/goal", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        setStats({
            totalIncome:
            dashboardRes.data.totalIncome || 0,
            
            totalExpense:
            dashboardRes.data.totalExpense || 0,

            balance:
            dashboardRes.data.balance || 0,

            budget: 0,

            goal:  
            goalRes.data.goal_amount || 0,
        });

        setNotifications([
            {
                id: 1,
                text: `Current Balance ₹${dashboardRes.data.balance}`,
                time: "Live",
            },
            
            {
                id: 2,
                text: `Savings Goal ₹${goalRes.data.goal_amount}`,
                time: "Live",
            },
            {
                id: 4,
                text: `Total Expense ₹${dashboardRes.data.totalExpense}`,
                time: "Live",
            },
        ]);
    } catch (error) {
        console.log(error);
    }
   };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      await api.put("/user/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Push event into real-time activity log state
      setNotifications((prev) => [
        { 
          id: Date.now(), 
          text: `Account identity updated to "${formData.name}"`, 
          time: "Just now" 
        },
        ...prev
      ]);
      
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      alert("Failed to update profile statistics.");
    }
  };

  const handleToggleSetting = (settingName, currentValue, setVariable) => {
    const newValue = !currentValue;
    setVariable(newValue);
    
    // Dispatch real-time audit metric item instantly
    setNotifications((prev) => [
      { 
        id: Date.now(), 
        text: `Configuration rule "${settingName}" changed to [${newValue ? "ENABLED" : "DISABLED"}]`, 
        time: "Just now" 
      },
      ...prev
    ]);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Syncing security profiles and ledgers...</p>
      </div>
    );
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  // Financial system configuration metrics
  const monthlySpent = stats.totalExpenses;
  
  const progressPercentage = stats.goal>0
                                ?Math.min((stats.balance / stats.goal) * 100, 100):0;

  return (

    <div className={`app-layout ${darkMode ? "dark-theme-active" : ""}`}>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} />

      {/* Main Framework Dashboard Wrapper */}
      <main className={`profile-main-content ${sidebarOpen ? "sidebar-shifted" : ""}`}>
        <div className="profile-dashboard-grid">
          
          {/* LEFT INTERFACE CHANNEL: Primary Identity Card */}
          <section className="profile-card">
            <div className="avatar-wrapper">
              <div className="avatar-fallback-premium">{userInitial}</div>
              <span className="badge-pro">PRO MEMBER</span>
            </div>

            {!editMode ? (
              <div className="profile-details">
                <h2 className="user-display-name">{user.name}</h2>
                <p className="user-display-email">{user.email}</p>
                
                <div className="meta-list">
                  <div className="meta-row">
                    <span className="meta-label">Member Since</span>
                    <span className="meta-value">{user.created_at?new Date(user.created_at).toLocaleDateString() : "N/A" }</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Account Type</span>
                    <span className="meta-value text-monospace">Expense Tracker User</span>
                  </div>
                </div>

                <div className="profile-actions">
                  <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                    ⚙️ Edit Identity Profile
                  </button>
                  <button className="btn btn-outline" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-form">
                <div className="input-group">
                  <label htmlFor="name">Display Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Modify display value"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Modify routing email"
                  />
                </div>

                <div className="profile-actions-horizontal">
                  <button className="btn btn-success" onClick={updateProfile}>
                    Save Config
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT INTERFACE CHANNEL: Analytical Engine, System Prefs & Feeds */}
          <div className="profile-secondary-container">
            
            {/* Live Financial Progress Widget */}
            <section className="stats-panel">
              <h3 className="panel-title">🎯 Savings Goal Progress</h3>
              <div className="budget-status-box">
                <div className="budget-header">
                  <span>Goal Completion</span>
                  <span className="budget-percentage">{progressPercentage.toFixed(0)}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <p className="budget-caption">
                  Saved <strong> ₹{stats.balance} </strong> towards your goal of<strong> ₹{stats.goal}</strong>.
                </p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-title">Total Income</span>
                  <span className="stat-pill pulse-green" >₹{stats.totalIncome}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-title">Total Expense</span>
                  <span className="stat-value">₹{stats.totalExpense}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-title">Current Balance</span>
                  <span className="stat-value">₹{stats.balance}</span>
                </div>
                
                <div className="stat-card">
                  <span className="stat-title">Savings Goal</span>
                  <span className="stat-value">₹{stats.goal}</span>
                </div>
              </div>
            </section>

            {/* Live Interactivity Controls Grid */}
            <section className="stats-panel configuration-panel">
              <h3 className="panel-title">Application Control Settings</h3>
              <div className="settings-controls-list">
                
                <div className="control-row">
                  <div className="control-info">
                    <span className="control-label">Interface Dark Mode</span>
                    <span className="control-description">Invert framework viewport contrast ratios.</span>
                  </div>
                  <button 
                    className={`toggle-switch ${darkMode ? "active" : ""}`}
                    onClick={() => handleToggleSetting("Dark Mode", darkMode, setDarkMode)}
                  >
                    <span className="switch-slider"></span>
                  </button>
                </div>

                <div className="control-row">
                  <div className="control-info">
                    <span className="control-label"> Alerts</span>
                    <span className="control-description">Secure background emails upon account changes.</span>
                  </div>
                  <button 
                    className={`toggle-switch ${emailAlerts ? "active" : ""}`}
                    onClick={() => handleToggleSetting("Email Notifications", emailAlerts, setEmailAlerts)}
                  >
                    <span className="switch-slider"></span>
                  </button>
                </div>

                <div className="control-row">
                  <div className="control-info">
                    <span className="control-label">Multi-Factor Account Protection (2FA)</span>
                    <span className="control-description">Inject advanced dynamic verification on logins.</span>
                  </div>
                  <button 
                    className={`toggle-switch ${twoFactor ? "active" : ""}`}
                    onClick={() => handleToggleSetting("2FA Security Engine", twoFactor, setTwoFactor)}
                  >
                    <span className="switch-slider"></span>
                  </button>
                </div>

              </div>
            </section>

            {/* Audit Tracking Stream Log */}
            <section className="stats-panel log-panel">
              <h3 className="panel-title">Real-Time Core Event Stream</h3>
              <div className="activity-feed">
                {notifications.map((log) => (
                  <div className="feed-item" key={log.id}>
                    <div className="feed-indicator"></div>
                    <div className="feed-content">
                      <p className="feed-text">{log.text}</p>
                      <span className="feed-time">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;