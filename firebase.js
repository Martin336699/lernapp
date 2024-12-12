// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/database';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQBJjPhJH73kJ5enFkozzu875LM0SH_BE",
  authDomain: "lernapp-53ba3.firebaseapp.com",
  databaseURL: "https://lernapp-53ba3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lernapp-53ba3",
  storageBucket: "lernapp-53ba3.firebasestorage.app",
  messagingSenderId: "109507802335",
  appId: "1:109507802335:web:2fc22c960de9a724b5256a",
  measurementId: "G-MYS4MLPBX3"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const analytics = getAnalytics(app);




