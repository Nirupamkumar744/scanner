import React, { useEffect } from 'react';

const TickerTape = () => {
  useEffect(() => {
    // Check if the script already exists
    if (!document.getElementById('tradingview-widget-script')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = true;
      script.id = 'tradingview-widget-script'; // Set an ID to identify the script

      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500 Index" },
          { "proName": "FOREXCOM:NSXUSD", "title": "US 100 Cash CFD" },
          { "proName": "FX_IDC:EURUSD", "title": "EUR to USD" },
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
          { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" }
        ],
        "showSymbolLogo": true,
  "isTransparent": false,
  "displayMode": "compact",
  "colorTheme": "dark",
  "locale": "en"
      });

      document.getElementById('tradingview-widget').appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview-widget" className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
         
        </a>
      </div>
    </div>
  );
};

export default TickerTape;
