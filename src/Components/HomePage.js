import React, { useEffect, useState } from "react";
import TickerTape from "../Widgets/TickerTape"; // Ensure this component exists

const HomePage = () => {
  const [gainers, setGainers] = useState(() => {
    const savedGainers = localStorage.getItem("gainers");
    return savedGainers ? JSON.parse(savedGainers) : [];
  });

  const [losers, setLosers] = useState(() => {
    const savedLosers = localStorage.getItem("losers");
    return savedLosers ? JSON.parse(savedLosers) : [];
  });

  const fetchStockData = async () => {
    try {
      const response = await fetch("https://web-production-467e.up.railway.app/stocks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched Stock Data:", data); // Log the fetched data

      const gainersList = [];
      const losersList = [];

      // Iterate through the stock data for gainers
      for (const stock in data.gainers) {
        const stockData = data.gainers[stock];
        const formattedStock = {
          stock: stock.replace('.NS', ''), // Remove .NS from the stock symbol
          price: stockData.current_price, // Current price from the object
          change: stockData.percentage_change // Percentage change from the object
        };

        gainersList.push(formattedStock);
      }

      // Iterate through the stock data for losers
      for (const stock in data.losers) {
        const stockData = data.losers[stock];
        const formattedStock = {
          stock: stock.replace('.NS', ''), // Remove .NS from the stock symbol
          price: stockData.current_price, // Current price from the object
          change: stockData.percentage_change // Percentage change from the object
        };

        losersList.push(formattedStock);
      }

      console.log("Gainers List:", gainersList); // Log gainers list
      console.log("Losers List:", losersList); // Log losers list

      // Sort gainers in descending order
      gainersList.sort((a, b) => b.change - a.change);
      // Sort losers in ascending order
      losersList.sort((a, b) => a.change - b.change);

      setGainers(gainersList);
      setLosers(losersList);
      localStorage.setItem("gainers", JSON.stringify(gainersList)); // Save to local storage
      localStorage.setItem("losers", JSON.stringify(losersList)); // Save to local storage
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially when the component mounts
    fetchStockData();

    // Set up interval to fetch data every 60 seconds
    const intervalId = setInterval(() => {
      console.log("Fetching new data..."); // Log when fetching new data
      fetchStockData();
    }, 60000); // 60000 milliseconds = 60 seconds

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const styles = `
      /* Importing Google Fonts */
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

      body {
        font-family: "Poppins", sans-serif;
        margin: 0;
        padding: 0;
        background: black;
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
        width : 4px; /* Set scrollbar width to 4px */
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
        margin-bottom: 0;
      }

      .logo img {
        width: 140px;
        height: 140px;
        margin-bottom: 0;
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
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        color: white;
        min-height: 100vh;
        position: relative;
      }

      .ticker-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        z-index: 1;
        margin-bottom: 20px;
      }

      .ticker-container-right {
        width: 97.5%;
        height: auto; /* Allow height to adjust based on content */
        background: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1738238118/360_F_293943271_zd4kkAHnnryKiyIdRMAX2McgijQ0mrOb_d18vhh.jpg') no-repeat center center; 
        background-size: cover; /* Ensure the background covers the entire container */
        box-shadow: 0 4px 20px rgba(255, 215, 0, 0.5);
        padding: 15px;
        border-radius: 8px;
        color: #2e2e2e;
        margin-top: 20px;
        border: 2px solid #ffcc00;
        display: flex;
        justify-content: space-between;
        position: relative;
      }

      .Gainer,
      .Looser {
        flex: 1;
        margin: 0 10px;
        padding: 20px;
        background: #f5f5f5;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #2e2e2e;
        font-size: 18px;
        overflow: hidden; /* Ensure content doesn't overflow */
      }

      .table-container {
        width: 100%;
        overflow-y: auto; /* Enable vertical scrolling */
        max-height: 400px; /* Set a max height for the table */
        scroll-behavior: smooth; /* Enable smooth scrolling */
      }

      .table {
        width: 100%;
        border-collapse: collapse;
        border-radius: 8px;
        overflow: hidden; /* Ensure rounded corners are visible */
      }

      th, td {
        padding: 12px 15px; /* Increased padding for better spacing */
        text-align: left;
        border-bottom: 1px solid #ddd;
        font-size: 16px;
      }

      th {
        background-color: rgb(0, 0, 0);
        color: #fff;
        font-weight: bold;
        position: sticky; /* Make header sticky */
        top: 0; /* Stick to the top */
        z-index: 1; /* Ensure it stays above other content */
      }

      tr:nth-child(even) {
        background-color: rgb(68, 219, 214);
      }

      tr:hover {
        background-color: #f1f1f1;
        transform: scale(1.02);
        transition: all 0.3s ease-in-out;
      }

      td {
        color: #333;
      }

      td.green {
        color: #28a745;
      }

      td.red {
        color: #dc3545;
      }

      .table-container::-webkit-scrollbar {
        width: 4px; /* Set scrollbar width to 4px */
      }

      .table-container::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
      }

      .table-container::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }

      .heading {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .gainer-heading {
        color: #28a745; /* Green color for Gainers heading */
      }

      .loser-heading {
        color: #dc3545; /* Red color for Losers heading */
      }

      .chart-icon {
        width: 30px; /* Set width for the chart icon */
        height: 30px; /* Set height for the chart icon */
        cursor: pointer; /* Change cursor to pointer on hover */
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
    <div>
      <div className="sidebar">
        <div className="logo">
          <img src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
          <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Crypto/Forex</a></li>
          <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li>
          <li><a href="/tradejournal"><i className="fa fa-book"></i>Trading Journal</a></li>
          <li><a href="/technical"><i className="fa fa-video"></i>Technical Analysis</a></li>
          <li><a href="/calcu"><i className="fa fa-calendar-check"></i>Calculator</a></li>
        </ul>
      </div>
      <div className="content">
        <div className="ticker-container">
          <TickerTape gainers={gainers} losers={losers} />
        </div>
        <div className="ticker-container-right">
          <div className="Gainer">
            <h2 className="heading gainer-heading">Top Gainers</h2>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Price (₹)</th>
                    <th>Change (%)</th>
                    <th>Chart</th> {/* Added Chart column */}
                  </tr>
                </thead>
                <tbody>
                  {gainers.map((gainer, index) => (
                    <tr key={index}>
                      <td>{gainer.stock}</td>
                      <td>₹{gainer.price.toFixed(2)}</td>
                      <td className={gainer.change > 0 ? 'green' : 'red'}>
                        {gainer.change.toFixed(2)}%
                      </td>
                      <td>
                        <a href={`https://in.tradingview.com/chart/tioZvgwv/?symbol=NSE%3A${gainer.stock.toUpperCase()}`} target="_blank" rel="noopener noreferrer">
                          <img
                            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737371645/HIGH_POWER_STOCKS_light_pmbvli.webp"
                            alt="Chart"
                            className="chart-icon"
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="Looser">
            <h2 className="heading loser-heading">Top Losers</h2>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Price (₹)</th>
                    <th>Change (%)</th>
                    <th>Chart</th> {/* Added Chart column */}
                  </tr>
                </thead>
                <tbody>
                  {losers.map((loser, index) => (
                    <tr key={index}>
                      <td>{loser.stock}</td>
                      <td>₹{loser.price.toFixed(2)}</td>
                      <td className={loser.change < 0 ? 'red' : 'green'}>
                        {loser.change.toFixed(2)}%
                      </td>
                      <td>
                        <a href={`https://in.tradingview.com/chart/tioZvgwv/?symbol=NSE%3A${loser.stock.toUpperCase()}`} target="_blank" rel="noopener noreferrer">
                          <img
                            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737371645/HIGH_POWER_STOCKS_light_pmbvli.webp"
                            alt="Chart"
                            className="chart-icon"
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;