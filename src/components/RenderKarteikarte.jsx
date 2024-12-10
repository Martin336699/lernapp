import React, { useState } from 'react';
import '../css/app copy.css';

function RenderKarteikarte({fragenListe}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const handleWeiter = () => {
    setAnimationClass('animateSlide'); 
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fragenListe.fragen.length);
      setAnimationClass(''); 
    }, 1150); 
  };

  const handleZurück = () => {
    setAnimationClass('animateSlide2'); 
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + fragenListe.fragen.length) % fragenListe.fragen.length);
      setAnimationClass(''); 
    }, 1150); 
  };

  const frageRender = <span>{fragenListe.fragen[currentIndex]}</span>;
  const antwortRender = <span>{fragenListe.antworten[currentIndex]}</span>;

  return (
    <div className={`outputContainer ${animationClass}`}>
    <button id='left' onClick={handleZurück}>&lt;</button>
    <h1>Karteikarte</h1>
    <button id='right' onClick={handleWeiter}>&gt;</button>
    <div className="subContainer">
    <p className='alleFragen'>Alle Fragen</p>
      <p>Frage:{frageRender}</p>
      <p>Antwort:{antwortRender}</p>
    </div>
  </div>
  )
}

export default RenderKarteikarte;