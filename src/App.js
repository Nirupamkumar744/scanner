
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import RiskRewardCalculator from "./Components/RiskRewardCalculator"; // Import the calculator
import TickerTape from "./Widgets/TickerTape";
import MarketPulse from "./Components/MarketPulse";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/calculator" element={<RiskRewardCalculator />} /> {/* New route */}
        <Route path="/tickertape" element={<TickerTape/>} />
        <Route path="/marketpulse" element={<MarketPulse/>} />
        
        
        
      </Routes>
    </Router>
  );
}

export default App;
