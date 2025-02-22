import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../css/app.css';
import Login from './login.jsx';
import RenderKarteikarte from './RenderKarteikarte.jsx';
import InputKarteiKarte from './InputKarteikarte.jsx';
import RenderKarteikarteCategory from './RenderKarteikarteCategory.jsx';
import Navigation from './Navigation.jsx';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../firebase.js';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <>
      {user ? (
        <BrowserRouter>
          <div id="app">
            <Navigation />
            <Routes>
              <Route exact path="/renderCat" element={<RenderKarteikarteCategory />} />
              <Route exact path="/renderAll" element={<RenderKarteikarte />} />
              <Route exact path="/" element={<InputKarteiKarte />} />
            </Routes>
            <div>
              <p>Eingeloggt als: {user.email}</p>
              <button style={{backgroundColor: '#08beff',
                              color: 'white',
                              padding: '5px 10px',
                              borderRadius: '5px',
                              border: 'none',
                              cursor: 'pointer'
              }} onClick={logout}>Logout</button>
            </div>
          </div>
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;