import React, { useEffect, useState, useCallback } from "react";
import TickerTape from "../Widgets/TickerTape";
import NavBar from "./NavBar/NavBar";

const TechnicalAnalysis = () => {
  const [symbol, setSymbol] = useState("NSE:RELIANCE");
  const [isNavOpen, setIsNavOpen] = useState(false); // State to handle nav visibility
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
       <NavBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

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
            background-color: #252525;
            background-size: cover;
            overflow-x: hidden;
          }

          .content {
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