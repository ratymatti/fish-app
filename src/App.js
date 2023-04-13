import React, { useState, useEffect } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  const [active, setActive] = useState('');

  const [fishes, setFishes] = useState([
    //  {species: 'steelhead', cm: 80, river: 'Skeena', date: '12.03.2022', id: 1},
    //  {species: 'salmon', cm: 120, river: 'Lakselva', date: '12.08.2023', id: 2}
  ]);

  const [location, setLocation] = useState({});

  function addFish(fish) {
    setFishes([...fishes, fish]);
  }

  function sortByField(field) {
    
      switch(field) {
        case 'species':
          const sortedBySpecies = [...fishes].sort((fishA, fishB) => {
            const speciesComparison = fishB.species.localeCompare(fishA.species);
            if (speciesComparison === 0) {
              // If species are equal, compare by size
              return fishA.cm - fishB.cm;  
            } else {
              // Otherwise, compare by species
              return speciesComparison;
            }
          });
          return setFishes([...sortedBySpecies]);
        case 'cm':
          return setFishes([...fishes.sort((fishA, fishB) => {
            return fishA.cm - fishB.cm;
          })])  
        case 'river':
          const sortedByRiver = [...fishes].sort((fishA, fishB) => {
            const riverComparison = fishB.river.localeCompare(fishA.river);
            if (riverComparison === 0) {
              // If river is same, compare by size
              return fishA.cm - fishB.cm;
            } else {
              // Otherwise, compare by river
              return riverComparison;
            }
          });
          return setFishes([...sortedByRiver]);
        case 'date':
          const sortedFishes = [...fishes].sort((fishA, fishB) => {
            const dateComparison = fishA.date.getTime() - fishB.date.getTime();
            if (dateComparison === 0) {
              // If the dates are equal, compare by size
              return fishA.size - fishB.size;
            } else {
              // Otherwise, compare by date
              return dateComparison;
            }
          });
          return setFishes(sortedFishes); 
        default:
          return setFishes([...fishes]);
      }
  }

  function getLocation() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        if (lat && lng) {
          setLocation({ lat: lat, lng: lng });
        }
        
      }, (err) => {
            console.log(err);
            alert(err);
      })

    } else {
      alert('geolocation not supported in your browser');
    }
  }

  useEffect(() => {
    getLocation();
  }, [])
  

  return (
    <div className="App">
      <div className='header'>
        <ul>
            <li><button onClick={() => setActive('AddContainer')}>Add Fish</button></li>
            <li><button onClick={() => setActive('Log')}>Log</button></li>
            <li><button onClick={() => setActive('MapContainer')}>Map</button></li>
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
          location={location} />
      </div>
    </div>
  );
}



export default App;
