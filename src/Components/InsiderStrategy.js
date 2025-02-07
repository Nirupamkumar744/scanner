import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path

const InsiderBar = () => {
  const [insiderData, setInsiderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://insiderbartradingg-production.up.railway.app/run-manual");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Filter stocks with insideBar: true
        const filteredData = Object.entries(data)
          .filter(([key, value]) => value.insideBar)
          .map(([key, value]) => {
            const stockSymbol = key.replace('.NS', ''); // Remove .NS from the stock symbol
            return {
              stock: stockSymbol,
              currentPrice: value.motherCandle.high, // Assuming you want to show the high of the mother candle as the current price
              chartLink: `https://in.tradingview.com/chart/?symbol=${stockSymbol}`, // Use stockSymbol without .NS
              technicalsLink: `https://in.tradingview.com/symbols/${stockSymbol}/technicals/`, // Use stockSymbol without .NS
            };
          });

        setInsiderData(filteredData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = insiderData.filter((data) =>
    data.stock.toLowerCase().includes(searchTerm.toLowerCase())
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
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index} id={data.stock} onClick={() => scrollToSymbol(data.stock)}>
                <td>{data.stock}</td>
                <td>{data.currentPrice.toFixed(2)}</td>
                <td>
                  <a href={data.chartLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737371645/HIGH_POWER_STOCKS_light_pmbvli.webp"
                      alt="Chart Icon"
                      width="25"
                      className="icon"
                    />
                  </a>
                </td>
                <td>
                  <a href={data.technicalsLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://img.icons8.com/ios/452/settings.png"
                      alt="Technical Icon"
                      width="25"
                      className="icon"
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

        table {
          width: 100%;
          border-collapse: collapse;
          background: #fff; /* Table background color */
        }

        th,
        td {
          padding: 12px;
          text-align: center;
          border: 1px solid #ddd; /* Light border color */
          color: black; /* Font color */
        }

        th {
          background: #f2f2f2; /* Header background color */
          font-weight: bold;
          height: 50px;
        }

        tbody tr:nth-child(even) {
          background-color: rgba(144, 238, 144, 0.5); /* Light green for even rows */
        }

        tbody tr:nth-child(odd) {
          background-color: #ffffff; /* White for odd rows */
        }

        tbody tr:hover {
          background-color: #1abc9c; /* Hover effect color */
          color: white; /* Font color on hover */
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
          background: #f2f2f2; /* Header background color */
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
          <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Crypto/Forex</a></li>
          <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li>
          <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
          <li><a href="/marketpulse"><i className="fa fa-book"></i>Trading Journal</a></li>
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