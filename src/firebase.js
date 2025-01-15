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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};




// Initialize Firebase
// Initialize the Firebase app with the provided configuration
const app = initializeApp(firebaseConfig); // Initialize the Firebase app instance
const database = getDatabase(app); // Get the Firebase Realtime Database instance
const analytics = getAnalytics(app); // Get the Firebase Analytics instance

// Export the initialized instances for use in other parts of the application
export { app, database, analytics };