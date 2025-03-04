import React, { useEffect, useState } from "react";
import TickerTape from "../Widgets/TickerTape"; // Ensure this component exists
import NavBar from './NavBar/NavBar'

const HomePage = () => {
  const [gainers, setGainers] = useState(() => {
    const savedGainers = localStorage.getItem("gainers");
    return savedGainers ? JSON.parse(savedGainers) : [];
  });

  const [losers, setLosers] = useState(() => {
    const savedLosers = localStorage.getItem("losers");
    return savedLosers ? JSON.parse(savedLosers) : [];
  });

  const [error, setError] = useState(null); // State to handle errors
  const [isNavOpen, setIsNavOpen] = useState(false); // State to handle nav visibility

  const fetchStockData = async () => {
    try {
      const response = await fetch("https://local-gain-production.up.railway.app/api/stocks");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched Stock Data:", data); // Log the fetched data

      const gainersList = [];
      const losersList = [];

      // Iterate through the stock data
      data.stocks.forEach(stock => {
        const formattedStock = {
          stock: stock.symbol.replace('.NS', ''), // Remove .NS from the stock symbol
          price: stock.currentPrice, // Current price from the object
          change: stock.percentageChange // Percentage change from the object
        };

        // Classify stocks into gainers and losers
        if (stock.percentageChange > 0) {
          gainersList.push(formattedStock);
        } else {
          losersList.push(formattedStock);
        }
      });

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
      setError("Failed to fetch stock data. Please try again later."); // Set error message
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

      .content {
        margin: 0; /* Removed margin */
        padding: 0; /* Removed padding */
        background-color:black;
        color: white;
        min-height: 100vh;
        transition: filter 0.3s ease; /* Smooth transition for blur effect */
      }

      .ticker-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        z-index: 1;
        margin-bottom: 20px;
      }

      .ticker-container-right {
        display: flex;
        flex-wrap: wrap; /* Allow wrapping of tables */
        justify-content: space-between;
        margin-top: 20px;
      }

      .Gainer,
      .Looser {
        flex: 1 1 45%; /* Allow tables to take up to 45% of the width */
        margin: 10px; /* Add margin for spacing */
        padding: 20px;
        background: #f5f5f5;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #2e2e2e;
        overflow: hidden; /* Ensure content doesn't overflow */
        max-width: calc(100% - 20px); /* Make tables responsive and fit inside content */
      }

      .table-container {
        width: 100%;
        overflow-y: auto; /* Enable vertical scrolling */
        max-height: 400px; /* Set a max height for the table */
        scroll-behavior: smooth; /* Enable smooth scrolling */
      }

      .table {
        width: 100%; /* Make table width responsive */
        border-collapse: collapse; /* Ensure borders are collapsed */
        border-radius: 8px;
        overflow: hidden; /* Ensure rounded corners are visible */
        box-sizing: border-box; /* Include padding and border in width/height */
        table-layout: fixed; /* Use fixed layout to prevent overflow */
      }

      th, td {
        padding: 8px 5px; /* Reduced padding for a more compact look */
        text-align: left; /* Align text to the left */
        border-bottom: 1px solid #ddd; /* Bottom border for rows */
        font-size: 12px; /* Default font size for table content */
        box-sizing: border-box; /* Include padding and border in width/height */
        overflow: hidden; /* Prevent overflow */
        text-overflow: ellipsis; /* Add ellipsis for overflow text */
        white-space: nowrap; /* Prevent text wrapping */
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
        margin-bottom: 10px; /* Fixed margin */
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

      /* Responsive Styles */
      @media (max-width: 768px) {
        .content {
          padding: 10px; /* Add padding for smaller screens */
        }

        .Gainer,
        .Looser {
          flex: 1 1 100%; /* Allow tables to take full width */
          max-width: 100%; /* Ensure tables fit inside content */
        }

        th, td {
          font-size: 12px; /* Keep the font size smaller on small screens */
        }
      }

      /* Larger screens */
      @media (min-width: 769px) {
        th, td {
          font-size: 14px; /* Increase font size for larger screens */
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
  }, [isNavOpen]); // Run on isNavOpen change

  return (
    <div>
      <NavBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <div className={`content ${isNavOpen ? 'blur' : ''}`}>
        {error && <div className="error-message">{error}</div>} {/* Display error message if exists */}
        <div className="ticker-container">
          <TickerTape gainers={gainers} losers={losers} />
        </div>
        <div className ="ticker-container-right">
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
                        <a 
                          href={`https://in.tradingview.com/chart/?symbol=NSE:${gainer.stock.toUpperCase()}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
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
                        <a href={`https://in.tradingview.com/chart/?symbol=NSE:${loser.stock.toUpperCase()}`} target="_blank" rel="noopener noreferrer">
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