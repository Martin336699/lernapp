import React, { useState } from 'react';
import '../css/app copy.css';

function RenderKarteikarteCategory({ fragenListe, select, handleSelectChange, catKeys }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const handleWeiter = () => {
    setAnimationClass('animateSlide');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredFragen.length);
      setAnimationClass('');
    }, 1150);
  };

  const handleZurück = () => {
    setAnimationClass('animateSlide2');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredFragen.length) % filteredFragen.length);
      setAnimationClass('');
    }, 1150);
  };

  const filteredFragen = fragenListe[select] || [];
  const frageRender = <span>{filteredFragen[currentIndex]?.frage}</span>;
  const antwortRender = <span>{filteredFragen[currentIndex]?.antwort}</span>;
  console.log(select);

  return (
    <div className={`outputContainer ${animationClass}`}>
      <button id='left' onClick={handleZurück}>&lt;</button>
      <h1>Karteikarte</h1>
      <button id='right' onClick={handleWeiter}>&gt;</button>
        <div className="subContainer selectInput">
      
      <select id='select2' value={select} onChange={handleSelectChange}>
        {catKeys.map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      
        <p>Frage: {frageRender}</p>
        <p>Antwort: {antwortRender}</p>
      </div>
    </div>
  )
}

export default RenderKarteikarteCategory;