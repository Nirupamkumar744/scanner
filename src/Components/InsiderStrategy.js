import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path


const InsiderBar = () => {
  const [insiderData] = useState([
    // Sample hardcoded data
    {
      stock: "TCS",
      currentPrice: "3500",
      chartLink: "https://in.tradingview.com/chart/tioZvgwv/?symbol=NSE%3ATCS",
      technicalsLink: "https://in.tradingview.com/symbols/NSE-TCS/technicals/",
    },
    {
      stock: "INFY",
      currentPrice: "1600",
      chartLink: "https://in.tradingview.com/chart/tioZvgwv/?symbol=NSE%3AINFY",
      technicalsLink: "https://in.tradingview.com/symbols/NSE-INFY/technicals/",
    },
    // Add more static stock data here if needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the insider data based on the search term
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
               <li><a href="/home"><FaHome style={{ marginRight: "10px", color: "yellow" }} />
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
