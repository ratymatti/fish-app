import React from 'react';
import './Header.css';
import Auth from '../Auth/Auth';

export default function Header(props) {
  const {
    setActive,
    isLoggedIn,
    setIsLoggedIn
  } = props;

  return (
    <div className='header'>
      <h1>Only <span className='fish-logo'>Fishes</span></h1>
      {isLoggedIn && 
        <div className='header-buttons'>
          <ul>
            <li><button onClick={() => setActive('AddContainer')}>Add Fish</button></li>
            <li><button onClick={() => setActive('Log')}>Log</button></li>
            <li><button onClick={() => setActive('MapContainer')}>Map</button></li>
            <li><button onClick={() => setActive('Weather')}>Weather</button></li>
            <li>{isLoggedIn && <Auth
                                  isLoggedIn={isLoggedIn}
                                  setIsLoggedIn={setIsLoggedIn}
                                  setActive={setActive} />}</li>
          </ul>
        </div>  
      }
    </div>  
  )
};

