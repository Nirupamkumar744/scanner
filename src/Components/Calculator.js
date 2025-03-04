import React, { useState, useEffect } from "react";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path
import NavBar from "./NavBar/NavBar";
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
        background: black; /* Dark background for contrast */
        overflow-x: hidden;
      }

      .content {
        background-color: black;
        color: white; /* Set text color to white for better contrast */
        min-height: 100vh; /* Ensure the content area takes at least full viewport height */
      }

      .blur {
        filter: blur(5px); /* Blur effect on content */
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
      <NavBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <div className={`content ${isNavOpen ? 'blur' : ''}`}>
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