import React, { useState, useEffect } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';
import { sortFishes } from './modules/sortFishes/sortFishes';
import fetchWeather from './modules/fetchWeather/fetchWeather';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [active, setActive] = useState('');
  const [fishes, setFishes] = useState([]);
  const [location, setLocation] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [weather, setWeather] = useState(null);
  const [currentUserLocation, setCurrentUserLocation] = useState(null);

  function addFish(fish) {
    setFishes([...fishes, fish]);
  };

  function changeLocation(location) {
    setLocation(location);
  };

  function sortByField(field) {
    const sortedFishes = sortFishes(field, fishes);
    setFishes(sortedFishes);
  };  

  async function getLocation() {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude: lat, longitude: lng } = position.coords;

        if (!currentUserLocation) {
          setCurrentUserLocation({ lat, lng });
        }

        setLocation({ lat, lng });
        setDisabled(false);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      alert('Geolocation not supported in your browser');
    }
  };

  async function getWeather() {
    const currentWeather = await fetchWeather(currentUserLocation);
    setWeather(currentWeather);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getWeather();
  }, [currentUserLocation]);

  return (
    <div className="App">
      <Header
        disabled={disabled}
        setActive={setActive} />
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
      <Footer />
    </div>
  );
};

export default App;
