import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape";

const Calculator = () => {
  const [investment, setInvestment] = useState("");
  const [tenure, setTenure] = useState("");
  const [rate, setRate] = useState("");
  const [futureValue, setFutureValue] = useState(null);

  const calculateSIP = () => {
    if (!investment || !tenure || !rate) {
      setFutureValue("Please fill all fields correctly.");
      return;
    }
    const r = rate / 100 / 12;
    const n = tenure * 12;
    const fv = investment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setFutureValue(fv.toFixed(2));
  };

  useEffect(() => {
    const styles = `
      /* Importing Google Fonts */
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

      body {
        font-family: "Poppins", sans-serif;
        margin: 0;
        padding: 0;
        background: #1a1a1a; /* Dark background for contrast */
        overflow-x: hidden;
      }

      /* Sidebar Styles */
      .sidebar {
        width: 250px;
        height: 100vh;
        background-image: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1737099004/Flux_Dev_Create_a_tall_rectangular_banner_background_with_an_u_1_oyb158.jpg');
        background-size: cover;
        background-position: center;
        position: fixed;
        top: 0;
        left: 0;
        padding: 20px 0;
        color: white;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
        z-index: 2;
        overflow-y: auto;
      }

      .sidebar::-webkit-scrollbar {
        width: 4px; /* Set scrollbar width to 4px */
      }

      .sidebar::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
      }

      .sidebar::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }

      .logo {
        text-align: center;
        margin-bottom: 20px;
      }

      .logo img {
        width: 140px;
        height: 140px;
        margin-bottom: 20px;
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
    background-image: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1738238118/360_F_293943271_zd4kkAHnnryKiyIdRMAX2McgijQ0mrOb_d18vhh.jpg');
    background-size: cover; /* Ensure the background covers the entire area */
    background-position: center; /* Center the background image */
    background-repeat: no-repeat; /* Prevent the background from repeating */
    color: white; /* Set text color to white for better contrast */
    min-height: 100vh; /* Ensure the content area takes at least full viewport height */
    position: relative; /* Maintain relative positioning */
}

      .ticker-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        z-index: 1;
        margin-bottom: 20px;
      }

      /* Calculator Styles */
      .calculator-container {
        padding: 20px;
      }

      .calculator {
        background: rgba(255, 255, 255, 0.95); /* Light background for calculator */
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .calculator h2 {
        color: #333; /* Darker color for the heading */
        margin-bottom: 20px;
      }

      .calculator-inputs label {
        display: block;
        margin-bottom: 10px;
        color: #555; /* Darker color for labels */
      }

      .calculator-inputs input {
        width: 98%;
        padding: 10px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition: border-color 0.3s;
      }

      .calculator-inputs input:focus {
        border-color: #ffcc00; /* Highlight border on focus */
        outline: none; /* Remove default outline */
      }

      .button-container {
        margin-top: 20px;
      }

      .button-container button {
        background-color: #ffcc00; /* Button color */
        color: #333; /* Button text color */
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
      }

      .button-container button:hover {
        background-color: #e6b800; /* Darker shade on hover */
        transform: scale(1.05); /* Slightly enlarge on hover */
      }

      .calculator-result {
        margin-top: 20px;
        font-size: 18px;
        font-weight: bold;
        color: #333; /* Darker color for result text */
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <h2>Investment Calculator</h2>
        <div className="calculator-inputs">
          <label>
            Monthly Investment (₹):
            <input
              type="number"
              placeholder="Enter monthly investment"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
            />
          </label>
          <label>
            Investment Tenure (years):
            <input
              type="number"
              placeholder="Enter tenure in years"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
            />
          </label>
          <label>
            Expected Return Rate (% per annum):
            <input
              type="number"
              placeholder="Enter expected return"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </label>
          <div className="button-container">
            <button onClick={calculateSIP}>Calculate</button>
          </div>
        </div>
        {futureValue && (
          <div className="calculator-result">
            {typeof futureValue === "string" ? (
              <p>{futureValue}</p>
            ) : (
              <p>Future Value: ₹{futureValue}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png"
            alt="Logo"
          />
        </div>
        <ul className="nav-links">
          <li>
            <a href="/home">
              <FaHome style={{ marginRight: "10px", color: "yellow" }} /> Home
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-chart-line"></i>Crypto/Forex
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-cogs"></i>Insider Strategy
            </a>
          </li>
          <li>
            <a href="/heat">
              <i className="fa fa-signal"></i>Heatmap
            </a>
          </li>
          <li>
            <a href="/tradejournal">
              <i className="fa fa-book"></i>Trading Journal
            </a>
          </li>
          <li>
            <a href="/technical">
              <i className="fa fa-book"></i>Technical Analysis
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