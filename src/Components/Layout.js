import React from "react";
import { FaHome } from "react-icons/fa";
import TickerTape from "../Widgets/TickerTape"; // Ensure this is the correct path

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/dyrn2eg1j/image/upload/v1740734340/Add_a_subheading_1_pui9fq.png"
            alt="Logo"
          />
        </div>
        <ul className="nav-links">
          <li>
            <a href="/home">
              <FaHome style={{ marginRight: "10px", color: "yellow" }} />
              Home
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-chart-line"></i>Market Pulse
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-cogs"></i>Insider Strategy
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-th"></i>Sector Scope
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-signal"></i>Swing Spectrum
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-clock"></i>Option Clock
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-users"></i>FII / DII
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-arrow-up"></i>Index Mover
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-book"></i>Trading Journal
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-graduation-cap"></i>Trade Tutor
            </a>
          </li>
          <li>
            <a href="https://stockarchery.in/about">
              <i className="fa fa-video"></i>Strategy Video
            </a>
          </li>
          <li>
            <a href="/calcu">
              <i className="fa fa-calendar-check"></i>Calculator
            </a>
          </li>
        </ul>
      </div>

      <div className="content">
        <div className="ticker-container">
          <TickerTape />
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

        .layout-container {
          font-family: "Poppins", sans-serif;
          margin: 0;
          padding: 0;
          background: black;
          overflow-x: hidden;
        }

        .sidebar {
          width: 250px;
          height: 100vh;
          background: linear-gradient(180deg, #2c3e50, #4a69bd);
          position: fixed;
          top: 0;
          left: 0;
          padding: 20px 0;
          color: white;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
          z-index: 2;
          overflow-y: auto;
        }

        .logo img {
          width: 140px;
          height: 140px;
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
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Layout;
