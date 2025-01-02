import React, { useState } from "react";
import Layout from "./Layout"; // Import the Layout component

const RiskCalculator = () => {
  const [equityToggle, setEquityToggle] = useState(false);
  const [formData, setFormData] = useState({
    capital: "",
    riskPercent: "",
    stoploss: "",
  });
  const [result, setResult] = useState({
    amountAtRisk: 0,
    totalQuantity: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateRisk = () => {
    const { capital, riskPercent, stoploss } = formData;
    if (capital && riskPercent && stoploss) {
      const amountAtRisk = (capital * riskPercent) / 100;
      const totalQuantity = Math.floor(amountAtRisk / stoploss);
      setResult({ amountAtRisk, totalQuantity });
    }
  };

  // Apply the body background color globally
  React.useEffect(() => {
    document.body.style.backgroundColor = "#121212"; // Set body background to black
    document.body.style.margin = 0; // Remove default margin
    document.body.style.fontFamily = "Arial, sans-serif"; // Set default font family
    return () => {
      document.body.style.backgroundColor = ""; // Reset body background on cleanup
    };
  }, []);

  return (
    <Layout>
      <div
        style={{
          color: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          maxWidth: "800px", // Increased width
          margin: "30px auto",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: "20px",
            color: "#4caf50",
          }}
        >
          Risk Calculator
        </h2>

        {/* Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span style={{ marginRight: "10px" }}>Equity</span>
          <div
            style={{
              position: "relative",
              width: "50px",
              height: "24px",
              backgroundColor: equityToggle ? "#4caf50" : "#ccc",
              borderRadius: "24px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={() => setEquityToggle(!equityToggle)}
          >
            <div
              style={{
                position: "absolute",
                width: "20px",
                height: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                top: "2px",
                left: equityToggle ? "28px" : "2px",
                transition: "left 0.3s",
              }}
            />
          </div>
          <span style={{ marginLeft: "10px" }}>F&O</span>
        </div>

        {/* Input Form */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Account Capital *
            </label>
            <input
              type="number"
              name="capital"
              placeholder="Enter Capital Amount"
              value={formData.capital}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                backgroundColor: "#1e1e1e",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Risk Per Trade (%) *
            </label>
            <input
              type="number"
              name="riskPercent"
              placeholder="Enter Risk per trade"
              value={formData.riskPercent}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                backgroundColor: "#1e1e1e",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Stoploss (in ₹) *
            </label>
            <input
              type="number"
              name="stoploss"
              placeholder="Enter Stoploss Amount"
              value={formData.stoploss}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                backgroundColor: "#1e1e1e",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() =>
                setFormData({ capital: "", riskPercent: "", stoploss: "" })
              }
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#f44336",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
            <button
              onClick={calculateRisk}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#4caf50",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Result */}
        <div
          style={{
            backgroundColor: "#1e1e1e",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Result:</h3>
          <p>Amount at Risk: ₹ {result.amountAtRisk}</p>
          <p>Total Quantity: {result.totalQuantity}</p>
        </div>

        {/* Info Section */}
        <div
          style={{
            backgroundColor: "#1e1e1e",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>
            Risk / Position Size Calculator
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
            Calculating risk before entering a trade is important to ensure
            traders' capital safety. To use this risk calculator, enter your
            account capital and the percentage of your account you wish to
            risk. Our calculator will suggest position sizes based on the
            information you provide.
          </p>
        </div>
      </div>

      {/* Additional Rectangular Boxes Below */}
      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "20px",
          margin: "20px auto",
          width: "800px", // Increased width
          height: "250px", // Increased height
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ color: "#fff" }}>Additional Box 1</h3>
        <p style={{ color: "#bbb" }}>This is an additional rectangular box below the risk calculator.</p>
      </div>
      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "20px",
          margin: "20px auto",
          width: "800px", // Increased width
          height: "250px", // Increased height
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ color: "#fff" }}>Additional Box 2</h3>
        <p style={{ color: "#bbb" }}>This is the second additional rectangular box.</p>
      </div>
    </Layout>
  );
};

export default RiskCalculator;
