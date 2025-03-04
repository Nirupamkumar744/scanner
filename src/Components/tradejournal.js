import React, { useState, useCallback, useEffect } from "react";
import TickerTape from "../Widgets/TickerTape"; // Import the TickerTape component
import { db } from "./firebase"; // Assuming your firebase is set up in the firebase.js file
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'; // Import date-fns for date handling
import NavBar from "./NavBar/NavBar";

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

  .content {
    background-color: #252525;
    color: black;
    min-height: 100vh;
    position: relative;
  }

  .ticker-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    z-index: 1;
    margin-bottom: 20px;
  }

  .rectangle-container {
    margin: 20px auto;
    width: 100%; /* Adjusted width for better fit */
    background: white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    position: relative;
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

  .trade-summary-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .trade-summary {
    width: 45%; /* Reduced width for better fit */
    background: #333;
    border-radius: 10px;
    padding: 10px;
    color: white;
    border: 2px solid white; /* Add white border */
    margin: 0 10px; /* Add margin to the sides */
  }

  .trade-summary h2 {
    background: green; /* Green for Winner Trade */
    color: black; /* Black font color for Winner Trade */
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    margin: -10px -10px 10px -10px; /* Adjust margin to create a banner effect */
  }

  .trade-summary.loser h2 {
    background: red; /* Red for Loser Trade */
    color: black; /* White font color for Loser Trade */
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    margin: -10px -10px 10px -10px; /* Adjust margin to create a banner effect */
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .rectangle-container {
      width: 95%; /* Adjust width for smaller screens */
    }

    .calendar-grid {
      grid-template-columns: 1fr; /* Only one month per row */
    }

    .trade-summary-container {
      flex-direction: column; /* Stack winner and loser summaries */
      align-items: center; /* Center align */
    }

    .trade-summary {
      width: 90%; /* Full width for trade summaries */
      margin-bottom: 20px; /* Space between summaries */
    }
  }

  @media (min-width: 769px) {
    .rectangle-container {
      width: 80%; /* Increase width for larger screens */
    }
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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // State for selected year
  const [mostProfitableTrade, setMostProfitableTrade] = useState(null);
  const [biggestLosingTrade, setBiggestLosingTrade] = useState(null);
  const [reasonForTrade, setReasonForTrade] = useState(""); // New state for reason
  const [isNavOpen, setIsNavOpen] = useState(false); // State to handle nav visibility
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
        reasonForTrade, // Save the reason for trade
        timestamp: new Date(),
      });
      alert("Trade saved successfully!");
      closeModal();
      fetchTrades(); // Fetch trades after saving
    } catch (error) {
      console.error("Error saving trade: ", error.message);
      alert(`Error saving trade: ${error.message}`);
    }
  };

  const fetchTrades = useCallback(async () => {
    try {
      const user = getAuth().currentUser ;
      if (!user) return;

      const userId = user.uid; // Use UID instead of email
      const tradesRef = collection(db, "users", userId, "Trade");
      const querySnapshot = await getDocs(tradesRef);
      let trades = [];

      querySnapshot.forEach((doc) => {
        const trade = doc.data();
        const tradeDate = trade.timestamp.toDate();
        if (tradeDate.getFullYear() === selectedYear) {
          trades.push(trade);
        }
      });

      // Calculate most profitable trade
      const profitableTrade = trades.reduce((prev, current) => {
        return (prev.profitLoss > current.profitLoss) ? prev : current;
      }, { profitLoss: -Infinity });

      // Calculate biggest losing trade
      const losingTrade = trades.reduce((prev, current) => {
        return (prev.profitLoss < current.profitLoss) ? prev : current;
      }, { profitLoss: Infinity });

      setMostProfitableTrade(profitableTrade.profitLoss > 0 ? profitableTrade : null);
      setBiggestLosingTrade(losingTrade.profitLoss < 0 ? losingTrade : null);
    } catch (error) {
      console.error("Error fetching trades: ", error.message);
    }
  }, [selectedYear]); // Add selectedYear as a dependency

  useEffect(() => {
    if (buyPrice && sellPrice && quantity) {
      calculateProfitLoss();
    }
  }, [buyPrice, sellPrice, quantity, calculateProfitLoss]);

  useEffect(() => {
    fetchTrades(); // Fetch trades when the selected year changes
  }, [selectedYear, fetchTrades]); // Include fetchTrades in the dependency array

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

  const handleMouseEnter = (day ) => {
    if (day) {
      const date = day.toDateString(); 
      setHoveredDate(date);
      fetchOverallProfitLoss(date);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
    setOverallProfitLoss(0);
  };

  const getMonthDays = (month, year) => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(start);
    return eachDayOfInterval({ start, end });
  };

  const months = Array.from({ length: 12 }, (_, index) => {
    return {
      name: format(new Date(selectedYear, index), 'MMMM'),
      days: getMonthDays(index, selectedYear),
    };
  });

  return (
    <>
      <style>{styles}</style>
      <NavBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

      <div className={`content ${isNavOpen ? 'blur' : ''}`}>
        <div className="ticker-container">
          <TickerTape />
        </div>
        <div className="rectangle-container">
          <h2>Trade Journal</h2>
          <button className="add-trade-button" onClick={openModal}>Add Trade</button>
          <div>
            <label>Select Year:</label>
            <select onChange={(e) => setSelectedYear(Number(e.target.value))} value={selectedYear}>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="calendar-grid">
            {months.map((month, monthIndex) => (
              <div className="month" key={monthIndex}>
                <h3>{month.name}</h3>
                <div className="month-days">
                  {month.days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`month-day ${day === null ? "empty" : ""} ${day.getDay() === 0 || day.getDay() === 6 ? "weekend" : ""}`}
                      onMouseEnter={() => handleMouseEnter(day)} // Pass day
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleMouseEnter(day)} // Click to view trades
                    >
                      {day.getDate()}
                      {hoveredDate === day.toDateString() && (
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
        <div className="trade-summary-container">
          <div className="trade-summary">
            <h2>Winner Trade</h2>
            {mostProfitableTrade ? (
              <div>
                <p><strong>Stock Name:</strong> {mostProfitableTrade.stockName}</p>
                <p><strong>Trade Type:</strong> {mostProfitableTrade.tradeType}</p>
                <p><strong>Quantity:</strong> {mostProfitableTrade.quantity}</p>
                <p><strong>Buy Price:</strong> {mostProfitableTrade.buyPrice}</p>
                <p><strong>Sell Price:</strong> {mostProfitableTrade.sellPrice}</p>
                <p><strong>Profit/Loss:</strong> {mostProfitableTrade.profitLoss}</p>
              </div>
            ) : (
              <p>No profitable trades found for the selected year.</p>
            )}
          </div>

          <div className="trade-summary loser"> {/* Add loser class here */}
            <h2>Loser Trade</h2>
            {biggestLosingTrade ? (
              <div>
                <p><strong>Stock Name:</strong> {biggestLosingTrade.stockName}</p>
                <p><strong>Trade Type:</strong> {biggestLosingTrade.tradeType}</p>
                <p><strong>Quantity:</strong> {biggestLosingTrade.quantity}</p>
                <p><strong>Buy Price:</strong> {biggestLosingTrade.buyPrice}</p>
                <p><strong>Sell Price:</strong> {biggestLosingTrade.sellPrice}</p>
                <p><strong>Profit/Loss:</strong> {biggestLosingTrade.profitLoss}</p>
              </div>
            ) : (
              <p>No losing trades found for the selected year.</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="trade-calculator-modal">
          <div className="modal-content">
            <h2> Trade Calculator</h2>
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
            <label>Reason for Trade</label>
            <input
              type="text"
              placeholder="Enter reason for trade"
              value={reasonForTrade}
              onChange={(e) => setReasonForTrade(e.target.value)}
            />
            <div>
              <strong>Profit/Loss : </strong>
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