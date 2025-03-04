import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef();
  const scriptLoaded = useRef(false);  // To track whether the script has been loaded

  useEffect(() => {
    const currentContainer = container.current;
    const scriptId = 'heat-widget-script';

    // Ensure the script is loaded only once
    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      script.id = scriptId;

      script.innerHTML = `
        {
          "dataSource": "Crypto",
          "blockSize": "market_cap_calc",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "98%",
          "height": "98%"
        }`;

      // Append the script with a slight delay to ensure everything is ready
      setTimeout(() => {
        currentContainer.appendChild(script);
      }, 100); // 100ms delay to ensure the DOM is ready

      // Mark the script as loaded
      scriptLoaded.current = true;

      // Clean up: Remove the script when the component is unmounted
      return () => {
        if (currentContainer.contains(script)) {
          currentContainer.removeChild(script);
        }
      };
    }
  }, []); // Run only once when the component is mounted

  return (
    <div ref={container} id="tradingview-widget-container" className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      
    </div>
  );
}

export default memo(TradingViewWidget);
