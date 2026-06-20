import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import "./styles/global.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
