import React from 'react';
import AddContainer from '../AddContainer/AddContainer';
import Log from '../Log/Log';
import MapContainer from '../MapContainer/MapContainer';
import Weather from '../Weather/Weather';
import './MainContainer.css';
import { FaSpinner } from 'react-icons/fa';
import SpinningIcon from '../SpinningIcon/SpinningIcon';


export default function MainContainer(props) {
  return (
    <div className='main-container'>
      {props.active === 'AddContainer' && <AddContainer
                                            addFish={props.addFish}
                                            location={props.location}
                                            active={props.active}
                                            changeLocation={props.changeLocation}
                                            getCurrentLocation={props.getCurrentLocation} />
                                            }
      {props.active === 'Log' &&  <Log
                                    fishes={props.fishes}
                                    sortByField={props.sortByField} />
                                    }
      {props.active === 'Weather' && <Weather />}
      {props.active === 'MapContainer' && <MapContainer
                                            center={props.location}
                                            active={props.active}
                                            fishes={props.fishes} />
                                            }
      <SpinningIcon
        disabled={props.disabled} />                                                                         
    </div>
  )
}

