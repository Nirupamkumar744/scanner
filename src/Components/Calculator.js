import React, { useState } from "react";
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
            <a href="/heat">
              <i className="fa fa-signal"></i>Heatmap
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
            <a href="/tradejournal">
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

const styles = `
.calculator-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
.calculator {
  background: #1e1e2e;
  color: #ffffff;
  padding: 30px;
 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1600px;
  height: 92%;
}
.calculator h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #ffd700;
}
.calculator-inputs label {
  display: block;
  margin-bottom: 15px;
}
.calculator-inputs input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
}
.button-container {
  display: flex;
  justify-content: center;
}
button {
  padding: 12px 50px;
  background-color: #ffd700;
  border: none;
  color: #1e1e2e;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background-color: #ffcc00;
}
.calculator-result {
  margin-top: 20px;
  text-align: center;
  font-size: 1.2em;
  color: #ffd700;
}
`;

const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
