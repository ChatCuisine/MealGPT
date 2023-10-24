import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnhDOTxkJrlhNvqsL637daPz20mKYUDhA",
  authDomain: "mealgpt-90ec6.firebaseapp.com",
  projectId: "mealgpt-90ec6",
  storageBucket: "mealgpt-90ec6.appspot.com",
  messagingSenderId: "24406989398",
  appId: "1:24406989398:web:b234ab53ab644ba00339f7",
  measurementId: "G-TQ39Y9YRC7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default { db };
