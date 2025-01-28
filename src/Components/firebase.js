import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJd9-UjCjlZmytZjZ2XEpZ4QcsKHYQUDo",
  authDomain: "trade-finder-177c5.firebaseapp.com",
  projectId: "trade-finder-177c5",
  storageBucket: "trade-finder-177c5.appspot.com",
  messagingSenderId: "911439971574",
  appId: "1:911439971574:web:20b3e089240e54698918d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Firestore Database
const db = getFirestore(app);

/**
 * Save trade data for a specific user and date.
 * @param {string} userId - The unique ID of the user.
 * @param {Object} tradeData - The trade details to save.
 * @returns {Promise<void>}
 */
const saveTrade = async (userId, tradeData) => {
  try {
    const date = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    const userTradesRef = collection(db, "users", userId, "trades", date);
    
    await addDoc(userTradesRef, {
      ...tradeData,
      timestamp: serverTimestamp(), // Add a timestamp for sorting
    });
    console.log("Trade saved successfully!");
  } catch (error) {
    console.error("Error saving trade:", error.message);
    throw error;
  }
};

export { auth, db, collection, doc, setDoc, addDoc, saveTrade };
