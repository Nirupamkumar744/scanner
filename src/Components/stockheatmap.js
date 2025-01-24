import React, { useState, useEffect } from "react";
import axios from "axios";
import TickerTape from "../Widgets/TickerTape";

// Define the stock API URL
const STOCK_API_URL = 'https://web-production-a7ae.up.railway.app/get_stock_data';

const stockCategories = {
  Banks: [
    "AXISBANK.NS", "BANDHANBNK.NS", "BANKBARODA.NS", "BANKINDIA.NS", "HDFCBANK.NS", 
    "ICICIBANK.NS", "IDFCFIRSTB.NS", "NAUKRI.NS", "RBLBANK.NS", "SBIN.NS", "YESBANK.NS"
  ],
  NBFCs: [
    "BAJFINANCE.NS", "BAJAJFINSV.NS", "MUTHOOTFIN.NS", "CHOLAFIN.NS", "HDFCLIFE.NS",
    "ICICIGI.NS", "ICICIPRULI.NS", "PFC.NS", "RECLTD.NS", "SBICARD.NS", "SBILIFE.NS"
  ],
  OilAndGas: [
    "BPCL.NS", "GAIL.NS", "IOC.NS", "OIL.NS", "PETRONET.NS", "ADANIPORTS.NS", "ADANIGREEN.NS"
  ],
  PowerGenerationAndDistribution: [
    "NTPC.NS", "POWERGRID.NS", "TATAPOWER.NS", "NHPC.NS", "SJVN.NS"
  ],
  Cement: [
    "ULTRACEMCO.NS", "AMBUJACEM.NS", "ACC.NS", "JKCEMENT.NS", "RAMCOCEM.NS"
  ],
  MetalsAndMining: [
    "HINDALCO.NS", "JSWSTEEL.NS", "TATASTEEL.NS", "SAIL.NS", "JINDALSTEL.NS", "NMDC.NS", 
    "NATIONALUM.NS", "GRASIM.NS"
  ],
  SoftwareAndITServices: [
    "INFY.NS", "TCS.NS", "HCLTECH.NS", "TECHM.NS", "WIPRO.NS", "KPITTECH.NS", 
    "LTTS.NS", "MPHASIS.NS", "PERSISTENT.NS", "CYIENT.NS", "COFORGE.NS"
  ],
  Automobiles: [
    "BAJAJ-AUTO.NS", "ASHOKLEY.NS", "EICHERMOT.NS", "HEROMOTOCO.NS", "M&M.NS", "MARUTI.NS", 
    "MRF.NS", "TATAMOTORS.NS"
  ],
  Retail: [
    "DMART.NS", "PVRINOX.NS", "VBL.NS", "PAGEIND.NS", "ZOMATO.NS", "TRENT.NS"
  ],
  ConsumerGoods: [
    "ASIANPAINT.NS", "HINDUNILVR.NS", "BRITANNIA.NS", "GODREJCP.NS", "MARICO.NS", "NESTLEIND.NS", 
    "DABUR.NS", "LUPIN.NS"
  ],
  Pharmaceuticals: [
    "CIPLA.NS", "DRREDDY.NS", "SUNPHARMA.NS", "AARTIIND.NS", "AUROPHARMA.NS", "LAURUSLABS.NS", 
    "BIOCON.NS"
  ],
  HealthcareProvidersAndServices: [
    "APOLLOHOSP.NS", "LALPATHLAB.NS", "MAXHEALTH.NS"
  ],
  TelecomProviders: [
    "BHARTIARTL.NS", "IDEA.NS", "INDUSTOWER.NS"
  ],
  RealEstateDevelopment: [
    "DLF.NS", "GODREJPROP.NS", "OBEROIRLTY.NS", "LODHA.NS"
  ],
  GasAndWaterUtilities: [
    "IGL.NS", "GUJGASLTD.NS"
  ],
  OtherUtilities: [
    "CONCOR.NS", "HUDCO.NS"
  ],
  InfrastructureAndEngineering: [
     "HAL.NS", "BOSCHLTD.NS", "SIEMENS.NS", "ABBOTINDIA.NS", "BHEL.NS", "PERSISTENT.NS"
  ],
  Fertilizers: [
    "CHAMBLFERT.NS", "PIIND.NS", "COROMANDEL.NS"
  ],
  OtherStocks: [
    "ZOMATO.NS", "PAYTM.NS", "NYKAA.NS", "IRCTC.NS", "MGL.NS", "METROPOLIS.NS", "INDIAMART.NS"
  ]
};

const Heatmap = () => {
  const [stocksData, setStocksData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedStock, setClickedStock] = useState(null);

  // Fetch stock data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(STOCK_API_URL);
      if (response.status === 200) {
        const stockData = response.data.data;
        setStocksData(stockData);
        setError(null);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError('Error: Unable to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  // Get the color based on the percentage change
  const getColor = (percentageChange) => {
    return percentageChange > 0 ? 'green' : percentageChange < 0 ? 'red' : 'yellow';
  };

  const handleStockClick = (symbol) => {
    setClickedStock(symbol);
    setTimeout(() => {
      setClickedStock(null); // Reset after 2 seconds
    }, 2000);
  };

  return (
    <div className="heatmap-wrapper">
      <TickerTape /> {/* TickerTape component at the top */}
      <div className="heatmap-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className="grid-container">
            {Object.keys(stockCategories).map((category, index) => (
              <div key={index} className="category-container">
                <div
                  className="category-header"
                  style={{
                    backgroundColor: 'grey',
                    padding: '5px 10px',
                    marginBottom: '10px',
                  }}
                >
                  <h3 style={{ margin: 0, color: 'yellow', fontSize: 'px', fontWeight: 'bold' }}>
                    {category}
                  </h3>
                </div>
                <div className="category-grid">
                  {stockCategories[category].map((symbol, i) => {
                    const stockData = stocksData[symbol];
                    const percentageChange = stockData ? stockData.percentage_change : null;
                    const isClicked = symbol === clickedStock;
                    return (
                      <div
                        key={i}
                        className="stock-block"
                        onClick={() => handleStockClick(symbol)}
                        style={{
                          backgroundColor: getColor(percentageChange),
                          transform: isClicked ? 'scale(1.5)' : 'scale(1)',
                          zIndex: isClicked ? 10 : 1, // Make the clicked block appear above others
                          transition: 'transform 0.3s ease-in-out',
                        }}
                      >
                        <p>{symbol}</p>
                        <p>{percentageChange !== null ? `${percentageChange.toFixed(2)}%` : "N/A"}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .heatmap-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          padding: 10px;
          overflow-x: hidden;
          background-image: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1737099346/Flux_Dev_Create_an_ultrasmooth_realistic_animated_background_t_3_dg0gcs.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .heatmap-container {
          width: 100%;
          max-width: 1700px;
          margin: 0 auto;
          padding: 20px;
          background: rgba(7, 7, 7, 0.8); /* Slight transparency for readability */
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 3px solid black;
          border-radius: 10px;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          padding: 10px;
        }
        .category-container {
          display: flex;
          flex-direction: column;
          margin: 2px;
          border: 2px solid black;
          padding: 10px;
          width: 420px;
          background-color: #d1a7a7; /* Fallback color */
          background-image: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1737711825/premium_photo-1675802520884-45ad9a50c2c9_mj1xun.jpg');
          background-size: cover;
          background-position: center;
          border-radius: 10px;
        }
        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          width: 100%;
        }
        .stock-block {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          padding: 10px;
          font-size: 12px;
          transition: all 0.3s ease-in-out;
        }
        .stock-block p {
          margin: 0;
          font-size: 10px;
          color: black;
        }
        .stock-block.green { background-color: #4caf50; }
        .stock-block.red { background-color: #d32f2f; }
        .stock-block.yellow { background-color: #ffeb3b; color: black; }
      `}</style>
    </div>
  );
};

export default Heatmap;
