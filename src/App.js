
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import TickerTape from "./Widgets/TickerTape";
import MarketPulse from "./Components/MarketPulse";
import Calculator from "./Components/Calculator";
import InsiderStrategy from "./Components/InsiderStrategy";
import Technical from "./Components/Technical"
import StockHeatmap from "./Components/stockheatmap";
import TradeJournal from "./Components/tradejournal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tickertape" element={<TickerTape/>} />
        <Route path="/marketpulse" element={<MarketPulse/>} />
        <Route path="/calcu" element={<Calculator/>} />
        <Route path="/insiderstrategy" element ={<InsiderStrategy/>} />
        <Route path="/technical" element ={<Technical/>} />
        <Route path="/heat" element ={<StockHeatmap />} />
        <Route path="/tradejournal" element ={<TradeJournal/>} />
      </Routes>
    </Router>
  );
}

export default App;
