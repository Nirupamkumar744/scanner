import React, { useState, useEffect } from "react";
import axios from "axios";
import TickerTape from "../Widgets/TickerTape"; // Ensure this component exists
import { FaHome } from "react-icons/fa";

const STOCK_API_URL = 'https://local-gain-production.up.railway.app/api/stocks';

// Complete stock categories with all symbols
const stockCategories = {
Banks: [
"AXISBANK.NS","HDFCBANK.NS","ICICIBANK.NS","IDFCFIRSTB.NS","INDUSINDBK.NS","KOTAKBANK.NS","PNB.NS",
"RBLBANK.NS","SBIN.NS","YESBANK.NS","FEDERALBNK.NS","BANDHANBNK.NS","CANBK.NS",
"BANKBARODA.NS"
],
  NBFCs: [
    "BAJFINANCE.NS","BAJAJFINSV.NS","MUTHOOTFIN.NS","MANAPPURAM.NS","RECLTD.NS",
    "PFC.NS","SBICARD.NS","HDFCAMC.NS","HDFCLIFE.NS","ICICIGI.NS","ICICIPRULI.NS","SHRIRAMFIN.NS",
     "M&MFIN.NS","CANFINHOME.NS","CHOLAFIN.NS", "ABCAPITAL.NS"

  ],
  OilAndGas: [
    "ADANIGREEN.NS", "ADANIPORTS.NS", "BPCL.NS", "GAIL.NS", "GUJGASLTD.NS", "IGL.NS", "IOC.NS", 
    "MGL.NS", "NTPC.NS", "OIL.NS", "ONGC.NS", "PETRONET.NS", "POWERGRID.NS", "RELIANCE.NS", "SJVN.NS", 
    "TATAPOWER.NS"
  ],
  PowerGenerationAndDistribution: [
    "ADANIENSOL.NS", "NHPC.NS", "NTPC.NS", "POWERGRID.NS", "SJVN.NS", "TATAPOWER.NS"
  ],
  Cement: [
    "ACC.NS", "AMBUJACEM.NS", "DALBHARAT.NS", "JKCEMENT.NS", "RAMCOCEM.NS", "SHREECEM.NS", "ULTRACEMCO.NS"
  ],
  MetalsAndMining: [
    "APLAPOLLO.NS", "HINDALCO.NS", "HINDCOPPER.NS", "JINDALSTEL.NS", "JSWSTEEL.NS", "NATIONALUM.NS", 
    "NMDC.NS", "SAIL.NS", "TATASTEEL.NS", "VEDL.NS"
  ],
  SoftwareAndITServices: [
    "BSOFT.NS", "COFORGE.NS", "CYIENT.NS", "INFY.NS", "LTIM.NS", "LTTS.NS", "MPHASIS.NS", "PERSISTENT.NS", 
    "TATAELXSI.NS", "TCS.NS", "TECHM.NS", "WIPRO.NS"
  ],
  Automobiles: [
    "ASHOKLEY.NS", "BAJAJ-AUTO.NS", "BHARATFORG.NS", "EICHERMOT.NS", "HEROMOTOCO.NS", "M&M.NS", 
    "MARUTI.NS", "MOTHERSON.NS", "TATAMOTORS.NS", "TVSMOTOR.NS"
  ],
  Retail: [
    "ABFRL.NS", "DMART.NS", "NYKAA.NS", "PAGEIND.NS", "PAYTM.NS", "TRENT.NS", "VBL.NS", "ZOMATO.NS"
  ],
  ConsumerGoods: [
    "ASIANPAINT.NS", "BERGEPAINT.NS", "BRITANNIA.NS", "COLPAL.NS", "DABUR.NS", "HINDUNILVR.NS", "ITC.NS", "NESTLEIND.NS","TATAMOTORS.NS"
  ],
  Pharmaceuticals: [
    "ABBOTINDIA.NS", "CIPLA.NS", "DRREDDY.NS", "LUPIN.NS", "SUNPHARMA.NS", "LUPIN.NS"
  ],
  Telecom: [
    "BHARTIARTL.NS", "RELIANCE.NS", "IDEA.NS"
  ],
  OtherStocks: [
    "BSE.NS", "DELHIVERY.NS", "GMRAIRPORT.NS", "IRCTC.NS", "KEI.NS", "NAVINFLUOR.NS", "POLYCAB.NS", 
    "SUNTV.NS", "UPL.NS"
  ]
};

const Heatmap = () => {
  const [stocksData, setStocksData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(STOCK_API_URL);
      if (response.status === 200 && response.data.stocks) {
        const formattedStocks = response.data.stocks.reduce((acc, stock) => {
          acc[stock.symbol] = {
            current_price: stock.currentPrice,
            percentage_change: stock.percentageChange
          };
          return acc;
        }, {});
        setStocksData(formattedStocks);
        setLastUpdated(new Date().toLocaleString());
        setError(null);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError("Error: Unable to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const getColor = (percentageChange) => {
    if (percentageChange === 0) return "#808080"; // Grey for no change
    if (percentageChange > 1) return "#056636"; // Dark Green for more than 1%
    if (percentageChange >= 0.1 && percentageChange <= 1) return "#42bd7f"; // Light Green for 0.1% to 1%
    if (percentageChange < 0 && percentageChange >= -2) return "#ff4d4d"; // Light Red for 0% to -2%
    if (percentageChange < -2) return "#991f29"; // Dark Red for less than -2%
    return "#c5e4e8"; // Default fallback color
};

  const StockBlock = ({ symbol, price, change, color }) => (
    <div className="stock-block" style={{ backgroundColor: color }}>
      <strong>{symbol.replace('.NS', '')}</strong>
      <p>₹{price.toFixed(2)}</p>
      <p>{change.toFixed(2)}%</p>
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stocksData || Object.keys(stocksData).length === 0) return <div>No stock data available.</div>;

  return (
    <div className="layout-container">
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/dyrn2eg1j/image/upload/v1740734340/Add_a_subheading_1_pui9fq.png"
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
          
          <li><a href="/marketpulse"><i className="fa fa-chart-line" style={{ color: "yellow" }}></i>Crypto/Forex</a></li>
          <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li>
          <li><a href="/tradejournal"><i className="fa fa-book" style={{ color: "yellow" }}></i>Trading Journal</a></li>
          <li><a href="/technical"><i className="fa fa-video" style={{ color: "yellow" }}></i>Technical Analysis</a></li>
          <li><a href="/calcu"><i className="fa fa-calendar-check" style={{ color: "yellow" }}></i>Calculator</a></li>
        </ul>
      </div>
      <div className="content">
        <TickerTape />
        
        <p style={{ fontSize: "14px", color: "#999" }}>Last Updated: {lastUpdated}</p>
        <div className="heatmap-container">
          {Object.entries(stockCategories).map(([category, stocks]) => (
            <div className="partition" key={category}>
              <h3 className="green-banner">{category}</h3>

              <div className="stock-grid">
                {stocks.map((symbol) => {
                  const stock = stocksData[symbol];
                  const color = stock ? getColor(stock.percentage_change) : "#ccc";
                  return (
                    <StockBlock
                      key={symbol}
                      symbol={symbol}
                      price={stock ? stock.current_price : 0}
                      change={stock ? stock.percentage_change : 0}
                      color={color}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .layout-container {
          display: flex;
        }

        .sidebar {
          width: 250px;
          height: 100vh;
           background-color: #252525;
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
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #252525;
          min-height: 100vh;
          position: relative;
        }

        .heatmap-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px; /* Space between partitions */
          margin-top: 20px;
        }

       .partition {
    background-color: rgba(238, 245, 243, 0.98); /* Light background for partitions */
    border-radius: 5px;
    padding: 10px;
    flex: 1 1 100%; /* Full width */
    min-width: 200px; /* Minimum width for responsiveness */
    position: relative;
    overflow: hidden;
}

.green-banner {
    background-color:rgb(246, 110, 6); /* Dark Green */
    color: white;
    text-align: center;
    font-weight: bold;
    padding: 8px;
    border-radius: 5px;
    margin-bottom: 10px;
}



        .stock-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* Responsive grid */
          gap: 5px; /* Space between stock blocks */
        }

        .stock-block {
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }

        .stock-block:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .stock-block strong {
          display: block;
          font-size: 12px;
          color: black;
        }

        .stock-block p {
          margin: 5px 0;
          font-size: 17px;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default Heatmap;




