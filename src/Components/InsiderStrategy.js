import React, { useEffect, useState, useCallback } from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path

const InsiderBar = () => {
  const [insiderData, setInsiderData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highOrderData, setHighOrderData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://local-inside-production.up.railway.app/inside-bars");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filteredData = data.filter(item => item.isInsideBar === true);
      
      setPreviousData(insiderData);
      setInsiderData(filteredData);

      const filteredHighOrderData = filteredData.filter(item => {
        const changeValue = parseFloat(item.motherCandle.change);
        return changeValue >= 0.5;
      });
      setHighOrderData(filteredHighOrderData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [insiderData]);

  const scheduleNextFetch = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const fetchTimes = [
      { hour: 11, minute: 20 },
      { hour: 12, minute: 20 },
      { hour: 13, minute: 20 },
      { hour: 14, minute: 20 },
    ];

    let nextFetchTime = null;

    for (const time of fetchTimes) {
      if (hours < time.hour || (hours === time.hour && minutes < time.minute)) {
        nextFetchTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time.hour, time.minute);
        break;
      }
    }

    if (!nextFetchTime) {
      nextFetchTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 22);
    }

    const delay = nextFetchTime - now;

    setTimeout(() => {
      fetchData();
      scheduleNextFetch();
    }, delay);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    scheduleNextFetch();

    return () => {
      // Cleanup if necessary
    };
  }, [fetchData, scheduleNextFetch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = insiderData.length > 0 ? insiderData : previousData;
  const filteredDataWithSearch = filteredData.filter((data) =>
    data.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToSymbol = (symbol) => {
    const element = document.getElementById(symbol);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

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
              <th>Breakout</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataWithSearch.map((data, index) => (
              <tr key={index} id={data.symbol} onClick={() => scrollToSymbol(data.symbol)}>
                <td>{data.symbol.replace('.NS', '')}</td>
                <td>{data.motherCandle && data.motherCandle.high ? data.motherCandle.high.toFixed(2) : 'N/A'}</td>
                <td>
                  <a href={`https://in.tradingview.com/chart/?symbol=${data.symbol.replace('.NS', '')}`} target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737371645/HIGH_POWER_STOCKS_light_pmbvli.webp"
                      alt="Chart Icon"
                      width="25"
                      className="icon"
                    />
                  </a>
                </td>
                <td>
                  <a href={`https://in.tradingview.com/symbols/${data.symbol.replace('.NS', '')}/technicals/`} target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://img.icons8.com/ios/452/settings.png"
                      alt="Technical Icon"
                      width="25"
                      className="icon"
                    />
                  </a>
                </td>
                <td>
                  <span style={{ color: data.type === "Bearish Inside Bar" ? "red" : data.type === "Bullish Inside Bar" ? "green" : "black", fontWeight: 'bold' }}>
                    {data.type === "Bearish Inside Bar" ? "Bearish" : data.type === "Bullish Inside Bar" ? "Bullish" : "Neutral"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="Highorder">
        <h2 className="highorder-heading">HOM STOCKS 🚀</h2>
        <div className="highorder-table-container">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Current Price</th>
                <th>Chart</th>
                <th>Breakout</th>
              </tr>
            </thead>
            <tbody>
              {highOrderData.map((data, index) => (
                <tr key={index} id={data.symbol}>
                  <td>{data.symbol.replace('.NS', '')}</td>
                  <td>{data.motherCandle && data.motherCandle.high ? data.motherCandle.high.toFixed(2) : 'N/A'}</td>
                  <td>
                    <a href={`https://in.tradingview.com/chart/?symbol=${data.symbol.replace('.NS', '')}`} target="_blank" rel="noopener noreferrer">
                      <img
                        src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737371645/HIGH_POWER_STOCKS_light_pmbvli.webp"
                        alt="Chart Icon"
                        width="25"
                        className="icon"
                      />
                    </a>
                  </td>
                  <td>
                    <span style={{ color: data.type === "Bearish Inside Bar" ? "red" : data.type === "Bullish Inside Bar" ? "green" : "black", fontWeight: 'bold' }}>
                      {data.type === "Bearish Inside Bar" ? "Bearish" : data.type === "Bullish Inside Bar" ? "Bullish" : "Neutral"}
                    </span>
                  </td>
                </tr>
              ))}
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
          box-shadow: 0 4px  15px rgba(0, 0, 0, 0.3);
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

        .highorder-heading {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
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
          transition: border-color 0.3s;
        }

        .search-box:focus {
          border-color: #1abc9c;
          outline: none;
        }

        .table-container {
          background: #1c1c1c;
          border-radius: 10px;
          width: 100%;
          height: 400px;
          overflow-y: auto;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .Highorder {
          background: #1c1c1c;
          border-radius: 10px;
          padding: 20px;
          margin-top: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .highorder-table-container {
          overflow-y: auto;
          max-height: 300px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
        }

        th,
        td {
          padding: 12px;
          text-align: center;
          border: 1px solid #ddd;
          color: black;
        }

        th {
          background: #4CAF50;
          color: white;
          font-weight: bold;
          height: 50px;
        }

        tbody tr:nth-child(even) {
          background-color: rgba(144, 238, 144, 0.3);
        }

        tbody tr:nth-child(odd) {
          background-color: rgba(255, 255, 255, 0.8);
        }

        tbody tr:hover {
          background-color: #1abc9c;
          color: white;
        }

        tbody td {
          transition: background-color 0.3s ease;
        }

        a {
          text-decoration: none;
        }

        a:hover {
          opacity: 0.7;
        }

        .icon {
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .icon:hover {
          transform: scale(1.1);
        }

        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background: #4CAF50;
        }

        .loading, .error {
          color: #f4f4f4;
          text-align: center;
          margin-top: 20px;
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
          <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
          <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Crypto/Forex</a></li>
          <li><a href="/tradejournal"><i className="fa fa-book"></i>Trading Journal</a></li>
          <li><a href="/technical"><i className="fa fa-video"></i>Technical Analysis</a></li>
          <li><a href="/calcu"><i className="fa fa-calendar-check"></i>Calculator</a></li>
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

        .sidebar::-webkit-scrollbar {
          width: 8px;
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