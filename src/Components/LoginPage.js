import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(to right, #1f3c72, #1f5d8c, #1f4e79)",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      animation: "fadeIn 1.5s ease-out",
      padding: "20px",
      textAlign: "center",
    },
    title: {
      fontSize: "2.8rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      color: "#f39c12",
      animation: "slideIn 1s ease-out",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: "400px",
      background: "#2c3e50",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      animation: "formFadeIn 1s ease-out",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
      transition: "border 0.3s ease, box-shadow 0.3s ease",
    },
    inputFocus: {
      border: "2px solid #f39c12",
      boxShadow: "0 0 8px #f39c12",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#27ae60",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "1.1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      margin: "15px 0",
    },
    buttonHover: {
      backgroundColor: "#2ecc71",
      transform: "scale(1.05)",
    },
    error: {
      color: "#e74c3c",
      fontSize: "0.9rem",
      marginBottom: "10px",
    },

    // Animations
    "@keyframes fadeIn": {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
    "@keyframes slideIn": {
      "0%": { transform: "translateY(-20px)", opacity: 0 },
      "100%": { transform: "translateY(0)", opacity: 1 },
    },
    "@keyframes formFadeIn": {
      "0%": { transform: "translateY(-30px)", opacity: 0 },
      "100%": { transform: "translateY(0)", opacity: 1 },
    },

    // Responsive Design
    "@media (max-width: 600px)": {
      container: {
        padding: "15px",
      },
      title: {
        fontSize: "2.2rem",
      },
      form: {
        width: "90%",
        padding: "20px",
      },
      button: {
        fontSize: "1rem",
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Stock Market Portal</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...styles.input, ...(email ? styles.inputFocus : {}) }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...styles.input, ...(password ? styles.inputFocus : {}) }}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
