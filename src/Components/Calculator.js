import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path

const Calculator = () => {
  const [investment, setInvestment] = useState("");
  const [price, setPrice] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!investment || !price || !riskPercent) {
      setResult("Please fill all fields correctly.");
      return;
    }

    // Calculate the number of shares to buy based on the risk percentage
    const riskAmount = (investment * riskPercent) / 100;
    const sharesToBuy = Math.floor(riskAmount / price);  // Number of shares to buy based on the risk tolerance

    setResult({
      sharesToBuy,
      riskAmount: riskAmount.toFixed(2),
    });
  };

  return (
    <div className="calculator">
      <h2>Advanced Stock Market Calculator</h2>
      <div className="calculator-inputs">
        <label>
          Total Capital (₹):
          <input
            type="number"
            placeholder="Enter your total capital"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
          />
        </label>
        <label>
          Price per Share (₹):
          <input
            type="number"
            placeholder="Enter price per share"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Risk Percentage (%):
          <input
            type="number"
            placeholder="Enter risk percentage"
            value={riskPercent}
            onChange={(e) => setRiskPercent(Number(e.target.value))}
          />
        </label>
        <button onClick={calculate}>Calculate</button>
      </div>
      {result && (
        <div className="calculator-result">
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <>
              <p>Shares to Buy: {result.sharesToBuy}</p>
              <p>Risk Amount (₹): {result.riskAmount}</p>
            </>
          )}
        </div>
      )}
      <style jsx>{`
        .calculator {
          background: #2c3e50;
          color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          width: calc(100% - 40px);
          height: calc(100vh - 40px);
          margin: 20px auto;
          font-family: "Poppins", sans-serif;
        }

        .calculator h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .calculator-inputs label {
          display: block;
          margin-bottom: 15px;
          font-size: 14px;
        }

        .calculator-inputs input {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: none;
          border-radius: 4px;
        }

        .calculator-inputs button {
          background: #4a69bd;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 15px;
          width: 100%;
          font-weight: bold;
        }

        .calculator-inputs button:hover {
          background: #3b5998;
        }

        .calculator-result {
          text-align: center;
          margin-top: 20px;
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1734769382/Add_a_heading__1_-removebg-preview_gpcqii.png"
            alt="Logo"
          />
        </div>
        <ul className="nav-links">
          <li>
            <a href="/home">
              <FaHome style={{ marginRight: "10px", color: "yellow" }} />
              Home
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-chart-line"></i>Market Pulse
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-cogs"></i>Insider Strategy
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-th"></i>Sector Scope
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-signal"></i>Swing Spectrum
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-clock"></i>Option Clock
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-users"></i>FII / DII
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-arrow-up"></i>Index Mover
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-book"></i>Trading Journal
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-graduation-cap"></i>Trade Tutor
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-video"></i>Strategy Video
            </a>
          </li>
          
        </ul>
      </div>

      <div className="content">
        <div className="ticker-container">
          <TickerTape />
        </div>
        {children}
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

        .layout-container {
          font-family: "Poppins", sans-serif;
          margin: 0;
          padding: 0;
          background: black;
          overflow-x: hidden;
        }

        .sidebar {
          width: 250px;
          height: 100vh;
          background: linear-gradient(180deg, #2c3e50, #4a69bd);
          position: fixed;
          top: 0;
          left: 0;
          padding: 20px 0;
          color: white;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
          z-index: 2;
          overflow-y: auto;
        }

        .logo img {
          width: 140px;
          height: 140px;
        }

        .nav-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-links li {
          margin: 10px 0;
        }

        .nav-links li a {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .nav-links li a i {
          margin-right: 10px;
          color: gold;
        }

        .nav-links li a:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        .content {
          margin-left: 250px;
          padding: 20px;
        }

        .ticker-container {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

const App = () => {
  return (
    <Layout>
      <Calculator />
    </Layout>
  );
};

export default App;
