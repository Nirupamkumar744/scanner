import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import RiskRewardCalculator from "./Components/RiskRewardCalculator";
import TickerTape from "./Widgets/TickerTape";
import MarketPulse from "./Components/MarketPulse";

const PrivateRoute = ({ element: Element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login status from localStorage
  return isLoggedIn ? <Element /> : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));

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
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute element={() => <HomePage onLogout={handleLogout} />} />} />
        <Route path="/calculator" element={<PrivateRoute element={RiskRewardCalculator} />} />
        <Route path="/tickertape" element={<PrivateRoute element={TickerTape} />} />
        <Route path="/marketpulse" element={<PrivateRoute element={MarketPulse} />} />
      </Routes>
    </Router>
  );
};

export default App;
