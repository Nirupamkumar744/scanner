import React, { useState } from "react";
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
    background-image: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1737711825/premium_photo-1675802520884-45ad9a50c2c9_mj1xun.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    min-height: 100vh;
  }

  .ticker-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    z-index: 1;
    margin-bottom: 20px;
  }

  .heading {
    text-align: center;
    font-size: 48px;
    font-weight: 700;
    color: gold;
    margin-top: 40px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  }

  .rectangle-container {
    margin: 20px auto;
    width: 98%;
    height: 980px;
    background: black;
    border: 2px solid gold;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    padding: 10px;
    position: relative;
  }

  .rectangle-container h2 {
    font-size: 24px;
    color: gold;
    font-weight: 600;
    margin: 0;
    padding: 10px;
    align-self: flex-start;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
  }

  .month {
    background: #333;
    border: 2px solid gold;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    color: white;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }

  .month h3 {
    margin: 0;
    font-size: 22px;
    color: gold;
  }

  .month-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 5px;
    margin-top: 10px;
  }

  .month-day {
    background: #444;
    padding: 5px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
  }

  .weekend {
    background: red !important;
  }

  /* Modal Styling */
  .trade-calculator-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  .modal-content h2 {
    font-size: 24px;
    color: black;
    margin-bottom: 20px;
    text-align: center;
  }

  .modal-content label {
    display: block;
    margin: 10px 0 5px;
    font-size: 16px;
    color: #333;
  }

  .modal-content input {
    width: 98%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .modal-buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  .modal-buttons button:first-child {
    background-color: #f44336; /* Red for Close */
    color: white;
  }

  .modal-buttons button:last-child {
    background-color: #4caf50; /* Green for Submit */
    color: white;
  }

  select {
    width: 98%;
    padding: 8px;
    border-radius: 5px;
    background-color: #333;
    color: white;
    border: 2px solid gold;
    font-size: 16px;
  }

  .add-trade-button {
    background-color: rgb(247, 203, 59); /* Yellow for Add Trade */
    color: black;
    font-size: 14px;
    padding: 8px 15px;
    border: none;
    border-radius: 30px; /* Round corners */
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: absolute; /* Position it on the top-right corner */
    top: 20px;
    right: 20px;
  }

  .add-trade-button:hover {
    background-color: #45a049;
  }
`;

const TradeJournal = () => {
  // State to control modal visibility and trade data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState("");
  const [stockName, setStockName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [profitLoss, setProfitLoss] = useState(null);

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to calculate profit or loss
  const calculateProfitLoss = () => {
    let profitOrLoss = 0;

    if (tradeType === "long") {
      profitOrLoss = sellPrice - buyPrice;
    } else if (tradeType === "short") {
      profitOrLoss = buyPrice - sellPrice;
    }

    const totalProfitLoss = profitOrLoss * quantity;
    setProfitLoss(totalProfitLoss);
  };

  return (
    <>
      <style>{styles}</style>

      {/* Sidebar and content */}
      <div className="sidebar">
        <div className="logo">
          <img src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png" alt="Logo" />
        </div>
        <ul className="nav-links">
        <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Market Pulse</a></li>
        <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Market Pulse</a></li>
        <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li>
        <li><a href="/marketpulse"><i className="fa fa-th"></i>Sector Scope</a></li>
        <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
        <li><a href="/marketpulse"><i className="fa fa-clock"></i>Option Clock</a></li>
        <li><a href="/marketpulse"><i className="fa fa-users"></i>FII / DII</a></li>
        <li><a href="/marketpulse#"><i className="fa fa-arrow-up"></i>Index Mover</a></li>
        <li><a href="/marketpulse"><i className="fa fa-book"></i>Trading Journal</a></li>
        <li><a href="/marketpulse"><i className="fa fa-graduation-cap"></i>Trade Tutor</a></li>
        <li><a href="/technical"><i className="fa fa-video"></i>Technical Analysis</a></li>
  <li><a href="/calcu"><i className="fa fa-calendar-check"></i>Calculator</a></li>
        </ul>
      </div>

      <div className="content">
        <div className="ticker-container">
          <TickerTape />
        </div>

        <h1 className="heading">Trade Journal</h1>

        <div className="rectangle-container">
          <h2>Trade Details</h2>
          <button className="add-trade-button" onClick={openModal}>Add Trade</button>
          <div className="calendar-grid">
            {/* Months and Days (dynamic calendar render) */}
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => (
              <div className="month" key={idx}>
                <h3>{month}</h3>
                <div className="month-days">
                  {[...Array(30).keys()].map((day, index) => (
                    <div key={index} className={`month-day ${index % 7 === 0 || (index + 1) % 7 === 0 ? 'weekend' : ''}`}>
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for trade calculation */}
      {isModalOpen && (
        <div className="trade-calculator-modal">
          <div className="modal-content">
            <h2>Trade Calculator</h2>
            <label>Stock Name</label>
            <input
              type="text"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
              placeholder="Enter stock name"
            />
            <label>Trade Type</label>
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
            <label>Buy Price</label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              placeholder="Enter buy price"
            />
            <label>Sell Price</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              placeholder="Enter sell price"
            />
            <div className="modal-buttons">
              <button onClick={closeModal}>Close</button>
              <button onClick={calculateProfitLoss}>Submit</button>
            </div>

            {profitLoss !== null && (
              <div className="profit-loss-display">
                <h3>Profit/Loss: {profitLoss}</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TradeJournal;
