import React, { useState, useEffect } from 'react'; // Importing necessary hooks from React

import { database, app } from '../firebase'; // Importing the Firebase database configuration
import { ref, get } from 'firebase/database'; // Importing methods to reference and get data from Firebase database
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import '../css/renderKarteikarte.css'; // Importing CSS for styling

import Markdown from 'react-markdown'; // Importing the Markdown component

// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Importing Swiper bundle CSS
import { Swiper, SwiperSlide } from 'swiper/react'; // Importing Swiper React components

// Import Swiper styles
import 'swiper/css'; // Importing Swiper CSS
import 'swiper/css/navigation'; // Importing Swiper navigation CSS
import 'swiper/css/pagination'; // Importing Swiper pagination CSS
import 'swiper/css/scrollbar'; // Importing Swiper scrollbar CSS

function RenderKarteikarte() {
  const [fragenListe, setFragenListe] = useState([]); // State to store the list of questions (array)
  const [uid, setUid] = useState(null);



  useEffect(() => {
    const auth = getAuth(app);
    
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        setUid(user.uid);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        
  
      } else {
        // User is signed out
      }
    });

    const fetchData = async () => {
     
      const karteikartenRef = ref(database, `users/${uid}/karteikarten`); // Reference to the 'karteikarten' node in the Firebase database
      const dataRef = await get(karteikartenRef); // Fetching data from the Firebase database

      if (dataRef.exists()) {
        const data = dataRef.val(); // Getting the data as an object
        const formattedData = Object.keys(data).reduce((acc, key) => {
          // Object.keys(data) returns an array of keys from the 'data' object.
          // reduce is used to iterate over these keys and accumulate the formatted data into 'acc'.

          acc.push(
            ...Object.entries(data[key] || {}).map(([id, values]) => ({
              // Object.entries(data[key] || {}) returns an array of [key, value] pairs from the 'data[key]' object.
              // map is used to transform each [id, values] pair into a new object with the following structure:

              id, // ID of the card (string)
              key, // Key of the card (string)
              ...values // Spread the remaining values of the card (object)
            }))
          );

          return acc; // Return the accumulated array
        }, []); // Initialize the accumulator 'acc' as an empty array
        setFragenListe(formattedData); // Setting the formatted data to the state
      }
    };

    fetchData();
  }, [uid]); // Empty dependency array means this effect runs once when the component mounts

  const renderCardContent = (index) => {
    if (fragenListe.length === 0) return "Lade..."; // If the list is empty, show loading text
    const card = fragenListe[index]; // Get the card at the current index (object)
    return (
      <>
        <div className="subContainer" key={card.id}>
        <div>
        <p className='alleFragen'>Alle Fragen</p> {/* Label for all questions */}
      </div>
          <h1 className='highlight'>{card.key}</h1><br /> {/* Display the key of the card */}
          <h2 className='highlight'>Frage:</h2><br /> {/* Display the question label */}
          <p>{card.frage}</p><br /> {/* Display the question */}
          <h2 className='highlight'>Antwort:</h2><br /> {/* Display the answer label */}
          <Markdown>{card.antwort}</Markdown><br /> {/* Display the answer */}
        </div>
      </>
    );
  };

  const handleSlideChange = (swiper) => {
    const nextIndex = (swiper.activeIndex + 1) % fragenListe.length; // Calculate the next index
    setCurrentIndex(nextIndex); // Update the current index state
  };

  return (
    <div className="flashcards-container outputContainer">
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h1>Karteikarte</h1>
      </div>

      {fragenListe.length > 0 ? (
        <Swiper
          // onSlideChangeTransitionEnd={handleSlideChange} // Event handler for slide change
          spaceBetween={50} // Space between slides
          slidesPerView={1} // Number of slides per view
          loop={true} // Enable looping
          modules={[Navigation, Pagination, Scrollbar, A11y]} // Swiper modules
          pagination={{ clickable: true }} // Enable clickable pagination
          navigation={true} // Enable navigation
          className='swiper-container'
        >
          {fragenListe.map((card, index) => (
            
            <SwiperSlide key={index}>
              <div className="card">{renderCardContent(index)}</div> {/* Render card content */}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Lade Karten...</p> // Loading text if the questions are still being fetched
      )}
    </div>
  );
}

export default RenderKarteikarte; // Exporting the component as default