import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.min.css';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link className='link' to="/">Input</Link>
        </li>
        <li>
          <Link className='link' to="/renderAll">Karteikarten</Link>
        </li>
        <li>
          <Link className='link' to="/renderCat">Kategorie</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;