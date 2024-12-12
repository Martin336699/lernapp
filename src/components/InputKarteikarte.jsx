import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import '../css/app.css';

function InputKarteiKarte({ setFragenListe, select, setSelect, category, setCategory, catKeys, setCatKeys, handleSelectChange  }) {
  const [frage, setFrage] = useState("");
  const [antwort, setAntwort] = useState("");

  
  
  
  // useEffect(() => {
  //   const fetchDaten = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/load');
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);
  //         const keys = Object.keys(data);
  //         setCatKeys(keys.slice(2));
  //         setFragenListe(data);
  //       } else {
  //         console.error('Fehler beim Laden der Daten');
  //       }
  //     } catch (error) {
  //       console.error('Netzwerkfehler', error.message);
  //     }
  //   };
  //   fetchDaten();
  // }, [setFragenListe]);

  // useEffect(() => {
  //   if (catKeys.length === 0) {
  //     return;
  //   }
  //   // catKeys.forEach((key) => {
  //   //   const newElement = document.createElement('option');
  //   //   newElement.setAttribute('value', key);
  //   //   newElement.textContent = key;
  //   //   document.getElementById('select').appendChild(newElement);
  //   // });

  // }, []);
  
  
  
  // const saveDataLocally = async ({newFragenListe}) => {
  //   try {
  //     const response = await fetch('/api/saveData', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(newFragenListe)
  //     });
      
  //     if (response.ok) {
  //       console.log('Daten erfolgreich gespeichert');
  //     } else {
  //       console.error('Fehler beim Speichern der Daten');
  //     }
  //   } catch (error) {
  //     console.error('Netzwerkfehler', error.message);
  //   }
  // };
  
  const handleInputChange = (e) => {
    setFrage(e.target.value);
  };
  
  const handleTextChange = (e) => {
    setAntwort(e.target.value);
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // const handleSelectChange = (e) => {
  //   const newValue = e.target.value;
  //   setSelect(newValue);
  //   console.log(newValue);
  // };
  
  const handleAddBtn = (e) => {
    if(category === "") {
      alert('Bitte gib eine Kategorie ein');
      return;
    };
    setSelect(category);
    setCategory("");
    setCatKeys((prevState) => {
      const newCatKeys = [...prevState, category];
      return newCatKeys;
    });
    // const newElement = document.createElement('option');
    // newElement.setAttribute('value', category);
    // newElement.textContent = category;
    // document.getElementById('select').appendChild(newElement);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (frage === "" || antwort === "") {
        alert('Bitte gib eine Frage und eine Antwort ein');
        return;
      };
      // setFragenListe((prevState) => {
      //   const newFragenListe = {
      //     ...prevState,
      //     [select]: [...(prevState[select] || []), { frage, antwort }],
      //     fragen: [...prevState.fragen, frage],
      //     antworten: [...prevState.antworten, antwort]
      //   };
      //   setFrage("");
      //   setAntwort("");
      //   console.log(newFragenListe);
      //   saveDataLocally({newFragenListe});
        
      //   return newFragenListe;
      // });

      const database = firebase.database();
      const newFrage = {
        frage,
        antwort,
        category
      };

      database.ref('karteikarten').push(newFrage)
        .then(() => {
          console.log('Daten erfolgreich gespeichert');
          setFrage('');
          setAntwort('');
          setCategory('');

          setFragenListe((prevState) => {
            const newFragenListe = {
              ...prevState,
              [select]: [...(prevState[select] || []), { frage, antwort }],
              fragen: [...prevState.fragen, frage],
              antworten: [...prevState.antworten, antwort]
            };
            console.log(newFragenListe);
            return newFragenListe;
          });
        })
        .catch((error) => {
          console.error('Fehler beim Speichern der Daten', error);
        });
    }
  };


 
  return (
    <>
      <div className="inputContainer">
        <h1>Karteikarte</h1>
        <div className="subContainer subsub">
        <div className='parentDiv'>
        <select id='select' value={select} onChange={handleSelectChange}>
          {/* <option value={"Programming"}>Programming</option>
          <option value={"English"}>English</option>
          <option value={"Generally"}>Generally</option>
          <option value={select}>{select}</option> */}
                        {catKeys.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
        </select>
        <input 
          type="text"
          id='category'
          value={category}
          placeholder='Neue Kategorie...'
          onChange={handleCategoryChange}
        />
        <button id='addBtn' onClick={handleAddBtn}>Add</button>
        </div>
        <input 
          type="text" 
          id='frage' 
          placeholder='Gib deine Frage ein...' 
          value={frage}  
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          />
          
          <input 
            type="text" 
            id='antwort' 
            placeholder='Gib deine Antwort ein...'
            value={antwort}
            onChange={handleTextChange}
            onKeyUp={handleKeyUp}
            />
        </div>
      </div>
    </>
  )
}

export default InputKarteiKarte;
