import React from 'react';
import AddContainer from '../AddContainer/AddContainer';
import Log from '../Log/Log';
import MapContainer from '../MapContainer/MapContainer';
import Weather from '../Weather/Weather';
import './MainContainer.css';
import SpinningIcon from '../SpinningIcon/SpinningIcon';


export default function MainContainer(props) {
  const {
    active,
    addFish,
    changeLocation,
    disabled,
    fishes,
    getCurrentLocation,
    location,
    sortByField,
    weather
    } = props;

  return (
    <div className='main-container'>
      {active === 'AddContainer' && <AddContainer
                                            addFish={addFish}
                                            location={location}
                                            active={active}
                                            changeLocation={changeLocation}
                                            getCurrentLocation={getCurrentLocation} />
                                            }
      {active === 'Log' &&  <Log
                                    fishes={fishes}
                                    sortByField={sortByField} />
                                    }
      {active === 'Weather' && <Weather
                                  weather={weather} />}
      {active === 'MapContainer' && <MapContainer
                                            center={location}
                                            active={active}
                                            fishes={fishes} />
                                            }
      {disabled && <SpinningIcon />}                                                                       
    </div>
  )
}

