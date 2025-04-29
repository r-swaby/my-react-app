import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your real Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBQqRzbaOoz8r72_QyMH1C18SXy7MXVrSU",
  authDomain: "locallend-8138a.firebaseapp.com",
  projectId: "locallend-8138a",
  storageBucket: "locallend-8138a.appspot.com", // fix: should end in .appspot.com
  messagingSenderId: "234251472356",
  appId: "1:234251472356:web:4a839da2b5726b5dbbcbf1",
  measurementId: "G-H9XY1JZXTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app); // Optional, for tracking

export { db, auth, storage };
