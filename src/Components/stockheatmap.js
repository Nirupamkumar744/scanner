import React, { useState, useEffect } from "react";
import axios from "axios";
import TickerTape from "../Widgets/TickerTape";

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

  const getColor = (percentageChange) => {
    return percentageChange > 0 ? 'green' : percentageChange < 0 ? 'red' : 'yellow';
  };

  const calculateBlockSize = (percentageChange, maxMomentum) => {
    // Normalize the block size based on the largest momentum in the sector
    const absoluteChange = Math.abs(percentageChange); 
    return (absoluteChange / maxMomentum) * 100;  // Proportional scaling based on max momentum
  };

  const calculateTotalMomentum = (categoryData) => {
    return categoryData.reduce((total, stock) => total + Math.abs(stock.percentageChange), 0);
  };

  return (
    <div className="heatmap-wrapper">
      <TickerTape />
      <div className="heatmap-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className="grid-container">
            {Object.keys(stockCategories)
              .map((category) => {
                const categoryStocks = stockCategories[category];
                const categoryData = categoryStocks
                  .map((symbol) => ({
                    symbol,
                    percentageChange: stocksData[symbol]?.percentage_change ?? null,
                  }))
                  .filter((stock) => stock.percentageChange !== null);

                const maxMomentum = Math.max(...categoryData.map(stock => Math.abs(stock.percentageChange)));

                return {
                  category,
                  categoryData,
                  maxMomentum,
                };
              })
              .map((categoryObj, index) => {
                const { category, categoryData, maxMomentum } = categoryObj;

                // Sorting the data within the sector by momentum
                const sortedCategoryData = categoryData.sort((a, b) => {
                  return Math.abs(b.percentageChange) - Math.abs(a.percentageChange);
                });

                return (
                  <div
                    key={index}
                    className="category-container"
                    style={{
                      backgroundColor: '#28282B',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="category-header">
                      <h3>{category}</h3>
                    </div>
                    <div className="category-grid">
                      {sortedCategoryData.map((stock, i) => {
                        const blockSize = calculateBlockSize(stock.percentageChange, maxMomentum);
                        return (
                          <div
                            key={i}
                            className="stock-block"
                            style={{
                              backgroundColor: getColor(stock.percentageChange),
                              flexGrow: blockSize,
                              height: `${blockSize}px`,
                              transition: 'all 0.3s ease-in-out',
                              margin: '1px',
                              minWidth: '80px', 
                              minHeight: '50px', 
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              padding: '5px',
                              borderRadius: '5px',
                            }}
                          >
                            <p>{stock.symbol}</p>
                            <p>{stock.percentageChange.toFixed(2)}%</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <style jsx>{`
  .heatmap-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 99%;
    background-color: #111;
    padding: 20px;
    background-color: #301934;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .heatmap-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .category-container {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
  }

  .category-header h3 {
    color: white;
    margin: 0 0 10px 0;
  }

  .category-grid {
    display: flex;
    gap: 2px;
    flex-wrap: wrap;
  }

  .stock-block {
    flex: 1 1 auto;
    background: gray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    padding: 5px;
    transition: transform 0.3s ease-in-out; /* Smooth transition */
  }

  .stock-block:hover {
    transform: scale(1.2); /* Zoom effect on hover */
    z-index: 1; /* Bring the hovered block to the front */
  }

  .stock-block p {
    margin: 0;
    font-size: 12px;
    color: black;
  }
`}</style>
    </div>
  );
};

export default Heatmap;
