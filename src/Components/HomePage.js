import React from "react";
import TickerTape from "../Widgets/TickerTape";
import Chart from "../Widgets/chart";
import "./HomePage.css"; // Move styles to an external CSS file

const HomePage = () => {
  return (
    <div>
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png"
            alt="Logo"
          />
        </div>
        <ul className="nav-links">
          <li>
            <a href="/marketpulse">
              <i className="fa fa-chart-line"></i>Market Pulse
            </a>
          </li>
          <li>
            <a href="/insiderstrategy">
              <i className="fa fa-cogs"></i>Insider Strategy
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-th"></i>Sector Scope
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-signal"></i>Swing Spectrum
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-clock"></i>Option Clock
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-users"></i>FII / DII
            </a>
          </li>
          <li>
            <a href="/marketpulse#">
              <i className="fa fa-arrow-up"></i>Index Mover
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-book"></i>Trading Journal
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-graduation-cap"></i>Trade Tutor
            </a>
          </li>
          <li>
            <a href="/technical">
              <i className="fa fa-video"></i>Technial Analysis </a>
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
       

        {/* Nifty Charts Container */}
        <div className="nifty-charts-container">
          <h2>Nifty Charts</h2>
          <iframe
            src="https://tradinglead.in/"
            width="100%"
            height="600"
            style={{ border: "none" }}
            title="Nifty Chart"
          ></iframe>
        </div>

        <h2 className="crypto-chart-heading">CRYPTO CHART</h2>
        <div className="main-container">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
