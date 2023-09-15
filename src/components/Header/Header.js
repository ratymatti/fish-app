import React from 'react';
import './Header.css';

export default function Header({ disabled, setActive }) {
  return (
    <div className='header'>
        <ul>
          <li><button disabled={disabled} onClick={() => setActive('AddContainer')}>Add Fish</button></li>
          <li><button onClick={() => setActive('Log')}>Log</button></li>
          <li><button disabled={disabled} onClick={() => setActive('MapContainer')}>Map</button></li>
          <li><button onClick={() => setActive('Weather')}>Weather</button></li>
        </ul>
        <h1>Only Fishes</h1>
      </div>  
  )
};

