import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // Use NavLink for navigation
import { FaHome } from "react-icons/fa"; // Import required icons only
import TickerTape from "../Widgets/TickerTape";
import Heatmap from "../Widgets/heatmap";
import Crypto from "../Widgets/crypto";
import Forex from "../Widgets/Forex";

const MarketPulse = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Redirect unauthorized users to /login
    }
  }, [navigate]);

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

          .nav-links li a:hover,
          .nav-links li a.active-link {
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

          .main-container,
          .additional-container {
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
          <img
            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1734769382/Add_a_heading__1_-removebg-preview_gpcqii.png"
            alt="Logo"
          />
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/home" activeClassName="active-link">
              <FaHome style={{ marginRight: "10px", color: "yellow" }} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/marketpulse" activeClassName="active-link">
              <i className="fa fa-chart-line"></i> Market Pulse
            </NavLink>
          </li>
          <li>
            <NavLink to="/insiderstrategy" activeClassName="active-link">
              <i className="fa fa-cogs"></i> Insider Strategy
            </NavLink>
          </li>
          {/* Add other links with NavLink */}
        </ul>
      </div>

      <div className="content">
        <div className="ticker-container">
          <TickerTape />
        </div>

        <div className="heading">Sensex Heatmap</div>
        <div className="main-container">
          <Heatmap />
        </div>

        <div className="heading">Crypto Heatmap</div>
        <div className="additional-container">
          <Crypto />
        </div>

        <div className="heading">Forex</div>
        <div className="additional-container">
          <Forex />
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;
