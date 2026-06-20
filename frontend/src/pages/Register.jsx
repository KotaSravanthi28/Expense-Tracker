import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import api from "../services/api";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {/* Left Side */}
        <div className="auth-left">
          <FaWallet size={60} />

          <h1>Expense Tracker</h1>

          <p>
            Manage your finances with confidence.
          </p>

          <p>
            Track income and expenses in one place.
          </p>

          <p>
            Analyze spending with beautiful charts.
          </p>

          <p>
            Stay organized and achieve your financial goals.
          </p>
        </div>

        {/* Right Side */}
        <div className="auth-right">
          <h2 style={{color:"black"}}>Create Account</h2>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Create Account
            </button>
          </form>

          <div className="auth-link">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;