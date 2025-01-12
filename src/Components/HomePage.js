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
            src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1734769382/Add_a_heading__1_-removebg-preview_gpcqii.png"
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
            <a href="/marketpulse">
              <i className="fa fa-video"></i>Strategy Video
            </a>
          </li>
          <li>
            <a href="/marketpulse">
              <i className="fa fa-calendar-check"></i>Calculator
            </a>
          </li>
        </ul>
      </div>

      <div className="content">
        <div className="ticker-container">
          <TickerTape />
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
