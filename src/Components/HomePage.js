import React, { useEffect, useState } from "react";
import axios from "axios";
import TickerTape from "../Widgets/TickerTape";
import Chart from "../Widgets/chart";
import "./HomePage.css"; // Move styles to an external CSS file

const HomePage = () => {
  const [gainersData, setGainersData] = useState([]);
  
  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      const sheetId = "12xX5awBv9esEwUDQeRLk1rNf4R54L4HLN4rlRm6kaZQ";
      const range = "Sheet1!A:C"; // Assuming your data is in the first sheet and columns A to C
      const apiKey = "AIzaSyDPwn94kQkwHk3PosdY1gg184lXM_jGoic"; // Your API key

      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
        );
        const rows = response.data.values;

        if (rows) {
          const formattedData = rows.map((row) => ({
            symbol: row[0],
            ltp: row[1],
            percentage: row[2],
          }));
          setGainersData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png"
            alt="Logo"
          />
        </div>
        <ul className="nav-links">
          {/* Navigation Links */}
          <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Market Pulse</a></li>
          <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li>
          <li><a href="/marketpulse"><i className="fa fa-th"></i>Sector Scope</a></li>
          <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
          <li><a href="/marketpulse"><i className="fa fa-clock"></i>Option Clock</a></li>
          <li><a href="/marketpulse"><i className="fa fa-users"></i>FII / DII</a></li>
          <li><a href="/marketpulse#"><i className="fa fa-arrow-up"></i>Index Mover</a></li>
          <li><a href="/marketpulse"><i className="fa fa-book"></i>Trading Journal</a></li>
          <li><a href="/marketpulse"><i className="fa fa-graduation-cap"></i>Trade Tutor</a></li>
          <li><a href="/technical"><i className="fa fa-video"></i>Technial Analysis</a></li>
          <li><a href="/calcu"><i className="fa fa-calendar-check"></i>Calculator</a></li>
        </ul>
      </div>

      <div className="content">
        {/* Ticker Tape */}
        <div className="ticker-container">
          <TickerTape />
        </div> 

        {/* Gainers and Losers Table Container */}
        <div className="gainers-losers-container">
          <div className="gainers-container">
            <h2>Gainers</h2>
            <table className="gainers-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>LTP</th>
                  <th>% Change</th>
                </tr>
              </thead>
              <tbody>
                {gainersData.length > 0 ? (
                  gainersData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.symbol}</td>
                      <td>{data.ltp}</td>
                      <td>{data.percentage}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="losers-container">
            <h2>Losers</h2>
            <table className="losers-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th>% Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DEF</td>
                  <td>800</td>
                  <td>-40</td>
                  <td>-4.5%</td>
                </tr>
                <tr>
                  <td>PQR</td>
                  <td>950</td>
                  <td>-25</td>
                  <td>-2.6%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Nifty Charts Container */}
        <div className="nifty-charts-container">
          <h2>Nifty Charts</h2>
          <iframe
            src="https://tradinglead.in/"
            width="100%"
            height="600"
            style={{ border: "none" }}
            title="Nifty Chart"
          ></iframe>
        </div>

        {/* Crypto Chart */}
        <h2 className="crypto-chart-heading">CRYPTO CHART</h2>
        <div className="main-container">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
