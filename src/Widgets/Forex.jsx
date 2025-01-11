import React, { useEffect, useRef } from "react";

const ForexRatesWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Ensure the container is available
    if (!containerRef.current) return;

    // Create a new script element
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;

    // Set the script's content (with a properly formatted JSON object)
    const widgetConfig = {
      width: 1200,
      height: 600,
      currencies: [
        "EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY", 
        "TRY", "SEK", "NOK", "DKK", "ZAR", "HKD", "SGD", "THB", "MXN", 
        "IDR", "KRW", "PLN", "ISK", "KWD", "PHP", "MYR", "INR", "TWD", 
        "SAR", "AED", "RUB", "ILS", "ARS", "CLP", "COP", "PEN", "UYU"
      ],
      isTransparent: false,
      colorTheme: "dark",
      locale: "en",
      backgroundColor: "#000000",
    };

    // Convert the object to a string
    script.innerHTML = JSON.stringify(widgetConfig);

    // Append the script to the container once the script is loaded
    script.onload = () => {
      if (containerRef.current) {
        containerRef.current.appendChild(script);
      }
    };

    // Append the script to the DOM
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Cleanup the script when the component unmounts
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div ref={containerRef} className="tradingview-widget-container__widget" />
      
    </div>
  );
};

export default ForexRatesWidget;
