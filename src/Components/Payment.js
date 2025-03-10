import React, { useState } from "react";
import axios from "axios";
import { auth } from "./firebase"; // Adjust the path to your firebaseConfig file
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth"; // Corrected import
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PaymentPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "", // New password field
  });

  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    { id: 1, duration: "1 Month", price: 1000, description: "Access for 1 month", image:    "https://via.placeholder.com/150" },
    { id: 2, duration: "6 Months", price: 5000, description: "Access for 6 months", image:  "https://via.placeholder.com/150" },
    { id: 3, duration: "12 Months", price: 9000, description: "Access for 12 months", image:"https://via.placeholder.com/150" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkEmailExists = async (email) => {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0; // Returns true if the email exists
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!selectedPackage) {
      alert("Please select a package.");
      return;
    }

    // Check if the email already exists
    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      alert("⚠️ User already exists. Please log in.");
      return; // Stop the payment process
    }

    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount: selectedPackage.price * 100, // Convert to paise
        currency: "INR",
      });

      const razorpay = new window.Razorpay({
        key: "rzp_test_VKA2Qlq2blUnB4",
        amount: data.amount,
        currency: data.currency,
        name: formData.name,
        description: selectedPackage.description,
        order_id: data.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#4CAF50" },
        handler: async (response) => {
          const verifyRes = await axios.post("http://localhost:5000/verify-payment", response);
          if (verifyRes.data.success) {
            // Save user to Firebase Authentication
            try {
              await createUserWithEmailAndPassword(auth, formData.email, formData.password);
              alert("🎉 Payment Successful! You are now registered.");
              navigate("/login"); // Redirect to login page
            } catch (error) {
              console.error("Firebase Error:", error);
              alert("⚠️ Registration failed. Please try again.");
            }
          } else {
            alert("⚠️ Payment verification failed.");
          }
        },
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("⚠️ Payment Failed!");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {!selectedPackage ? (
        <div>
          <h1 style={styles.header}>Choose Your Package</h1>
          <div style={styles.packageContainer}>
            {packages.map((pkg) => (
              <div key={pkg.id} style={styles.card}>
                <img src={pkg.image} alt={pkg.duration} style={styles.image} />
                <h3 style={styles.packageTitle}>{pkg.duration}</h3>
                <p style={styles.description}>{pkg.description}</p>
                <p style={styles.price}>Price: ₹{pkg.price}</p>
                <button onClick={() => setSelectedPackage(pkg)} style={styles.button}>
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={styles.paymentBox}>
          <h2 style={styles.title}>Complete Your Payment for {selectedPackage.duration}</h2>
          <form onSubmit={handlePayment} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
          <button onClick={() => setSelectedPackage(null)} style={styles.goBackButton}>
            Go Back
          </button>
          <p style={styles.note}>Secure payments powered by Razorpay</p>
        </div>
      )}
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  packageContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "800px",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s",
    margin: "10px",
    flex: "1 1 30%", // Responsive flex
    maxWidth: "300px", // Max width for cards
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  packageTitle: {
    fontSize: "20px",
    color: "#333",
  },
  description: {
    color: "#666",
    margin: "10px 0",
  },
  price: {
    fontSize: "18px",
    color: "#4CAF50",
    margin: "10px 0",
  },
  paymentBox: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "22px",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color : "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonDisabled: {
    padding: "10px 20px",
    backgroundColor: "#9e9e9e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
    marginTop: "10px",
  },
  goBackButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  note: {
    marginTop: "15px",
    fontSize: "12px",
    color: "#777",
  },
};

// Exporting the component
export default PaymentPage;