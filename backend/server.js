const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const goalRoutes= require("./routes/goalRoutes");
const savingsRoutes =
require("./routes/savingsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/savings", savingsRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Tracker API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});