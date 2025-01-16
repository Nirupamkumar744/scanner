import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path

const InsiderBar = () => {
  const [insiderData, setInsiderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = "AIzaSyDPwn94kQkwHk3PosdY1gg184lXM_jGoic";
  const SHEET_ID = "12NfyGohJkZdAN-9ZoYDgsjY2rHxyXMtkySKoDhe1XqE"; // Sheet ID from Google Sheets URL
  const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/High-Low-Current%20Market%20Price?key=${API_KEY}`;

  // Fetch data from Google Sheets
  useEffect(() => {
    fetch(sheetUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Log the data to check the response
        if (data.values) {
          const sheetData = data.values.slice(1); // Removing the header row
          const formattedData = sheetData.map((row) => ({
            stock: row[0], // Symbol Column (Column A)
            currentPrice: row[3], // Current Price Column (Column D)
            chartLink: `https://in.tradingview.com/chart/tioZvgwv/?symbol=NSE%3A${row[0]}`, // TradingView link with stock symbol
            technicalsLink: `https://in.tradingview.com/symbols/NSE-${row[0]}/technicals/`, // Technicals link with stock symbol
          }));
          setInsiderData(formattedData); // Set the fetched data
        } else {
          setError("No data found in the sheet.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      })
      .finally(() => setLoading(false)); // Stop loading once fetch is complete
  }, []);

  return (
    <div className="insider-bar">
      <h2>Insider Bar</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Current Price</th>
                <th>Chart</th>
                <th>Technicals</th>
              </tr>
            </thead>
            <tbody>
              {insiderData.map((data, index) => (
                <tr key={index}>
                  <td>{data.stock}</td>
                  <td>{data.currentPrice}</td>
                  <td>
                    <a href={data.chartLink} target="_blank" rel="noopener noreferrer">
                      <img
                        src="https://images.emojiterra.com/twitter/v14.0/1024px/1f4c8.png" // Using the provided chart icon
                        alt="Chart Icon"
                        width="25"
                        style={{ cursor: "pointer", margin: "0 auto" }} // Added margin and ensured pointer cursor
                      />
                    </a>
                  </td>
                  <td>
                    <a href={data.technicalsLink} target="_blank" rel="noopener noreferrer">
                      <img
                        src="https://img.icons8.com/ios/452/settings.png"
                        alt="Technical Icon"
                        width="25"
                        style={{ cursor: "pointer", margin: "0 auto" }} // Same for Technical icon
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .insider-bar {
          background: #1c1c1c;
          color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 100%;
          margin: 20px auto;
          font-family: "Poppins", sans-serif;
        }

        .insider-bar h2 {
          text-align: center;
          margin-bottom: 30px;
          font-size: 24px;
        }

        .table-container {
          background: #2c2c2c;
          padding: 20px;
          border-radius: 8px;
          width: 95%;
          margin: 5px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: #1c1c1c; /* Dark background */
        }

        th,
        td {
          padding: 12px;
          text-align: center;
          border: 1px solid #444;
          color: white; /* White text color */
        }

        th {
          background: #34495e;
        }

        tbody tr:nth-child(even) {
          background-color: #2d2d2d;
        }

        tbody tr:nth-child(odd) {
          background-color: #262626;
        }

        tbody tr:hover {
          background-color: #34495e;
          color: white;
        }

        a {
          text-decoration: none;
        }

        a:hover {
          opacity: 0.7;
        }

        img {
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        img:hover {
          transform: scale(1.1);
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
      <InsiderBar />
    </Layout>
  );
};

export default App;
