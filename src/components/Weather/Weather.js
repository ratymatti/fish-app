import React, { useState, useEffect } from 'react';
import './Weather.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import Map from '../Map/Map';
import fetchWeather from '../../modules/fetchWeather/fetchWeather';
import {
  collection, 
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function Weather(props) {
  const [current, setCurrent] = useState('weather');
  const [newWeatherLocation, setNewWeatherLocation] = useState([]);
  const [weatherTracking, setWeatherTracking] = useState([]);

  const {
    weather,
    location,
    active,
  } = props;

  const weatherRef = collection(db, "weather");

  async function getDocuments() {
    try {
      const data = await getDocs(weatherRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setWeatherTracking(filteredData);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDocuments(); 
  },[]); 

  async function addToTracking() {
    if (newWeatherLocation.length) {
      const coords = {
         lat: newWeatherLocation[0].location.lat,
         lng: newWeatherLocation[0].location.lng
      }
      const newWeather = await fetchWeather(coords);
      
      if (newWeather) {
        await addDoc(weatherRef, newWeather);
        getDocuments();
        setNewWeatherLocation([]); 
      }
    }
      
  };   

  function handleSelection() {
    setCurrent('weather');
    addToTracking();
  };

  async function removeTracking(idToRemove) {
    const weatherDoc = doc(db, 'weather', idToRemove);
    await deleteDoc(weatherDoc);
    setWeatherTracking([...weatherTracking].filter(card => card.id !== idToRemove));
  };

  if (current === 'weather') {
    return (
      <div className='weather'>
          {!weather && <SpinningIcon />}
          {weather && <WeatherCard
                          data={weather} />}
          {weatherTracking && weatherTracking.map((card, index) => (
            <WeatherCard 
              key={index}
              data={card}
              isRemovable={true}
              removeTracking={removeTracking} />  
          ))}                                              
          <button onClick={() => setCurrent('map')}>Add new</button>                
      </div>
    )
  };

  if (current === 'map') {
    return (
      <div className='map'>
        <Map
          center={location}
          zoom={5}
          markerLocations={newWeatherLocation}
          setNewWeatherLocation={setNewWeatherLocation}
          active={active} />
        <button onClick={() => { handleSelection() }}>Set Weather Tracking</button>
      </div>
    )
  };  
};

