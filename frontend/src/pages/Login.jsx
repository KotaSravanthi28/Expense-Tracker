import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",
        formData
      );

      console.log("Login Response:", res.data);

      login(res.data.token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Left Section */}
        <div className="auth-left">
          <FaWallet size={60} />

          <h1>Expense Tracker</h1>

          <p>
            Track your income and expenses.
          </p>

          <p>
            Visualize spending with charts.
          </p>

          <p>
            Manage your finances smarter.
          </p>

          <p>
            Stay organized and achieve your goals.
          </p>
        </div>

        {/* Right Section */}
        <div className="auth-right">
          <h2 style={{color:"black"}}>Welcome Back</h2>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
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
              Login
            </button>
          </form>

          <div className="auth-link">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;