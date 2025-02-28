import React, { useState, useCallback, useEffect } from "react";
import TickerTape from "../Widgets/TickerTape"; // Import the TickerTape component
import { FaHome } from "react-icons/fa";
import { db } from "./firebase"; // Assuming your firebase is set up in the firebase.js file
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// CSS styles moved outside the component to avoid dependency warnings
const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

  body {
    font-family: "Poppins", sans-serif;
    margin: 0;
    padding: 0;
    background: black;
    overflow-x: hidden;
  }

  .sidebar {
    width: 250px;
    height: 100vh;
     background-color: #252525;
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
    height: 1080px;
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
    position: relative; /* For positioning the popup */
  }

  .weekend {
    background: red !important;
  }

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
    background-color: #f44336;
    color: white;
  }

  .modal-buttons button:last-child {
    background-color: #4caf50;
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
    background-color: rgb(247, 203, 59);
    color: black;
    font-size: 14px;
    padding: 8px 15px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .add-trade-button:hover {
    background-color: #45a049;
  }

  .popup {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    top: -30px; /* Adjust as needed */
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
`;

const TradeJournal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState("");
  const [stockName, setStockName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [profitLoss, setProfitLoss] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [overallProfitLoss, setOverallProfitLoss] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const calculateProfitLoss = useCallback(() => {
    let profitOrLoss = 0;
    if (tradeType === "long") {
      profitOrLoss = sellPrice - buyPrice;
    } else if (tradeType === "short") {
      profitOrLoss = buyPrice - sellPrice;
    }
    const totalProfitLoss = profitOrLoss * quantity;
    setProfitLoss(totalProfitLoss);
  }, [tradeType, buyPrice, sellPrice, quantity]);

  const saveTrade = async () => {
    try {
      const user = getAuth().currentUser ;
      if (!user) {
        alert("User  not authenticated");
        return;
      }
      const userId = user.uid; // Use UID instead of email
      const tradesRef = collection(db, "users", userId, "Trade");
      const tradeRef = doc(tradesRef);
      await setDoc(tradeRef, {
        tradeType,
        stockName,
        quantity,
        buyPrice,
        sellPrice,
        profitLoss,
        timestamp: new Date(),
      });
      alert("Trade saved successfully!");
      closeModal();
    } catch (error) {
      console.error("Error saving trade: ", error.message);
      alert(`Error saving trade: ${error.message}`);
    }
  };

  useEffect(() => {
    if (buyPrice && sellPrice && quantity) {
      calculateProfitLoss();
    }
  }, [buyPrice, sellPrice, quantity, calculateProfitLoss]);

  const fetchOverallProfitLoss = async (date) => {
    try {
      const user = getAuth().currentUser ;
      if (!user) return;

      const userId = user.uid; // Use UID instead of email
      const tradesRef = collection(db, "users", userId, "Trade");
      const querySnapshot = await getDocs(tradesRef);
      let totalProfitLoss = 0;

      querySnapshot.forEach((doc) => {
        const trade = doc.data();
        const tradeDate = trade.timestamp.toDate().toDateString(); // Convert timestamp to date string
        if (tradeDate === date) {
          totalProfitLoss += trade.profitLoss || 0; // Accumulate profit/loss
        }
      });

      setOverallProfitLoss(totalProfitLoss);
    } catch (error) {
      console.error("Error fetching trades: ", error.message);
    }
  };

  const handleMouseEnter = (day, month) => {
    if (day) {
      const date = new Date(2025, month, day).toDateString(); // Include month in the date
      setHoveredDate(date);
      fetchOverallProfitLoss(date);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
    setOverallProfitLoss(0);
  };

  const getMonthDays = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const months = Array.from({ length: 12 }, (_, index) => {
    const month = new Date(2025, index, 1); // Example year 2025
    return {
      name: month.toLocaleString("default", { month: "long" }),
      days: getMonthDays(index, 2025),
    };
  });

  return (
    <>
      <style>{styles}</style>

      <div className="sidebar">
        <div className="logo">
          <img src="https://res.cloudinary.com/dyrn2eg1j/image/upload/v1740729458/Add_a_subheading_zggqbd.png" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="/home"><FaHome style={{ marginRight: "10px", color: "gold" }} />Home</a></li>
          <li><a href="/heat"><i className="fa fa-signal"></i>Heatmap</a></li>
          <li><a href="/marketpulse"><i className="fa fa-chart-line"></i>Crypto/Forex</a></li>
          <li><a href="/insiderstrategy"><i className="fa fa-cogs"></i>Insider Strategy</a></li>
          <li><a href="/technical"><i className="fa fa-video"></i>Technical Analysis</a></li>
          <li><a href="/calcu"><i className="fa fa-calendar-check"></i>Calculator</a></li>
        </ul>
      </div>

      <div className="content">
        <div className="ticker-container">
          <TickerTape />
        </div>
        <div className="rectangle-container">
          <h2>Trade Journal</h2>
          <button className="add-trade-button" onClick={openModal}>Add Trade</button>
          <div className="calendar-grid">
            {months.map((month, monthIndex) => (
              <div className="month" key={monthIndex}>
                <h3>{month.name}</h3>
                <div className="month-days">
                  {month.days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`month-day ${day === null ? "empty" : ""} ${dayIndex % 7 === 5 || dayIndex % 7 === 6 ? "weekend" : ""}`}
                      onMouseEnter={() => handleMouseEnter(day, monthIndex)} // Pass monthIndex
                      onMouseLeave={handleMouseLeave}
                    >
                      {day || ""}
                      {hoveredDate === new Date(2025, monthIndex, day).toDateString() && (
                        <div className="popup">
                          Profit/Loss: {overallProfitLoss}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="trade-calculator-modal">
          <div className="modal-content">
            <h2>Trade Calculator</h2>
            <label>Trade Type</label>
            <select onChange={(e) => setTradeType(e.target.value)} value={tradeType}>
              <option value="">Select Trade Type</option>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
            <label>Stock Name</label>
            <input
              type="text"
              placeholder="Enter stock name"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
            />
            <label>Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <label>Buy Price</label>
            <input
              type="number"
              placeholder="Enter buy price"
              value={buyPrice}
              onChange={(e) => setBuyPrice(Number(e.target.value))}
            />
            <label>Sell Price</label>
            <input
              type="number"
              placeholder="Enter sell price"
              value={sellPrice}
              onChange={(e) => setSellPrice(Number(e.target.value))}
            />
            <div>
              <strong>Profit/Loss: </strong>
              <span>{profitLoss}</span>
            </div>
            <div className="modal-buttons">
              <button onClick={closeModal}>Close</button>
              <button onClick={saveTrade}>Save Trade</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TradeJournal;