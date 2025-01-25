import React from "react";
import TickerTape from "../Widgets/TickerTape";

// CSS styles moved outside the component to avoid dependency warnings
const styles = `
  /* Importing Google Fonts */
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

  body {
    font-family: "Poppins", sans-serif;
    margin: 0;
    padding: 0;
    background: black;
    overflow-x: hidden;
  }

  /* Sidebar Styles */
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

  /* Sidebar Scrollbar Customization */
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

  /* Logo Styling */
  .logo {
    text-align: center;
    margin-bottom: 0;
  }

  .logo img {
    width: 140px;
    height: 140px;
    margin-bottom: 0;
  }

  /* Navigation Links */
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

  /* Content Styles */
  .content {
    margin-left: 250px;
    padding: 20px;
    background-image: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1737711825/premium_photo-1675802520884-45ad9a50c2c9_mj1xun.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    min-height: 100vh;
  }

  /* Ticker Container Styling */
  .ticker-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    z-index: 1;
    margin-bottom: 20px;
  }
`;

const HomePage = () => {
  // Append styles dynamically
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet); // Clean up on component unmount
    };
  }, []); // No dependencies needed since styles are static

  return (
    <div>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png"
            alt="Logo"
          />
        </div>
        <ul className="nav-links">
          {/* Navigation Links */}
          <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Market Pulse</a></li>
          <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li>
          <li><a href="/marketpulse"><i className="fa fa-th"></i>Sector Scope</a></li>
          <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
          <li><a href="/marketpulse"><i className="fa fa-clock"></i>Option Clock</a></li>
          <li><a href="/marketpulse"><i className="fa fa-users"></i>FII / DII</a></li>
          <li><a href="/marketpulse#"><i className="fa fa-arrow-up"></i>Index Mover</a></li>
          <li><a href="/tradejournal"><i className="fa fa-book"></i>Trading Journal</a></li>
          <li><a href="/marketpulse"><i className="fa fa-graduation-cap"></i>Trade Tutor</a></li>
          <li><a href="/technical"><i className="fa fa-video"></i>Technial Analysis</a></li>
          <li><a href="/calcu"><i className="fa fa-calendar-check"></i>Calculator</a></li>
        </ul>
      </div>

      {/* Content */}
      <div className="content">
        {/* Ticker Tape */}
        <div className="ticker-container">
          <TickerTape />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
