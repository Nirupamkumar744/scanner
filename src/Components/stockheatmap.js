import React, { useState, useEffect } from "react";
import axios from "axios";
import TickerTape from "../Widgets/TickerTape"; // Ensure this component exists
import { FaHome } from "react-icons/fa";

const STOCK_API_URL = 'https://lngra-production.up.railway.app/api/stocks';

// Complete stock categories with all symbols
const stockCategories = {
  Banks: [
    "AXISBANK.NS", "AUBANK.NS", "BANDHANBNK.NS", "BANKBARODA.NS", "BANKINDIA.NS", "CANBK.NS", 
    "CUB.NS", "FEDERALBNK.NS", "HDFCBANK.NS", "ICICIBANK.NS", "IDFCFIRSTB.NS", "INDUSINDBK.NS", 
    "KOTAKBANK.NS", "PNB.NS", "RBLBANK.NS", "SBIN.NS", "YESBANK.NS"
  ],
  NBFCs: [
    "ABCAPITAL.NS", "ANGELONE.NS", "BAJFINANCE.NS", "BAJAJFINSV.NS", "CANFINHOME.NS", "CHOLAFIN.NS", 
    "HDFCAMC.NS", "HDFCLIFE.NS", "ICICIGI.NS", "ICICIPRULI.NS", "M&MFIN.NS", 
    "MANAPPURAM.NS", "MUTHOOTFIN.NS", "PEL.NS", "PFC.NS", "POONAWALLA.NS", "RECLTD.NS", "SBICARD.NS", 
    "SBILIFE.NS", "SHRIRAMFIN.NS"
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
    "ASIANPAINT.NS", "BERGEPAINT.NS", "BRITANNIA.NS", "COLPAL.NS", "DABUR.NS", "HINDUNILVR.NS", "ITC.NS", "NESTLEIND.NS", "P&GHEALTH.NS", "TATAMOTORS.NS"
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
    if (percentageChange > 5) return "#007A00";  // Dark green for >5% increase
    if (percentageChange > 0) return "#76FF7A";  // Light green for small increase
    if (percentageChange < -5) return "#8B0000"; // Dark red for >5% drop
    if (percentageChange < 0) return "#C6011F";  // Light red for small drop
    return "#ccc"; // Neutral color for no change
  };

  const StockBlock = ({ symbol, price, change, color }) => (
    <div style={{
      backgroundColor: color,
      padding: "10px",
      margin: "5px",
      borderRadius: "5px",
      textAlign: "center",
      width: "120px",
      height: "120px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <strong style={{ color: "black", fontSize: "16px" }}>{symbol}</strong>
      <p style={{ color: "black", fontSize: "14px" }}>₹{price.toFixed(2)}</p>
      <p style={{ color: "black", fontSize: "14px" }}>{change.toFixed(2)}%</p>
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
          <li><a href="/heat"><i className="fa fa-signal" style={{ color: "yellow" }}></i>Heatmap</a></li>
          <li><a href="/marketpulse"><i className="fa fa-chart-line" style={{ color: "yellow" }}></i>Crypto/Forex</a></li>
          <li><a href="/marketpulse"><i className="fa fa-book" style={{ color: "yellow" }}></i>Trading Journal</a></li>
          <li><a href="/technical"><i className="fa fa-video" style={{ color: "yellow" }}></i>Technical Analysis</a></li>
          <li><a href="/calcu"><i className="fa fa-calendar-check" style={{ color: "yellow" }}></i>Calculator</a></li>
        </ul>
      </div>
      <div className="content">
        <TickerTape />
        <h2>Stock Heatmap</h2>
        <p style={{ fontSize: "14px", color: "#999" }}>Last Updated: {lastUpdated}</p>
        {Object.entries(stockCategories).map(([category, stocks]) => (
          <div key={category}>
            <h3>{category}</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {stocks.map((symbol) => {
                const stock = stocksData[symbol];
                const color = stock ? getColor(stock.percentage_change) : "#ccc";
                return (
                  <StockBlock
                    key={symbol}
                    symbol={symbol.replace('.NS', '')} // Remove .NS from the symbol
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

      <style jsx>{`
        .layout-container {
          display: flex;
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
          background-image: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1739254815/empty-dark-concrete-wall-room-studio-background-floor-perspective-with-blue-soft-light-displays_p48hk9.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: white;
          min-height: 100vh;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Heatmap;