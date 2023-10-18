import React from 'react';
import AddContainer from '../AddContainer/AddContainer';
import Log from '../Log/Log';
import MapContainer from '../MapContainer/MapContainer';
import Weather from '../Weather/Weather';
import './MainContainer.css';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import Auth from '../Auth/Auth';


export default function MainContainer(props) {
  const {
    active,
    changeLocation,
    disabled,
    fishes,
    getCurrentLocation,
    location,
    sortByField,
    weather,
    weatherTracking,
    setWeatherTracking,
    isLoggedIn,
    setIsLoggedIn,
    getDocuments
    } = props;

  return (
    <div className='main-container'>
      {active === 'AddContainer' && <AddContainer
                                      location={location}
                                      active={active}
                                      changeLocation={changeLocation}
                                      getCurrentLocation={getCurrentLocation}
                                      getDocuments={getDocuments} />
                                      }
      {active === 'Log' &&  <Log
                              fishes={fishes}
                              sortByField={sortByField} />
                              }
      {active === 'Weather' && <Weather
                                  weather={weather}
                                  location={location}
                                  active={active}
                                  weatherTracking={weatherTracking}
                                  setWeatherTracking={setWeatherTracking} />
                                  }
      {active === 'MapContainer' && <MapContainer
                                      center={location}
                                      active={active}
                                      fishes={fishes} />
                                      }
      {disabled && <SpinningIcon />}
      {!isLoggedIn && <Auth
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn} />}                                                                       
    </div>
  )
}

