import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import RiskRewardCalculator from "./Components/RiskRewardCalculator"; 
import TickerTape from "./Widgets/TickerTape";
import MarketPulse from "./Components/MarketPulse";

// Simulated authentication function
const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true"; // Example logic
};

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/calculator"
          element={
            <PrivateRoute>
              <RiskRewardCalculator />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickertape"
          element={
            <PrivateRoute>
              <TickerTape />
            </PrivateRoute>
          }
        />
        <Route
          path="/marketpulse"
          element={
            <PrivateRoute>
              <MarketPulse />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
