import { useState, useRef, useEffect } from 'react';

import '../css/login.css';

// Import the initialized Firebase app instance
import { app, database } from '../firebase.js'; 
import { ref, push } from 'firebase/database'; // Importing Firebase database functions
import { getAuth, 
         createUserWithEmailAndPassword, 
         setPersistence, 
         signInWithEmailAndPassword, 
         browserLocalPersistence,
         onAuthStateChanged,
         signOut } from "firebase/auth";


         function Login() {
 
          // Define the state variable for the user
          const [user, setUser] = useState("");
          const [uid, setUid] = useState("");
          const emailRef = useRef();
          const passwordRef = useRef();
          
          useEffect(() => {
            const auth = getAuth(app);
            
          
            onAuthStateChanged(auth, (user) => {
              if (user) {
                console.log(user.uid);
                setUser(user.email);
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
          
              } else {
                // User is signed out
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
                setUid(user.uid);
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
                <div className='login'>
                <form>
                  <label htmlFor="email">Email</label>
                  <input className='loginInput' id="email" type="email" placeholder="Enter Email..." ref={emailRef}/>
                  <label htmlFor="password">Password</label>
                  <input className='loginInput' id="password" type="password" placeholder="Enter Password..." ref={passwordRef}/>
                  <button className='loginBtn' type="submit" onClick={signUp}>Registrierung</button>
                  <button className='loginBtn' type="submit" onClick={login}>Login</button>
                </form>
                <div className='user'>
                  {user === "" ? <p>Kein User</p> : <p>Eingeloggt als: {user}</p>}
                  <button className='loginBtn' onClick={logout}>Logout</button>
                </div>
                </div>

                
          

              </>
            );
          }
          
          // Export the App component as the default export
          export default Login;