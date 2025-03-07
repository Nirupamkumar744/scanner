import React, { useEffect, useState, useCallback } from "react";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path
import NavBar from "./NavBar/NavBar";


const InsiderBar = () => {
  const [insiderData, setInsiderData] = useState([]);
  const [mainSearchTerm, setMainSearchTerm] = useState("");
  const [highOrderSearchTerm, setHighOrderSearchTerm] = useState("");
  const [lowOrderSearchTerm, setLowOrderSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highOrderData, setHighOrderData] = useState([]);
  const [lowOrderData, setLowOrderData] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
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

      
      const filteredLowOrderData = filteredData.filter(item => {
        const changeValue = parseFloat(item.motherCandle.change);
        return changeValue < 0;
      });
      setLowOrderData(filteredLowOrderData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const scheduleNextFetch = useCallback(() => {
    const fetchTimes = [
      { hour: 11, minute: 32 },
      { hour: 12, minute: 32 },
      { hour: 13, minute: 32 },
      { hour: 14, minute: 32 },
      { hour: 15, minute: 32 }
    ];

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const nextFetchTime = fetchTimes.find(time => {
      const fetchTimeInMinutes = time.hour * 60 + time.minute;
      return fetchTimeInMinutes > currentTime;
    });

    if (nextFetchTime) {
      const fetchTimeInMinutes = nextFetchTime.hour * 60 + nextFetchTime.minute;
      const delay = (fetchTimeInMinutes - currentTime) * 60 * 1000;

      setTimeout(() => {
        fetchData();
        scheduleNextFetch();
      }, delay);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    scheduleNextFetch();

    return () => {
      
    };
  }, [fetchData, scheduleNextFetch]);

  const scrollToSymbol = (symbol) => {
    const element = document.getElementById(symbol);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const filteredHighOrderDataWithSearch = highOrderData.filter((data) =>
    data.symbol.toLowerCase().includes(highOrderSearchTerm.toLowerCase())
  );
  const filteredLowOrderDataWithSearch = lowOrderData.filter((data) =>
    data.symbol.toLowerCase().includes(lowOrderSearchTerm.toLowerCase())
  );

  return (
    <div className="lay">
      <div className="insider-bar">
        <div className="header">
          <h2 className="table-heading">
            Inside Bar <span className="tooltip">💡</span>
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
          <h2 className="highorder-heading">HOM STOCKS 🚀</h2>
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

        {error && <div className="error">Error: {error}</div>} 

        <style jsx>{`
          .insider-bar {
            background-color: black; /* Dark background for the insider bar */
            color: #f4f4f4;
            padding: 30px;
            width: 90%;
            max-width: 100%;
            margin: 20px auto;
            font-family: 'Bebas Neue', sans-serif;
          }

          .header {
            display: flex;
            flex-direction: column; 
            align-items: flex-start;
            margin-bottom: 30px;
          }

          .table-heading, .highorder-heading, .loworder-heading {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .tooltip {
            position: relative;
            cursor: pointer;
          }

          .search-box {
            padding: 10px 15px;
            font-size: 14px;
            border-radius: 8px;
            border: 1px solid #444;
            background: #333;
            color: white;
            width: 250px;
            transition: border-color 0.3s;
            margin-bottom: 20px;
          }

          .search-box:focus {
            border-color: #1abc9c;
            outline: none;
          }

          .table-container, .highorder-table-container, .loworder-table-container {
            background-color: #2a2a2a;
            border-radius: 10px;
            width: 100%;
            max-height: 300px;
            overflow-y: auto;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            margin-bottom: 20px;
          }

          
          .table-container::-webkit-scrollbar,
          .highorder-table-container::-webkit-scrollbar,
          .loworder-table-container::-webkit-scrollbar {
            display: none;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            font-size: 14px;
          }

          th,
          td {
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
            color: black;
          }

          th {
            background: BLACK;
            color: white;
            font-weight: bold;
            height: 40px;
          }

          tbody tr:nth-child(even) {
            background-color: rgba( 97, 237, 244, 0.3);
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
    </div>
  );
};

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="layout-container">
      <style jsx>{`
        .blur {
          filter: blur(5px);
        }
      `}</style>
      <NavBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <div className={`content ${isNavOpen ? 'blur' : ''}`} style={{ margin: "20px 0" }}> 
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