import React, { useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  const [active, setActive] = useState('Add');

  const [fishes, setFishes] = useState([
    {species: 'steelhead', cm: 80, river: 'Skeena', date: '12.03.2022', id: 1},
    {species: 'salmon', cm: 120, river: 'Lakselva', date: '12.08.2023'}]);

  function addFish(fish) {
    console.log('adding fish:', fish);
    setFishes([...fishes, fish]);
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
      <MainContainer
        addFish={addFish}
        fishes={fishes} />
    </div>
  );
}



export default App;
