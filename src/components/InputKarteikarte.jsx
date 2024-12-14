import { useState, useEffect } from 'react'; // Importing React hooks
import { database } from '../firebase'; // Importing the Firebase database configuration
import { ref, push, get, set } from 'firebase/database'; // Importing Firebase database functions
import '../css/app.min.css'; // Importing CSS for styling



function InputKarteiKarte() {
  // State variables to manage form inputs and options
  const [frage, setFrage] = useState(""); // State for the question input
  const [antwort, setAntwort] = useState(""); // State for the answer input
  const [category, setCategory] = useState(""); // State for the category input
  const [options, setOptions] = useState([]); // State for the options fetched from the database
  const [select, setSelect] = useState(""); // State for the selected option

  // console.log(); 

  // useEffect hook to fetch data from the Firebase database when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Reference to the 'karteikarten' node in the Firebase database
      const karteikartenRef = ref(database, 'karteikarten');
      // Fetching data from the referenced node
      const dataRef = await get(karteikartenRef);

      // Checking if data exists at the referenced node
      if (dataRef.exists()) {
        const data = dataRef.val(); // Getting the data value
        console.log(Object.keys(data)); // Logging the keys of the data object

        setSelect(Object.keys(data)[0]); // Setting the selected state with the first key of the data object
        
        // Setting the options state with the keys of the data object
        setOptions(() => {
          const newOptions = Object.keys(data); // Extracting keys from the data object
          console.log(newOptions); // Logging the new options
          return newOptions; // Returning the new options to set the state
        });
      }
    };




    fetchData(); // Calling the fetchData function
  }, []); // Dependency array to ensure fetchData is called only once



  // Handler for question input change
  const handleInputChange = (e) => {
    setFrage(e.target.value); // Updating the question state
  };



  // Handler for answer input change
  const handleTextChange = (e) => {
    setAntwort(e.target.value); // Updating the answer state
  };



  // Handler for category input change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Updating the category state
  };



  // Handler for adding a new category
  const handleAddBtn = (e) => {
    if (category === "") {
      alert('Bitte gib eine Kategorie ein'); // Alert if category is empty
      return;
    }
    setSelect(category); // Setting the selected category
    setCategory(""); // Resetting the category input
    setOptions((prevState) => {
      const newOptions = [...prevState, category]; // Adding the new category to options
      return newOptions; // Returning the updated options
    });
  };



  // Handler for key up event on inputs
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (frage === "" || antwort === "") {
        alert('Bitte gib eine Frage und eine Antwort ein'); // Alert if question or answer is empty
        return;
      }

      const newFrage = {
        frage, // Question
        antwort // Answer
      };

      // Reference to the selected category node in the Firebase database
      const karteikartenRef = ref(database, `karteikarten/${select}`);
      // Pushing the new question and answer to the database
      push(karteikartenRef, newFrage)
        .then(() => {
          setFrage(""); // Resetting the question input
          setAntwort(""); // Resetting the answer input
        })
        .catch((error) => {
          console.error('Fehler beim Speichern der Daten', error); // Logging error if any
        });
    }
  };



  
  // Handler for select change
  const handleSelectChange = (e) => {
    const newValue = e.target.value; // Getting the new selected value
    setSelect(newValue); // Updating the selected state
    console.log(newValue); // Logging the new selected value
  };

  return (
    <>
      <div className="inputContainer">
        <h1>Karteikarte</h1>
        <div className="subContainer1 subsub">
          <div className='parentDiv'>
            <select id='select' value={select} onChange={handleSelectChange}>
              {options.map((key) => (
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
  );
}

export default InputKarteiKarte; // Exporting the component as default