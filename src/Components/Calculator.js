import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path

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

      /* Navbar Styles */
      .navbar {
        display: flex;
        justify-content: space-between; /* Space between logo and nav links */
        align-items: center;
        background-color: #252525;
        padding: 5px 20px; /* Reduced padding for a thinner navbar */
        color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        position: relative; /* Position relative for absolute children */
        z-index: 10; /* Ensure navbar is above other content */
      }

      .logo img {
        width: 100px; /* Adjust logo size if needed */
        height: auto; /* Maintain aspect ratio */
      }

      .nav-links {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0;
        transition: transform 0.3s ease; /* Smooth transition for sliding */
        transform: translateX(0); /* Start on-screen */
        margin-left: auto; /* Push nav links to the right */
      }

      .nav-links.open {
        display: flex; /* Show nav links when open */
        flex-direction: column; /* Stack links vertically */
        position: absolute; /* Position absolute for dropdown */
        top: 50px; /* Adjust based on navbar height */
        left: 0;
        background-color: #252525;
        width: 100%;
        padding: 10px 0;
        z-index: 10;
      }

      .nav-links li {
        margin: 0; /* Remove margin for list items */
      }

      .nav-links li a {
        color: white;
        text-decoration: none;
        font-size: 14px; /* Reduced font size for a more compact look */
        font-weight: 500;
        padding: 10px 15px; /* Add padding to make it look like a button */
        transition: background-color 0.3s; /* Transition for hover effect */
        display: flex; /* Use flex to align icon and text */
        align-items: center; /* Center items vertically */
      }

      .nav-links li a:hover {
        background-color: gold; /* Change background on hover */
        color: black; /* Change text color on hover */
      }

      .hamburger {
        display: none; /* Hidden by default */
        flex-direction: column;
        cursor: pointer;
      }

      .hamburger div {
        width: 25px;
        height: 3px;
        background-color: white;
        margin: 4px 0;
        transition: 0.4s;
      }

      .content {
        padding: 20px;
        background-color: #252525;
        color: white; /* Set text color to white for better contrast */
        min-height: 100vh; /* Ensure the content area takes at least full viewport height */
      }

      .ticker-container {
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

      /* Responsive Styles */
      @media (max-width: 768px) {
        .nav-links {
          display: none; /* Hide nav links by default on small screens */
        }

        .nav-links.open {
          display: flex; /* Show nav links when open */
        }

        .hamburger {
          display: flex; /* Show hamburger icon on smaller screens */
        }

        .content {
          margin-left: 0; /* Remove left margin on small screens */
        }
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
  const [isNavOpen, setIsNavOpen] = useState(false); // State to handle nav visibility

  return (
    <div className="layout-container">
      <div className="navbar">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/dyrn2eg1j/image/upload/v1740734340/Add_a_subheading_1_pui9fq.png"
            alt="Logo"
          />
        </div>
        <div className="hamburger" onClick={() => setIsNavOpen(!isNavOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`nav-links ${isNavOpen ? 'open' : ''}`}>
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