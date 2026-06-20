import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import { useState, useEffect } from "react";
import Profile from "./pages/Profile";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  
  return (
    <>
      
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;