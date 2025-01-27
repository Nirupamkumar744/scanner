import React from "react";
import { FaHome } from "react-icons/fa"; // Keep only the used icons


import TickerTape from '../Widgets/TickerTape'; 
import Heatmap from '../Widgets/heatmap'; 
import Crypto from "../Widgets/crypto";
import Forex from "../Widgets/Forex";

const MarketPulse = () => {
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
            background: rgba(255, 255, 255, 0.1);
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
            background: rgba(255, 255, 255, 0.1);
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

      <div className="sidebar">
        <div className="logo">
          <img src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="/home"><FaHome style={{ marginRight: '10px', color: "yellow" }} />Home</a></li>
          
          <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li>
          
          <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
          
          <li><a href="/tradejournal"><i className="fa fa-book"></i>Trading Journal</a></li>
          
          <li><a href="/technical"><i className="fa fa-video"></i>Technical Analysis</a></li>
          <li><a href="/calcu"><i className="fa fa-calendar-check"></i>Calculator</a></li>
        </ul>
      </div>

      <div className="content">
        {/* Ticker Tape added here */}
        <div className="ticker-container">
          <TickerTape />
        </div>

        {/* Heading for Sensex Heatmap */}
        <div className="heading">Sensex Heatmap</div>

        <div className="main-container">
          {/* Render the Heatmap component */}
          <Heatmap />
        </div>

        <div className="heading">Crypto Heatmap</div>
        <div className="additional-container">
          {/* Render any component or content here */}
          <Crypto />
        </div>

        {/* Additional Container 2 */}
        <div className="additional-container">
          <Forex />
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;