import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import auth methods
import { getFirestore, doc, collection, setDoc } from "firebase/firestore"; // Import Firestore methods

const firebaseConfig = {
    apiKey: "AIzaSyCJd9-UjCjlZmytZjZ2XEpZ4QcsKHYQUDo",
    authDomain: "trade-finder-177c5.firebaseapp.com",
    projectId: "trade-finder-177c5",
    storageBucket: "trade-finder-177c5.firebasestorage.app",
    messagingSenderId: "911439971574",
    appId: "1:911439971574:web:20b3e089240e54698918d7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export Firebase methods for sign-in and Firestore operations
export { signInWithEmailAndPassword, doc, collection, setDoc };
