import { useState, useEffect } from 'react';
 import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        try {
          const response = await fetch('/api/loadData');
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            const keys = Object.keys(data);
            setCatKeys(keys.slice(2));
            setFragenListe(data);
            setSelect(keys[2]); // Set default select to the first category
          } else {
            console.error('Fehler beim Laden der Daten');
          }
        } catch (error) {
          console.error('Netzwerkfehler', error.message);
        }
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
