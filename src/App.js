import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
// import Log from './components/Log/Log';
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  const [fishes, setFishes] = useState([]);

  function addFish(fish) {
    console.log('adding fish:', fish);
    setFishes([...fishes, fish]);
  }

  return (
    <div className="App">
      <Header />
      <MainContainer
        addFish={addFish} />
      {/* <Log fishes={fishes} />   */}
    </div>
  );
}



export default App;
