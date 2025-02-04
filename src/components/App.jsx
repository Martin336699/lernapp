// Import necessary modules from react-router-dom for routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
// Import the CSS file for styling
import '../css/app.css';
// Import the components that will be used in the routes
import RenderKarteikarte from './RenderKarteikarte.jsx';
import InputKarteiKarte from './InputKarteikarte.jsx';
import RenderKarteikarteCategory from './RenderKarteikarteCategory.jsx';
import Navigation from './Navigation.jsx';

// Import the initialized Firebase app instance
import { app } from '../firebase.js'; 
import { getAuth, 
         createUserWithEmailAndPassword, 
         setPersistence, 
         signInWithEmailAndPassword, 
         browserLocalPersistence,
         onAuthStateChanged,
         signOut } from "firebase/auth";


// Define the main App component
function App() {
 
// Define the state variable for the user
const [user, setUser] = useState("");
const emailRef = useRef();
const passwordRef = useRef();

useEffect(() => {
  
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    setUser(user.email);
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
}, []);  

const signUp = (event) => {

  event.preventDefault();

  const auth = getAuth(app);
  createUserWithEmailAndPassword(
    auth,
    emailRef.current.value, 
    passwordRef.current.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}


const login = (event) => {

  event.preventDefault(); 

  const auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(
      auth, 
      emailRef.current.value, 
      passwordRef.current.value);
  })
  .catch((error) => {
    console.log(error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}

const logout = () => {

const auth = getAuth(app);
signOut(auth).then(() => {
  // Sign-out successful.
  setUser("");
}).catch((error) => {
  // An error happened.
});

}  

  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Enter Email..." ref={emailRef}/>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password..." ref={passwordRef}/>
        <button type="submit" onClick={signUp}>Registrierung</button>
        <button type="submit" onClick={login}>Login</button>
      </form>
      <div>
        {user === "" ? <p>Kein User</p> : <p>Eingeloggt als: {user}</p>}
        <button onClick={logout}>Logout</button>
      </div>


      {/* Set up the router for the application */}
      <BrowserRouter>
        <div id="app">
          {/* Include the Navigation component */}
          <Navigation />
          {/* Define the routes for the application */}
          <Routes>
            {/* Route for rendering categories */}
            <Route exact path="/renderCat" element={<RenderKarteikarteCategory />} />
            {/* Route for rendering all items */}
            <Route exact path="/renderAll" element={<RenderKarteikarte />} />
            {/* Default route for inputting a new item */}
            <Route exact path="/" element={<InputKarteiKarte />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

// Export the App component as the default export
export default App;