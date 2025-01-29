import React, { useState, useEffect } from "react";
import axios from "axios";
import TickerTape from "../Widgets/TickerTape";

const STOCK_API_URL = 'https://web-production-a7ae.up.railway.app/get_stock_data';

const stockCategories = {
  Banks: [
    "AXISBANK.NS", "AUBANK.NS", "BANDHANBNK.NS", "BANKBARODA.NS", "BANKINDIA.NS", "CANBK.NS", 
    "CUB.NS", "FEDERALBNK.NS", "HDFCBANK.NS", "ICICIBANK.NS", "IDFCFIRSTB.NS", "INDUSINDBK.NS", 
    "KOTAKBANK.NS", "PNB.NS", "RBLBANK.NS", "SBIN.NS", "YESBANK.NS"
  ],
  NBFCs: [
    "ABCAPITAL.NS", "ANGELONE.NS", "BAJFINANCE.NS", "BAJAJFINSV.NS", "CANFINHOME.NS", "CHOLAFIN.NS", 
    "HDFCAMC.NS", "HDFCLIFE.NS", "ICICIGI.NS", "ICICIPRULI.NS", "LICIHSGFIN.NS", "M&MFIN.NS", 
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
    "ASIANPAINT.NS", "BERGEPAINT.NS", "BRITANNIA.NS", "COLPAL.NS", "DABUR.NS", "GODREJCP.NS", 
    "HINDUNILVR.NS", "ITC.NS", "MARICO.NS", "NESTLEIND.NS", "TATACONSUM.NS", "UBL.NS", "UNITEDSPR.NS", 
    "VOLTAS.NS"
  ],
  Pharmaceuticals: [
    "ALKEM.NS", "APLLTD.NS", "AUROPHARMA.NS", "BIOCON.NS", "CIPLA.NS", "DIVISLAB.NS", "DRREDDY.NS", 
    "GLENMARK.NS", "GRANULES.NS", "LAURUSLABS.NS", "LUPIN.NS", "SUNPHARMA.NS", "SYNGENE.NS", "TORNTPHARM.NS"
  ],
  HealthcareProvidersAndServices: [
    "APOLLOHOSP.NS", "LALPATHLAB.NS", "MAXHEALTH.NS", "METROPOLIS.NS"
  ],
  TelecomProviders: [
    "BHARTIARTL.NS", "HFCL.NS", "IDEA.NS", "INDUSTOWER.NS"
  ],
  RealEstateDevelopment: [
    "DLF.NS", "GODREJPROP.NS", "LODHA.NS", "OBEROIRLTY.NS", "PRESTIGE.NS"
  ],
  GasAndWaterUtilities: [
    "GUJGASLTD.NS", "IGL.NS", "MGL.NS"
  ],
  OtherUtilities: [
    "CONCOR.NS", "CESC.NS", "HUDCO.NS", "IRFC.NS"
  ],
  InfrastructureAndEngineering: [
    "ABBOTINDIA.NS", "BEL.NS", "CGPOWER.NS", "CUMMINSIND.NS", "HAL.NS", "L&T.NS", "SIEMENS.NS", "TIINDIA.NS"
  ],
  Fertilizers: [
    "CHAMBLFERT.NS", "COROMANDEL.NS", "GNFC.NS", "PIIND.NS"
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
    const interval = setInterval(fetchData, 10000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const getColor = (percentageChange) => {
    if (percentageChange > 0) {
      // Darker green for larger positive values, lighter green for smaller positive values
      return percentageChange > 5 ? '#007A00' : '#76FF7A'; // Dark green for > 5%, light green for smaller positive changes
    } else if (percentageChange < 0) {
      // Darker red for larger negative values, lighter red for smaller negative values
      return percentageChange < -5 ? '#8B0000' : '#C6011F'; // Dark red for < -5%, light red for smaller negative changes
    } else {
      return 'yellow'; // Yellow for 0% change
    }
  };
  

  const calculateBlockSize = (percentageChange, maxMomentum) => {
    // Normalize the block size based on the largest momentum in the sector
    const absoluteChange = Math.abs(percentageChange); 
    return (absoluteChange / maxMomentum) * 100;  // Proportional scaling based on max momentum
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
