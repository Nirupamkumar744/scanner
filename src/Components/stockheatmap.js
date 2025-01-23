import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path
import './StockHeatmap.css';

const STOCK_API_URL = 'https://web-production-a7ae.up.railway.app/get_stock_data';

const Heatmap = () => {
  const [stocks, setStocks] = useState(() => {
    const cachedData = localStorage.getItem('stockData');
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [loading, setLoading] = useState(stocks.length === 0);
  const [error, setError] = useState(null);

  const fetchDataWithRetry = async (retries = 3, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
      try {
        setLoading(true);
        const response = await axios.get(STOCK_API_URL, { timeout: 20000 });

        if (response.status === 200) {
          const stockData = response.data.data;
          const validStockData = Object.keys(stockData).reduce((acc, symbol) => {
            const stock = stockData[symbol];
            if (!isNaN(stock.current_price) && !isNaN(stock.percentage_change)) {
              acc.push({ symbol, ...stock });
            }
            return acc;
          }, []);

          localStorage.setItem('stockData', JSON.stringify(validStockData));
          setStocks(validStockData);
          setError(null);
          return;
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error.message);
        if (i === retries - 1) {
          setError('Error: Unable to fetch data after multiple attempts. Please try again later.');
        }
        await new Promise((res) => setTimeout(res, delay * (i + 1)));
      }
    }
  };

  useEffect(() => {
    fetchDataWithRetry();
    const interval = setInterval(fetchDataWithRetry, 60000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (percentageChange) => {
    return percentageChange > 0
      ? 'rgb(34, 177, 76)'  // Green (Softened)
      : percentageChange < 0
      ? 'rgb(237, 28, 36)'  // Red (Softened)
      : 'rgb(255, 242, 0)'; // Yellow (Softened)
  };

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
        <div className="heatmap-container">
          {loading && stocks.length === 0 ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div className="stock-blocks">
              {stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="stock-block"
                  style={{ backgroundColor: getColor(stock.percentage_change) }}
                >
                  <div className="stock-info">
                    <p>{stock.symbol}</p>
                    <p>{stock.percentage_change.toFixed(2)}%</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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

        /* Heatmap styles */
        .heatmap-container {
          padding: 20px;
          font-family: 'Arial', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: black;
          border-radius: 10px;
          box-shadow: none;  /* Removed shadow */
          max-height: 80vh;
          overflow-y: auto;
        }

        .heatmap-container p {
          font-size: 20px;
          color: #fff;
          font-weight: bold;
          margin-top: 20px;
          animation: fadeIn 2s ease-out;
        }

        .stock-blocks {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 5px;  /* Small gap between blocks */
          justify-content: center;
          width: 100%;
        }

        .stock-block {
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 90px;  /* Fixed width for square block */
          height: 90px;  /* Fixed height for square block */
          transition: all 0.3s ease;
        }

        .stock-info p {
          margin: 5px 0;
          color: #fff;
          font-size: 10px;
          font-weight: bold;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Heatmap;
