import React, { useState, useEffect } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';
import { sortFishes } from './modules/sortFishes/sortFishes';
import fetchWeather from './modules/fetchWeather/fetchWeather';
import getLocation from './modules/getLocation/getLocation';
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

  function sortByField(field, direction) {
    const sortedFishes = sortFishes(field, fishes, direction);
    setFishes(sortedFishes);
  };  

  useEffect(() => {
    async function getCoords() {
      const coords = await getLocation();
      setLocation(coords);
    
      if (!currentUserLocation) {
        setCurrentUserLocation(coords);
      }  
    };
    
    getCoords();
    setDisabled(false);   
  }, [currentUserLocation]);

  useEffect(() => {
    async function getWeather() {
      const currentWeather = await fetchWeather(currentUserLocation);
      setWeather(currentWeather);
    };
    
    getWeather();
  }, [currentUserLocation]);

  return (
    <div className="App">
      <Header
        disabled={disabled}
        setActive={setActive} />
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
      <Footer />
    </div>
  );
};

export default App;
