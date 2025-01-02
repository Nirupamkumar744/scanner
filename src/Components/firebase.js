import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
