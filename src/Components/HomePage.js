import React, { useEffect, useState } from "react";
import TickerTape from "../Widgets/TickerTape";

const HomePage = () => {
  const [animationFinished, setAnimationFinished] = useState(false);

  // Dynamically inject styles into the head
  useEffect(() => {
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
        position: relative;
      }

      /* Ticker Container Styling */
      .ticker-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        z-index: 1;
        margin-bottom: 20px;
      }

      /* Golden Rectangular Container Below Ticker Tape */
      .ticker-container-right {
        width: 97.5%;
        height: 450px;
        background: white;
        box-shadow: 0 4px 20px rgba(255, 215, 0, 0.5);
        padding: 15px;
        border-radius: 8px;
        color: #2e2e2e;
        margin-top: 20px;
        border: 2px solid #ffcc00;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
      }

      /* Logo Image Styling Inside Right Container */
      .ticker-container-right .logo-right {
        position: absolute;
        top: 15px;
        right: 15px;
        bottom: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .ticker-container-right .logo-right img {
        width: 460px;
        height: 460px;
        object-fit: contain;
      }

      /* Typing Animation Styling for Heading */
      .typing-effect {
        font-size: 42px;
        font-weight: 600;
        color: rgb(0, 7, 70);
        white-space: nowrap;
        overflow: hidden;
        width: 0;
        animation: typing-heading 4s steps(30) 1s forwards;
      }

      /* Typing Animation Styling for Paragraph */
      .typing-effect-paragraph {
        font-size: 22px;
        font-weight: 400;
        color: rgb(0, 7, 70);
        white-space: nowrap;
        overflow: hidden;
        width: 0;
        animation: typing-paragraph 4s steps(40) 5s forwards, fadeIn 3s 9s forwards;
      }

      /* Keyframes for Typing animation for Heading */
      @keyframes typing-heading {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      /* Keyframes for Typing animation for Paragraph */
      @keyframes typing-paragraph {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      /* Keyframes for Fade-in Effect */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Bottom Container for Loosers and Gainers Tables */
      .ticker-container-bottom {
        width: 97.5%;
        background-color: white;
        margin-top: 20px;
        padding: 15px;
        box-shadow: 0 4px 20px rgba(255, 215, 0, 0.5);
        border-radius: 8px;
        color: #2e2e2e;
        border: 2px solid #ffcc00;
      }

      /* Table Styling */
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      .table th, .table td {
        padding: 10px;
        text-align: center;
        border: 1px solid #ddd;
      }

      .table th {
        background-color: #f4f4f4;
      }

      .table tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      .table tr:hover {
        background-color: #f1f1f1;
      }

      .table .header {
        background-color: #ffcc00;
        color: black;
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet); // Clean up on component unmount
    };
  }, []);

  useEffect(() => {
    const typingEffect = document.querySelector(".typing-effect");

    const handleAnimationEnd = () => {
      setAnimationFinished(true); // Set state when animation ends
    };

    // Add event listener to handle animation end
    if (typingEffect) {
      typingEffect.addEventListener("animationend", handleAnimationEnd);
    }

    // Clean up the event listener
    return () => {
      if (typingEffect) {
        typingEffect.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

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
          <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
          <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Crypto/Forex</a></li>
          <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li> 
          <li><a href="/tradejournal"><i className="fa fa-book"></i>Trading Journal</a></li>
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

        {/* Golden Rectangular Container Below Ticker Tape */}
        <div className="ticker-container-right">
          {/* Typing Heading on the Left Side */}
          <div className={`typing-effect ${animationFinished ? "finished" : ""}`}>
            Welcome to the Stock Market Dashboard!
          </div>

          {/* Typing Paragraph Below the Heading */}
          <div className="typing-effect-paragraph">
            This is a golden container placed below the ticker tape with a glowing effect.
          </div>

          {/* Logo Image on the right side */}
          <div className="logo-right">
            <img
              src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png"
              alt="Logo"
            />
          </div>
        </div>

        {/* Ticker Container Bottom with Loosers and Gainers Tables */}
        <div className="ticker-container-bottom">
          {/* Loosers Table */}
          <h3>Loosers</h3>
          <table className="table">
            <thead>
              <tr className="header">
                <th>Stock</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stock A</td>
                <td>$100</td>
                <td>-5%</td>
              </tr>
              <tr>
                <td>Stock B</td>
                <td>$50</td>
                <td>-4%</td>
              </tr>
            </tbody>
          </table>

          {/* Gainers Table */}
          <h3>Gainers</h3>
          <table className="table">
            <thead>

                <tr className="header">
                <th>Stock</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stock C</td>
                <td>$120</td>
                <td>+6%</td>
              </tr>
              <tr>
                <td>Stock D</td>
                <td>$75</td>
                <td>+4.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

