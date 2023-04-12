import React from 'react';
import Add from '../Add/Add';
import Log from '../Log/Log';
import Map from '../Map/Map';
import Weather from '../Weather/Weather';
import './MainContainer.css';


export default function MainContainer(props) {
  return (
    <div className='main-container'>
      {props.active === 'Add' && <Add addFish={props.addFish} />}
      {props.active === 'Log' && <Log fishes={props.fishes} sortByField={props.sortByField} />}
      {props.active === 'Weather' && <Weather />}
      {props.active === 'Map' && <Map location={props.location} />}
    </div>
  )
}

