
import React, { useState } from "react";
import TickerTape from '../Widgets/TickerTape'; 
import Crypto from "../Widgets/crypto";
import Forex from "../Widgets/Forex";
import NavBar from "./NavBar/NavBar";


const MarketPulse = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to handle nav visibility
  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: black;
            overflow-x: hidden;
          }

          .content {
            
            background-color: #252525;
            background-size: cover; /* Ensure the background covers the entire area */
            background-position: center; /* Center the background image */
            background-repeat: no-repeat; /* Prevent the background from repeating */
            color: white; /* Set text color to white for better contrast */
            min-height: 100vh; /* Ensure the content area takes at least full viewport height */
            position: relative; /* Maintain relative positioning */
          }

          .ticker-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            z-index: 1;
            margin-bottom: 20px;
          }

          .main-container {
            width: 1200px;
            height: 620px;
            background-color: #252525;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            margin: 20px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 18px;
            font-weight: 500;
          }

          .additional-container {
            width: 1200px;
            height: 600px;
            background-color: #252525;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            margin: 20px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 18px;
            font-weight: 500;
          }

          .heading {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #FFD700;
          }
        `}
      </style>
      <NavBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <div className="content">
        {/* Ticker Tape added here */}
        <div className="ticker-container">
          <TickerTape />
        </div>

        <div className="heading">Crypto Heatmap</div>
        <div className="additional-container">
          {/* Render any component or content here */}
          <Crypto />
        </div>

        <div className="additional-container">
          <Forex />
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;