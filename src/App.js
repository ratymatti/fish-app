import React, { useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  const [active, setActive] = useState('Add');

  const [fishes, setFishes] = useState([
    //  {species: 'steelhead', cm: 80, river: 'Skeena', date: '12.03.2022', id: 1},
    //  {species: 'salmon', cm: 120, river: 'Lakselva', date: '12.08.2023', id: 2}
  ]);

  function addFish(fish) {
    setFishes([...fishes, fish]);
  }

  function sortByField(field) {
    const sortedFishes = [...fishes].sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      
      return 0;
    });
  
    if (field === 'cm' || field === 'date') {
      setFishes(sortedFishes.reverse());  
    } else {
      setFishes(sortedFishes);
    }
  }
  

  return (
    <div className="App">
      <div className='header'>
        <ul>
            <li><button onClick={() => setActive('Add')}>Add</button></li>
            <li><button onClick={() => setActive('Log')}>Log</button></li>
            <li><button onClick={() => setActive('Weather')}>Weather</button></li>
        </ul>
        <h1>Fish App</h1>
      </div>
      <div>
        <MainContainer
          addFish={addFish}
          fishes={fishes}
          active={active}
          sortByField={sortByField} />
      </div>
    </div>
  );
}



export default App;
