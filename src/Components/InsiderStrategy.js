import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path

const InsiderBar = () => {
  const [insiderData, setInsiderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch data
  const fetchData = () => {
    const sheetUrl =
      "https://sheets.googleapis.com/v4/spreadsheets/12NfyGohJkZdAN-9ZoYDgsjY2rHxyXMtkySKoDhe1XqE/values/Sheet1?key=AIzaSyDPwn94kQkwHk3PosdY1gg184lXM_jGoic";  // Your API key is included here

    fetch(sheetUrl)
      .then((response) => response.json())
      .then((data) => {
        // Extract values and map them into the desired format
        const rows = data.values.slice(1); // Skip header row
        const formattedData = rows.map((row) => ({
          stock: row[1], // Column B for stock
          currentPrice: row[0], // Column A for current price
          chartLink: `https://in.tradingview.com/chart/tioZvgwv/?symbol=NSE%3A${row[1]}`, // Updated chart link
          technicalsLink: `https://in.tradingview.com/symbols/NSE-${row[1]}/technicals/`,
        }));
        setInsiderData(formattedData);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  // Fetch data initially and then refresh every 60 seconds
  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 60000); // Refresh every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = insiderData.filter((data) =>
    data.stock.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to scroll to the stock symbol
  const scrollToSymbol = (symbol) => {
    const element = document.getElementById(symbol);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="insider-bar">
      <div className="header">
        <h2>
          Inside Bar
          <span className="tooltip">💡</span>
        </h2>
        <input
          type="text"
          className="search-box"
          placeholder="Search Symbol..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

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
            {filteredData.map((data, index) => (
              <tr key={index} id={data.stock} onClick={() => scrollToSymbol(data.stock)}>
                <td>{data.stock}</td>
                <td>{data.currentPrice}</td>
                <td>
                  <a href={data.chartLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737371645/HIGH_POWER_STOCKS_light_pmbvli.webp"
                      alt="Chart Icon"
                      width="25"
                      style={{ cursor: "pointer", margin: "0 auto" }}
                    />
                  </a>
                </td>
                <td>
                  <a href={data.technicalsLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://img.icons8.com/ios/452/settings.png"
                      alt="Technical Icon"
                      width="25"
                      style={{ cursor: "pointer", margin: "0 auto" }}
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="insider-bar-container">
        <div className="bullish-insider-bar">
          <h3>Bullish Insider Bar🐂</h3>
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
              
            </tbody>
          </table>
        </div>

        <div className="bearish-insider-bar">
          <h3>Bearish Insider Bar🐻</h3>
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
              {/* Add any rows for bearish insider data here */}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .insider-bar {
          background: #121212;
          color: #f4f4f4;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 100%;
          margin: 20px auto;
          font-family: 'Bebas Neue', sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .insider-bar h2 {
          font-size: 32px;
          font-weight: bold;
        }

        .tooltip {
          position: relative;
          cursor: pointer;
        }

        .search-box {
          padding: 10px 15px;
          font-size: 16px;
          border-radius: 8px;
          border: 1px solid #444;
          background: #333;
          color: white;
          width: 250px;
        }

        .table-container {
          background: #1c1c1c;
          border-radius: 10px;
          width: 100%;
          height: 400px;
          overflow-y: auto;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: #1c1c1c;
        }

        th,
        td {
          padding: 12px;
          text-align: center;
          border: 1px solid #444;
          color: Black;
        }

        th {
          background: #2c3e50;
          font-weight: bold;
          height: 50px;
        }

        tbody tr:nth-child(even) {
          background-color: rgb(110, 244, 251);
        }

        tbody tr:nth-child(odd) {
          background-color: rgb(241, 248, 110);
        }

        tbody tr:hover {
          background-color: #1abc9c;
          color: white;
        }

        tbody td {
          transition: background-color 0.3s ease;
        }

        tbody tr:hover td {
          background-color: #16a085;
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

        /* Table heading fixed and prevents rows from appearing behind */
        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background: #2c3e50;
        }

        tbody {
          position: relative;
        }

        tbody tr {
          background: transparent;
        }

        tbody tr:nth-child(even) {
          background-color: rgb(110, 244, 251);
        }

        tbody tr:nth-child(odd) {
          background-color: rgb(241, 248, 110);
        }

        .insider-bar-container {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
        }

        .bullish-insider-bar,
        .bearish-insider-bar {
          background: #2c3e50;
          color: #f4f4f4;
          width: 45%;
          height: 300px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .bullish-insider-bar {
          background-color: #27ae60;
        }

        .bearish-insider-bar {
          background-color: #e74c3c;
        }

        .bullish-insider-bar h3,
        .bearish-insider-bar h3 {
          font-size: 24px;
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
            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png"
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
            <a href="/marketpulse">
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
            <a href="/technical">
              <i className="fa fa-video"></i>Technical Analysis
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
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          background: black;
          overflow-x: hidden;
        }

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
