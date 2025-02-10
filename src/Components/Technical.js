import React, { useEffect, useState, useCallback } from "react";
import TickerTape from "../Widgets/TickerTape";

const TechnicalAnalysis = () => {
  const [symbol, setSymbol] = useState("NSE:RELIANCE");

  const handleSymbolChange = (e) => {
    let input = e.target.value.toUpperCase();
    if (!input.startsWith("NSE:")) {
      input = "NSE:" + input;
    }
    setSymbol(input);
  };

  const updateWidget = useCallback(() => {
    const widgetContainer = document.getElementById("tradingview_widget");
    widgetContainer.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: "1h",
      width: "100%",
      height: "100%",
      symbol: symbol,
      showIntervalTabs: true,
      displayMode: "multiple",
      locale: "en",
      colorTheme: "dark",
    });

    widgetContainer.appendChild(script);
  }, [symbol]);

  useEffect(() => {
    updateWidget();
  }, [updateWidget]);

  return (
    <div className="technical-analysis-page">
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
              <i className="fa fa-calendar-check"></i>Home
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-chart-line"></i>Crypto/Forex
            </a>
          </li>
          <li>
            <a href="/heat">
              <i className="fa fa-th"></i>Heatmap
            </a>
          </li>
          <li>
            <a href="/insiderstrategy">
              <i className="fa fa-cogs"></i>Insider Strategy
            </a>
          </li>
         
          
          <li>
            <a href="/marketpulse">
              <i className="fa fa-book"></i>Trading Journal
            </a>
          </li>
          
          <li>
            <a href="/calcu">
              <i className="fa fa-calendar-check"></i>Calculator
            </a>
          </li>
        </ul>
      </div>

      <div className="content">
        <div className="ticker-container">
          <TickerTape />
        </div>
        <div className="technical-analysis-container">
          <h2>Technical Analysis</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Symbol (e.g., RELIANCE)"
              value={symbol.slice(4)}
              onChange={handleSymbolChange}
            />
            <button onClick={updateWidget}>Search</button>
          </div>
          <div id="tradingview_widget" className="widget-container"></div>
        </div>
      </div>

      <style>
        {`
          /* Importing Google Fonts */
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

          body {
            font-family: "Poppins", sans-serif;
            margin: 0;
            padding: 0;
            background: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1737099346/Flux_Dev_Create_an_ultrasmooth_realistic_animated_background_t_3_dg0gcs.jpg') no-repeat center center fixed;
            background-size: cover;
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
            background: transparent;
            color: white;
          }

          .ticker-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            z-index: 1;
            margin-bottom: 20px;
          }

          .technical-analysis-container {
            margin-top: 20px;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          }

          .search-bar {
            display: flex;
            margin-bottom: 20px;
          }

          .search-bar input {
            flex: 1;
            padding: 10px;
            border-radius: 4px;
            margin-right: 10px;
          }

          .search-bar button {
            padding: 10px 15px;
            background-color: #007bff;
            border: none;
            border-radius: 4px;
            color: white;
          }

          .widget-container {
            width: 100%;
            height: 450px;
            background-color: #000;
          }
        `}
      </style>
    </div>
  );
};

export default TechnicalAnalysis;
