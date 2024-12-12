import { useState, useEffect } from 'react';
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { database } from '../firebase'; // Ensure correct path to firebase.js
 import { ref, onValue } from 'firebase/database';
import '../css/app.css';
import RenderKarteikarte from './RenderKarteikarte';
import InputKarteiKarte from './InputKarteikarte';
import RenderKarteikarteCategory from './RenderKarteikarteCategory';
import Navigation from './Navigation';

function App() {
  const [fragenListe, setFragenListe] = useState({
    fragen: [],
    antworten: []});
    const [category, setCategory] = useState("");
    const [catKeys, setCatKeys] = useState([]);
    const [select, setSelect] = useState("");

    useEffect(() => {
      const fetchDaten = async () => {
        const karteikartenRef = ref(database, 'karteikarten');
  
        onValue(karteikartenRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const keys = Object.keys(data);
            setCatKeys(keys);
            setFragenListe(data);
            setSelect(keys[0]); // Set default select to the first category
          }
        });
  
        return () => karteikartenRef.off();
      };
  
      fetchDaten();
    }, [setFragenListe]);

    const handleSelectChange = (e) => {
      const newValue = e.target.value;
      setSelect(newValue);
      console.log(newValue);
    };
 
  return (
    <>
<BrowserRouter>
<div >
  <Navigation />
  <Routes>
  <Route exact path="/renderCat" element={ 
    <RenderKarteikarteCategory fragenListe={fragenListe} select={select} handleSelectChange={handleSelectChange} catKeys={catKeys}  /> } />
  <Route exact path="/renderAll" element={ 
    <RenderKarteikarte fragenListe={fragenListe} /> } />
  <Route exact path="/" element={ 
    <InputKarteiKarte setFragenListe={setFragenListe} select={select} setSelect={setSelect} category={category} setCategory={setCategory} catKeys={catKeys} setCatKeys={setCatKeys} handleSelectChange={handleSelectChange} /> } />
  </Routes>
</div>
</BrowserRouter>
    </>
  )
}

export default App;
