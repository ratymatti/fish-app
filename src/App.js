import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  const [fishes, setFishes] = useState([{species: 'steelhead', cm: 80, river: 'Skeena', date: '12.03.2022', id: 1}]);

  function addFish(fish) {
    console.log('adding fish:', fish);
    setFishes([...fishes, fish]);
  }

  return (
    <div className="App">
      <Header />
      <MainContainer
        addFish={addFish}
        fishes={fishes} />
    </div>
  );
}



export default App;
