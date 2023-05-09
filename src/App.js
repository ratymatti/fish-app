import React, { useState, useEffect } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';
import { sortFishes } from './modules/sortFishes/sortFishes';
import fetchWeather from './modules/fetchWeather/fetchWeather';

function App() {
  const [active, setActive] = useState('');
  const [fishes, setFishes] = useState([]);
  const [location, setLocation] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [weather, setWeather] = useState(null);

  function addFish(fish) {
    setFishes([...fishes, fish]);
  }

  function changeLocation(location) {
    setLocation(location);
  }

  function sortByField(field) {
    const sortedFishes = sortFishes(field, fishes);
    setFishes(sortedFishes);
  }  

  async function getLocation() {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude: lat, longitude: lng } = position.coords;

        setLocation({ lat, lng })
        setDisabled(false);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      alert('Geolocation not supported in your browser');
    }
  }

  async function getWeather() {
    const currentWeather = await fetchWeather(location);
    setWeather(currentWeather);
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getWeather();
    console.log('i effected')
  }, [location]);

  return (
    <div className="App">
      <div className='header'>
        <ul>
          <li><button disabled={disabled} onClick={() => setActive('AddContainer')}>Add Fish</button></li>
          <li><button onClick={() => setActive('Log')}>Log</button></li>
          <li><button disabled={disabled} onClick={() => setActive('MapContainer')}>Map</button></li>
          <li><button onClick={() => setActive('Weather')}>Weather</button></li>
        </ul>
        <h1>Fish App</h1>
      </div>
      <div>
        <MainContainer
          addFish={addFish}
          fishes={fishes}
          active={active}
          sortByField={sortByField}
          location={location}
          changeLocation={changeLocation}
          getCurrentLocation={getLocation}
          disabled={disabled}
          weather={weather} />
      </div>
    </div>
  );
};

export default App;
