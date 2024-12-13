// Import the functions you need from the SDKs you need
// Import the necessary functions from the Firebase SDK
import { initializeApp } from 'firebase/app'; // Function to initialize the Firebase app
import { getDatabase } from 'firebase/database'; // Function to get the Firebase Realtime Database instance
import { getAnalytics } from 'firebase/analytics'; // Function to get the Firebase Analytics instance
// TODO: Add SDKs for Firebase products that you want to use
// Link to Firebase documentation for adding additional SDKs
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
// Configuration object for your Firebase app
// Contains all the necessary keys and identifiers for your Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyDQBJjPhJH73kJ5enFkozzu875LM0SH_BE", // API key for authenticating requests
  authDomain: "lernapp-53ba3.firebaseapp.com", // Domain for Firebase Authentication
  databaseURL: "https://lernapp-53ba3-default-rtdb.europe-west1.firebasedatabase.app", // URL for the Firebase Realtime Database
  projectId: "lernapp-53ba3", // Project ID for your Firebase project
  storageBucket: "lernapp-53ba3.firebasestorage.app", // Storage bucket for Firebase Storage
  messagingSenderId: "109507802335", // Sender ID for Firebase Cloud Messaging
  appId: "1:109507802335:web:2fc22c960de9a724b5256a", // App ID for the Firebase app
  measurementId: "G-MYS4MLPBX3" // Measurement ID for Firebase Analytics (optional)
};




// Initialize Firebase
// Initialize the Firebase app with the provided configuration
const app = initializeApp(firebaseConfig); // Initialize the Firebase app instance
const database = getDatabase(app); // Get the Firebase Realtime Database instance
const analytics = getAnalytics(app); // Get the Firebase Analytics instance

// Export the initialized instances for use in other parts of the application
export { app, database, analytics };