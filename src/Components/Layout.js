import React from "react";
import { FaHome  } from "react-icons/fa";

import TickerTape from '../Widgets/TickerTape'; // Make sure this is correctly imported

const Layout = () => {
  const boxWidth = 150;
  const margin = 15;
  const totalBoxes = 100;
  const scrollSpeed = 1;

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
            background: linear-gradient(180deg, #2C3E50, #4A69BD);
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

          .tall-box {
            margin-left: 50px;
            width: calc(110% - 250px);
            height: 200vh;
            background: linear-gradient(135deg,rgb(169, 182, 219), #6A89CC);
            border-radius: 12px;
            box-shadow: 0px 15px 35px rgba(42, 48, 63, 0.8), 0px -15px 35px rgba(106, 137, 204, 0.8);
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: space-evenly;
            color: white;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            padding: 20px;
            gap: 20px;
          }

          .card {
            display: flex;
            flex-direction: row;
            width: 48%;
            height: 30vh;
            background: linear-gradient(135deg, #000000, #2C2C2C);
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            color: white;
            font-weight: bold;
            font-size: 16px;
            margin: 10px;
            transition: all 0.3s ease;
          }

          .card:hover {
            transform: scale(1.05);
          }

          .card-image {
            flex: 1; 
            width: 50%; 
            height: 100%;
            overflow: hidden;
          }

          .card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .card-content {
            flex: 1;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .card-content h3 {
            font-size: 18px;
            margin: 20px 0 10px;
            font-weight: bold;
            color: #FFD700;
          }

          .card-content p {
            font-size: 14px;
            margin: 0 0 10px;
            color: #ccc;
          }

          .card-content button {
            align-self: flex-start;
            padding: 12px 24px;
            background: linear-gradient(135deg, #4A69BD, #6A89CC);
            color: white;
            border-radius: 8px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.3s ease;
          }

          .card-content button:hover {
            background: #2C3E50;
            transform: translateY(-3px);
          }
        `}
      </style>

      <div className="sidebar">
        <div className="logo">
          <img src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1734769382/Add_a_heading__1_-removebg-preview_gpcqii.png" alt="Logo" />
        </div>
        <ul className="nav-links">
        <li><a href="/home"><FaHome style={{ marginRight: '10px', color: "yellow" }} />Home</a></li>
          <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Market Pulse</a></li>
          <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li>
          <li><a href=""><i className="fa fa-th"></i>Sector Scope</a></li>
          <li><a href=""><i className="fa fa-signal"></i>Swing Spectrum</a></li>
          <li><a href=""><i className="fa fa-clock"></i>Option Clock</a></li>
          <li><a href=""><i className="fa fa-users"></i>FII / DII</a></li>
          <li><a href=""><i className="fa fa-arrow-up"></i>Index Mover</a></li>
          <li><a href=""><i className="fa fa-book"></i>Trading Journal</a></li>
          <li><a href=""><i className="fa fa-graduation-cap"></i>Trade Tutor</a></li>
          <li><a href=""><i className="fa fa-video"></i>Strategy Video</a></li>
          <li><a href=""><i className="fa fa-calendar-check"></i>Calculator</a></li>
        </ul>
      </div>

      <div className="content">
        {/* Ticker Tape added here */}
        <div className="ticker-container">
          <TickerTape />
        </div>

        {/* Remaining layout, such as the cards section */}
      
      </div>
    </div>
  );
};

export default Layout;
