import React, { useState, useEffect } from 'react'; // Importing necessary hooks from React
import { database } from '../firebase'; // Importing the Firebase database configuration
import { ref, get } from 'firebase/database'; // Importing methods to reference and get data from Firebase database
import '../css/renderKarteikarte.css'; // Importing CSS for styling



function RenderKarteikarteCategory() {
  // State to keep track of the current index of the values within the current question
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  // State to manage the animation class for transitions
  const [animationClass, setAnimationClass] = useState('');
  // State to store the list of questions fetched from the database
  const [fragenListe, setFragenListe] = useState({});
  const [options, setOptions] = useState([]); // State for the options fetched from the database
  const [select, setSelect] = useState(""); // State for the selected option



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

        // Setting the options state with the keys of the data object
        const newOptions = Object.keys(data); // Extracting keys from the data object
        setOptions(newOptions); // Setting the options state
        setSelect(newOptions[0]); // Setting the initial selected state to the first option

        // Formatting the data into an array of objects with id and values
        const formattedData = Object.keys(data).reduce((acc, key) => {
          acc[key] = Object.entries(data[key] || {}).map(([id, values]) => ({
            id,
            ...values
          }));
          return acc;
        }, {});
        console.log(formattedData); // Logging the formatted data
        setFragenListe(formattedData); // Setting the formatted data to the state
      }
    };

    fetchData(); // Calling the fetchData function
  }, [setFragenListe]); // Dependency array to ensure fetchData is called only once



  // Function to handle the 'Weiter' (Next) button click
  const handleWeiter = () => {
    setAnimationClass('animateSlide'); // Setting the animation class for slide transition
    setTimeout(() => {
      const currentFragen = fragenListe[select]; // Getting the current questions based on the selected key

      // Checking if there are more values within the current question
      if (currentValueIndex + 1 < currentFragen.length) {
        setCurrentValueIndex((prevIndex) => prevIndex + 1); // Incrementing the current value index
      } else {
        // Logic for when there are no more values within the current question
        setCurrentValueIndex(0); // Resetting the current value index
      }
      setAnimationClass(''); // Resetting the animation class
    }, 1150); // Delay for the animation
  };



  // Function to handle the 'Zurück' (Back) button click
  const handleZurück = () => {
    setAnimationClass('animateSlide'); // Setting the animation class for slide transition
    setTimeout(() => {
      const currentFragen = fragenListe[select]; // Getting the current questions based on the selected key

      // Checking if there are previous values within the current question
      if (currentValueIndex > 0) {
        setCurrentValueIndex((prevIndex) => prevIndex - 1); // Decrementing the current value index
      } else {
        // Logic for when there are no previous values within the current question
        setCurrentValueIndex(currentFragen.length - 1); // Setting the current value index to the last value of the current questions
      }
      setAnimationClass(''); // Resetting the animation class
    }, 1150); // Delay for the animation
  };



  // Handler for select change
  const handleSelectChange = (e) => {
    const newValue = e.target.value; // Getting the new selected value
    setSelect(newValue); // Updating the selected state
    setCurrentValueIndex(0); // Resetting the current value index
    console.log(newValue); // Logging the new selected value
  };


  
  // Function to render the current questions
  const renderCurrentFragen = () => {
    if (!fragenListe[select]) return null; // Return null if the selected questions list is empty

    const currentFragen = fragenListe[select]; // Getting the current questions based on the selected key

    if (!currentFragen) return null; // Return null if the current questions are undefined

    const currentItem = currentFragen[currentValueIndex]; // Getting the current item based on the current value index

    return (
      <div key={select}>
        <h2>{select}</h2>
        <div key={currentItem.id}>
          <h2>Frage:</h2><br />
          <p>{currentItem.frage}</p><br />
          <h2>Antwort:</h2><br />
          <p>{currentItem.antwort}</p><br />
        </div>
      </div>
    );
  };

  return (
    <div className={`outputContainer ${animationClass}`}>
      <button id='left' onClick={handleZurück}>&lt;</button>
      <button id='right' onClick={handleWeiter}>&gt;</button>
      <h1>Karteikarte</h1>
      <div className="subContainer selectInput">
        <select id='select2' value={select} onChange={handleSelectChange}>
          {options.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        {renderCurrentFragen()} {/* Rendering the current questions */}
      </div>
    </div>
  )
}

export default RenderKarteikarteCategory;