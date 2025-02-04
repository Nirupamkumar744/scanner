import React, { useState, useEffect } from "react";
import axios from "axios";
import TickerTape from "../Widgets/TickerTape";



const STOCK_API_URL = 'https://web-production-96a94.up.railway.app/get_stock_data';

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
    "ASIANPAINT.NS", "BERGEPAINT.NS", "BRITANNIA.NS", "COLPAL.NS", "DABUR.NS", "GODREJCP.NS", 
    "HINDUNILVR.NS", "ITC.NS", "MARICO.NS", "NESTLEIND.NS", "TATACONSUM.NS", "UBL.NS", 
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
    "ABBOTINDIA.NS", "BEL.NS", "CGPOWER.NS", "CUMMINSIND.NS", "HAL.NS", "SIEMENS.NS", "TIINDIA.NS"
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
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(STOCK_API_URL);
      if (response.status === 200 && response.data.stocks) {
        console.log("Fetched data:", response.data.stocks); // Debugging
        setStocksData(response.data.stocks);
        setLastUpdated(response.data.last_updated);
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
      <strong>{symbol}</strong>
      <p>₹{price.toFixed(2)}</p>
      <p>{change.toFixed(2)}%</p>
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stocksData || Object.keys(stocksData).length === 0) return <div>No stock data available.</div>;

  return (
    <div>
      <TickerTape />
      <h2>Stock Heatmap</h2>
      <p style={{ fontSize: "14px", color: "#999" }}>Last Updated: {lastUpdated}</p>
      {Object.entries(stockCategories).map(([category, stocks]) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h3>{category}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {stocks.map(symbol => (
              stocksData[symbol] ? (
                <StockBlock
                  key={symbol}
                  symbol={symbol}
                  price={stocksData[symbol].current_price}
                  change={stocksData[symbol].percentage_change}
                  color={getColor(stocksData[symbol].percentage_change)}
                />
              ) : (
                <div key={symbol} style={{ width: "120px", height: "120px", textAlign: "center", padding: "10px", margin: "5px", borderRadius: "5px", backgroundColor: "#ddd", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  No Data
                </div>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
