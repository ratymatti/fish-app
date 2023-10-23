import React, { useState, useEffect } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';
import { sortFishes } from './modules/sortFishes/sortFishes';
import fetchWeather from './modules/fetchWeather/fetchWeather';
import getLocation from './modules/getLocation/getLocation';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [active, setActive] = useState('');
  const [fishes, setFishes] = useState([]);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [currentUserLocation, setCurrentUserLocation] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fishesRef = collection(db, "fishes");

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
  }, [currentUserLocation]);

  async function getWeather() {
    const currentWeather = await fetchWeather(currentUserLocation);
    setWeather(currentWeather);
  }
  
  useEffect(() => {
    getWeather();
    const updateInterval = 3600000;
    let intervalID = setInterval(() => {
      getWeather();
    }, updateInterval);
    return(() => {
      clearInterval(intervalID);
    })
  },[currentUserLocation]);
 
  async function getDocuments() {
    try {
      const data = await getDocs(fishesRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setFishes(sortFishes('date', filteredData, 'desc'));
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDocuments(); 
  },[]); 

  return (
    <div className="App">
      <Header
        setActive={setActive}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn} />
      <MainContainer
        fishes={fishes}
        active={active}
        sortByField={sortByField}
        location={location}
        changeLocation={changeLocation}
        getCurrentLocation={getLocation}
        weather={weather}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        getDocuments={getDocuments} />
      <Footer />
    </div>
  );
};

export default App;
