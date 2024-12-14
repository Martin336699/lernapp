import React, { useState, useEffect } from 'react'; // Importing necessary hooks from React
import { database } from '../firebase'; // Importing the Firebase database configuration
import { ref, get } from 'firebase/database'; // Importing methods to reference and get data from Firebase database
import '../css/renderKarteikarte.min.css'; // Importing CSS for styling


function RenderKarteikarte() {
  // State to keep track of the current index of the questions list
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to keep track of the current index of the values within the current question
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  // State to manage the animation class for transitions
  const [animationClass, setAnimationClass] = useState('');
  // State to store the list of questions fetched from the database
  const [fragenListe, setFragenListe] = useState([]);




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
  }, [ setFragenListe]); // Dependency array to ensure fetchData is called only once




  // Function to handle the 'Weiter' (Next) button click
  const handleWeiter = () => {
    setAnimationClass('animateSlide'); // Setting the animation class for slide transition
    setTimeout(() => {
      const keys = Object.keys(fragenListe); // Getting the keys of the questions list
      const currentKey = keys[currentIndex]; // Getting the current key based on the current index
      const currentFragen = fragenListe[currentKey]; // Getting the current questions based on the current key

      // Checking if there are more values within the current question
      if (currentValueIndex + 1 < currentFragen.length) {
        setCurrentValueIndex((prevIndex) => prevIndex + 1); // Incrementing the current value index
      } else {
        // Logic for when there are no more values within the current question
        setCurrentValueIndex(0); // Resetting the current value index
        setCurrentIndex((prevIndex) => (prevIndex + 1) % keys.length); // Incrementing the current index and wrapping around if necessary
      }
      setAnimationClass(''); // Resetting the animation class
    }, 1150); // Delay for the animation
  };




  // Function to handle the 'Zurück' (Back) button click
  const handleZurück = () => {
    setAnimationClass('animateSlide'); // Setting the animation class for slide transition
    setTimeout(() => {
      const keys = Object.keys(fragenListe); // Getting the keys of the questions list
      const currentKey = keys[currentIndex]; // Getting the current key based on the current index
      const currentFragen = fragenListe[currentKey]; // Getting the current questions based on the current key

      // Checking if there are previous values within the current question
      if (currentValueIndex > 0) {
        setCurrentValueIndex((prevIndex) => prevIndex - 1); // Decrementing the current value index
      } else {
        // Logic for when there are no previous values within the current question
        setCurrentIndex((prevIndex) => (prevIndex - 1 + keys.length) % keys.length); // Decrementing the current index and wrapping around if necessary
        const newKey = keys[(currentIndex - 1 + keys.length) % keys.length]; // Getting the new key based on the updated index
        const newFragen = fragenListe[newKey]; // Getting the new questions based on the new key
        setCurrentValueIndex(newFragen.length - 1); // Setting the current value index to the last value of the new questions
      }
      setAnimationClass(''); // Resetting the animation class
    }, 1150); // Delay for the animation
  };




  // Function to render the current questions
  const renderCurrentFragen = () => {
    if (fragenListe.length === 0) return null; // Return null if the questions list is empty

    const keys = Object.keys(fragenListe); // Getting the keys of the questions list
    const currentKey = keys[currentIndex]; // Getting the current key based on the current index
    const currentFragen = fragenListe[currentKey]; // Getting the current questions based on the current key

    if (!currentFragen) return null; // Return null if the current questions are undefined

    const currentItem = currentFragen[currentValueIndex]; // Getting the current item based on the current value index

    return (
      <div key={currentKey}>
        <h2>{currentKey}</h2>
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
      <button id='left' onClick={handleZurück}>&lt;</button> {/* Button to go to the previous question */}
      <h1>Karteikarte</h1> {/* Heading for the flashcard */}
      <button id='right' onClick={handleWeiter}>&gt;</button> {/* Button to go to the next question */}
      <div className="subContainer">
        <p className='alleFragen'>Alle Fragen</p> {/* Paragraph for all questions */}
        {renderCurrentFragen()} {/* Rendering the current questions */}
      </div>
    </div>
  );
}

export default RenderKarteikarte; // Exporting the component as default