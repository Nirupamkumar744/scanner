import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import TickerTape from "./Widgets/TickerTape";
import MarketPulse from "./Components/MarketPulse";
import Calculator from "./Components/Calculator";
import InsiderStrategy from "./Components/InsiderStrategy";
import Technical from "./Components/Technical";
import StockHeatmap from "./Components/stockheatmap"; 
import TradeJournal from "./Components/tradejournal"; 
import ProtectedRoute from "./Components/ProtectedRoutes"; 
import { AuthProvider } from "./Components/AuthContext"; 
import LandingPage from "./Components/LandingPage";
import Payment from "./Components/Payment";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pay" element={<Payment/>} />
          
          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickertape"
            element={
              <ProtectedRoute>
                <TickerTape />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketpulse"
            element={
              <ProtectedRoute>
                <MarketPulse />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/insiderstrategy"
            element={
              <ProtectedRoute>
                <InsiderStrategy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/technical"
            element={
              <ProtectedRoute>
                <Technical />
              </ProtectedRoute>
            }
          />
          <Route
            path="/heat"
            element={
              <ProtectedRoute>
                <StockHeatmap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tradejournal"
            element={
              <ProtectedRoute>
                <TradeJournal />
              </ProtectedRoute>
            }
          />
            <Route
            path="/calcu"
            element={
              <ProtectedRoute>
                <Calculator />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;