import React, { useState } from 'react';
import Map from '../Map/Map';
import Add from '../Add/Add';
import './AddContainer.css';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import { LocationContext } from '../../contexts/LocationContext';

export default function AddContainer(props) {

    const {
        active,
        getDocuments,
        setError
    } = props;

    const { userLocation, setUserLocation } = React.useContext(LocationContext);
    
    const [current, setCurrent] = useState('map');
    const [fishGeolocation, setFishGeolocation] = useState([]);
    const [disabled, setDisabled] = useState(true);

    function handleClick() {
        if (fishGeolocation.length) {
            setUserLocation(
                {
                    lat: fishGeolocation[0].location.lat,
                    lng: fishGeolocation[0].location.lng
                }
            );
            setCurrent('map');
        } else {
            setCurrent('map');
        }   
    };


    if (current === 'map' && userLocation) {
        return (
            <div className='map'>
                <Map
                    zoom={12}
                    active={active}
                    setFishGeolocation={setFishGeolocation}
                    markerLocations={fishGeolocation}
                    setDisabled={setDisabled} />
                <button className='button' disabled={disabled}  onClick={() => setCurrent('add')}>Select location</button>
            </div>
        )
    }; 

    if (current === 'add') {
        return (
            <div className='add'>
                <button className='button' onClick={handleClick}>Edit location</button>
                <Add
                    setError={setError}
                    fishGeolocation={fishGeolocation}
                    setCurrent={setCurrent}
                    setFishGeolocation={setFishGeolocation}
                    getDocuments={getDocuments} />
            </div>
        )
    };

    if (current === 'loading') {
        return (
            <div id='loading'>
                <SpinningIcon />
            </div> 
        )
    };
};

