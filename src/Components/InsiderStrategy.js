import React, { useEffect, useState, useCallback } from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path

// Navbar Component
const Navbar = ({ isNavOpen, setIsNavOpen }) => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="https://res.cloudinary.com/dyrn2eg1j/image/upload/v1740734340/Add_a_subheading_1_pui9fq.png" alt="Logo" />
      </div>
      <div className="hamburger" onClick={() => setIsNavOpen(!isNavOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-links ${isNavOpen ? 'open' : ''}`}>
        <li><a href="/home"><FaHome style={{ marginRight: "10px", color: "yellow" }} />Home</a></li>
        <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
        <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Crypto/Forex</a></li>
        <li><a href="/tradejournal"><i className="fa fa-book"></i>Trading Journal</a></li>
        <li><a href="/technical"><i className="fa fa-video"></i>Technical Analysis</a></li>
        <li><a href="/calcu"><i className="fa fa-calendar-check"></i>Calculator</a></li>
      </ul>
    </div>
  );
};

// InsiderBar Component
const InsiderBar = ({ isNavOpen }) => {
  const [insiderData, setInsiderData] = useState([]);
  const [mainSearchTerm, setMainSearchTerm] = useState(""); // Search term for main table
  const [highOrderSearchTerm, setHighOrderSearchTerm] = useState(""); // Search term for high order table
  const [lowOrderSearchTerm, setLowOrderSearchTerm] = useState(""); // Search term for low order table
  const [loading, setLoading] = useState(false); // Set loading to false initially
  const [error, setError] = useState(null);
  const [highOrderData, setHighOrderData] = useState([]);
  const [lowOrderData, setLowOrderData] = useState([]); // New state for low order data

  const fetchData = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await fetch("https://local-inside-production.up.railway.app/inside-bars");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filteredData = data.filter(item => item.isInsideBar === true);
      
      setInsiderData(filteredData);

      const filteredHighOrderData = filteredData.filter(item => {
        const changeValue = parseFloat(item.motherCandle.change);
        return changeValue >= 0.5;
      });
      setHighOrderData(filteredHighOrderData);

      // Filter for low order data (negative change)
      const filteredLowOrderData = filteredData.filter(item => {
        const changeValue = parseFloat(item.motherCandle.change);
        return changeValue < 0; // Negative change
      });
      setLowOrderData(filteredLowOrderData);
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }, []);

  const scheduleNextFetch = useCallback(() => {
    const fetchTimes = [
      { hour: 11, minute: 20 },
      { hour: 12, minute: 20 },
      { hour: 13, minute: 20 },
      { hour: 14, minute: 20 },
    ];

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes

    const nextFetchTime = fetchTimes.find(time => {
      const fetchTimeInMinutes = time.hour * 60 + time.minute;
      return fetchTimeInMinutes > currentTime; // Find the next scheduled time
    });

    if (nextFetchTime) {
      const fetchTimeInMinutes = nextFetchTime.hour * 60 + nextFetchTime.minute;
      const delay = (fetchTimeInMinutes - currentTime) * 60 * 1000; // Calculate delay in milliseconds

      setTimeout(() => {
        fetchData(); // Fetch data at the scheduled time
        scheduleNextFetch(); // Schedule the next fetch
      }, delay);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData(); // Fetch data immediately on mount
    scheduleNextFetch(); // Start the scheduling for future fetches

    return () => {
      // Cleanup if necessary
    };
  }, [fetchData, scheduleNextFetch]);

  const scrollToSymbol = (symbol) => {
    const element = document.getElementById(symbol);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Filtered data for each table
  const filteredHighOrderDataWithSearch = highOrderData.filter((data) =>
    data.symbol.toLowerCase().includes(highOrderSearchTerm.toLowerCase())
  );
  const filteredLowOrderDataWithSearch = lowOrderData.filter((data) =>
    data.symbol.toLowerCase().includes(lowOrderSearchTerm.toLowerCase())
  );

  return (
    <div className={`insider-bar ${isNavOpen ? 'blur' : ''}`}>
      <div className="header">
        <h2 className="table-heading">
          Inside Bar
          <span className="tooltip">💡</span>
        </h2>
        <input
          type="text"
          className="search-box"
          placeholder="Search Symbol..."
          value={mainSearchTerm}
          onChange={(e) => setMainSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Insider Data Table */}
      <div className="table-container">
        {loading ? (
          <div className="loading">Loading data...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
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
              {insiderData.filter((data) =>
                data.symbol.toLowerCase().includes(mainSearchTerm.toLowerCase())
              ).map((data, index) => (
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
                    <span style={{ color: data.type === "Bearish Inside Bar" ? "red" : data.type === "Bullish Inside Bar" ? "green" : "black", fontWeight: 'bold' }}>
                      {data.type === "Bearish Inside Bar" ? "Bearish" : data.type === "Bullish Inside Bar" ? "Bullish" : "Neutral"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* High Order Section */}
      <div className="Highorder">
        <h2 className="highorder-heading">HOM STOCKS🚀</h2>
        <input
          type="text"
          className="search-box"
          placeholder="Search in High Order..."
          value={highOrderSearchTerm}
          onChange={(e) => setHighOrderSearchTerm(e.target.value)}
        />
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
              {filteredHighOrderDataWithSearch.map((data, index) => (
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

      {/* Low Order Section */}
      <div className="Loworder">
        <h2 className="loworder-heading">LOM STOCKS📉</h2>
        <input
          type="text"
          className="search-box"
          placeholder="Search in Low Order..."
          value={lowOrderSearchTerm}
          onChange={(e) => setLowOrderSearchTerm(e.target.value)}
        />
        <div className="loworder-table-container">
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
              {filteredLowOrderDataWithSearch.map((data, index) => (
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

      {error && <div className="error">Error: {error}</div>} {/* Display error message if exists */}

      <style jsx>{`
        .insider-bar {
          background-color: #1e1e1e; /* Dark background for the insider bar */
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
          flex-direction: column; /* Stack header elements vertically */
          align-items: flex-start; /* Align items to the start */
          margin-bottom: 30px;
        }

        .table-heading, .highorder-heading, .loworder-heading {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px; /* Space between heading and search box */
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
          margin-bottom: 20px; /* Add margin for spacing */
        }

        .search-box:focus {
          border-color: #1abc9c;
          outline: none;
        }

        .table-container, .highorder-table-container, .loworder-table-container {
          background-color: #2a2a2a; /* Darker background for tables */
          border-radius: 10px;
          width: 100%;
          max-height: 300px; /* Set a maximum height */
          overflow-y: auto; /* Enable vertical scrolling */
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          margin-bottom: 20px; /* Add margin for spacing */
        }

        /* Hide scrollbar for WebKit browsers */
        .table-container::-webkit-scrollbar,
        .highorder-table-container::-webkit-scrollbar,
        .loworder-table-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar */
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
          background: #4CAF50; /* Green background for headers */
          color: white;
          font-weight: bold;
          height: 50px;
        }

        tbody tr:nth-child(even) {
          background-color: rgba(144, 238, 144, 0.3); /* Light green for even rows */
        }

        tbody tr:nth-child(odd) {
          background-color: rgba(255, 255, 255, 0.8); /* Light white for odd rows */
        }

        tbody tr:hover {
          background-color: #1abc9c; /* Highlight color on hover */
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
          background: #4CAF50; /* Green background for header */
        }

        .loading, .error {
          color: #f4f4f4;
          text-align: center;
          margin-top: 20px;
        }

        /* Navbar Styles */
        .navbar {
          display: flex;
          justify-content: space-between; /* Space between logo and nav links */
          align-items: center;
          background-color: #252525;
          padding: 5px 20px; /* Reduced padding for a thinner navbar */
          color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .logo img {
          width: 100px; /* Adjust logo size if needed */
          height: auto; /* Maintain aspect ratio */
        }

        .nav-links {
          list-style: none;
          display: flex;
          padding: 0;
          margin: 0;
          transition: transform 0.3s ease; /* Smooth transition for sliding */
          transform: translateX(0); /* Start on-screen */
          margin-left: auto; /* Push nav links to the right */
        }

        .nav-links.open {
          display: flex; /* Show nav links when open */
        }

        .nav-links li {
          margin: 0 10px; /* Reduced margin for nav links */
        }

        .nav-links li a {
          color: white;
          text-decoration: none;
          font-size: 14px; /* Reduced font size for a more compact look */
          font-weight: 500;
          padding: 10px 15px; /* Add padding to make it look like a button */
          border: 1px solid transparent; /* Add border */
          border-radius: 5px; /* Rounded corners */
          background-color: #333; /* Background color */
          transition: background-color 0.3s, border-color 0.3s; /* Transition for hover effect */
          display: flex; /* Use flex to align icon and text */
          align-items: center; /* Center items vertically */
        }

        .nav-links li a:hover {
          background-color: gold; /* Change background on hover */
          border-color: gold; /* Change border color on hover */
          color: black; /* Change text color on hover */
        }

        .nav-links li a i {
          margin-right: 5px; /* Added margin for space between icon and text */
        }

        .hamburger {
          display: none; /* Hidden by default */
          flex-direction: column;
          cursor: pointer;
        }

        .hamburger div {
          width: 25px;
          height: 3px;
          background-color: white;
          margin: 4px 0;
          transition: 0.4s;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .nav-links {
            display: none; /* Hide nav links by default on small screens */
            flex-direction: column;
            position: absolute;
            top: 50px; /* Adjust based on navbar height */
            left: 0;
            background-color: #252525;
            width: 100%;
            padding: 10px 0;
            z-index: 10;
            transform: translateX(-100%); /* Start off-screen to the left */
            transition: transform 0.3s ease; /* Smooth transition for sliding */
          }

          .nav-links.open {
            display: flex; /* Show nav links when open */
            transform: translateX(0); /* Slide in */
          }

          .hamburger {
            display: flex; /* Show hamburger icon on smaller screens */
            z-index: 20; /* Ensure it stays above other content */
          }

          /* Make table font smaller on mobile */
          table {
            font-size: 12px; /* Smaller font size for mobile */
          }
        }
      `}</style>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to handle nav visibility

  return (
    <div className="layout-container">
      <Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <div style={{ margin: "20px 0" }}> {/* Add margin for spacing above and below TickerTape */}
        <TickerTape />
      </div>
      <InsiderBar isNavOpen={isNavOpen} />
      <style jsx>{`
        .layout-container {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          background: black;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;