import React from 'react';
import './Header.css';
import Auth from '../Auth/Auth';

export default function Header(props) {
  const {
    disabled,
    setActive,
    isLoggedIn,
    setIsLoggedIn
  } = props;

  return (
    <div className='header'>
        <ul>
          <li><button disabled={disabled} onClick={() => setActive('AddContainer')}>Add Fish</button></li>
          <li><button onClick={() => setActive('Log')}>Log</button></li>
          <li><button disabled={disabled} onClick={() => setActive('MapContainer')}>Map</button></li>
          <li><button onClick={() => setActive('Weather')}>Weather</button></li>
          <li>{isLoggedIn && <Auth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}</li>
        </ul>
        <h1>Only Fishes</h1>
      </div>  
  )
};

