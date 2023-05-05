import React, { useState } from 'react';
import Map from '../Map/Map';
import Add from '../Add/Add';
import './AddContainer.css';
import SpinningIcon from '../SpinningIcon/SpinningIcon';

export default function AddContainer(props) {

    const {
        active,
        addFish,
        changeLocation,
        getCurrentLocation,
        location
    } = props;
    
    const [current, setCurrent] = useState('map');
    const [fishGeolocation, setFishGeolocation] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    function handleClick() {
        if (fishGeolocation.length) {
            changeLocation({
                lat: fishGeolocation[0].location.lat,
                lng: fishGeolocation[0].location.lng
            }
            );
            setCurrent('map');
        } else {
            setCurrent('map');
        }   
    };


    if (current === 'map' && location) {
        return (
            <div className='map'>
                <Map
                    center={location}
                    zoom={12}
                    active={active}
                    setFishGeolocation={setFishGeolocation}
                    markerLocations={fishGeolocation}
                    setDisabled={setDisabled} />
                <button className='button' disabled={disabled}  onClick={() => setCurrent('add')}>Select location</button>
            </div>
        )
    } 

    if (current === 'add') {
        return (
            <div className='add'>
                <button className='button' onClick={handleClick}>Edit location</button>
                <Add
                    addFish={addFish}
                    fishGeolocation={fishGeolocation}
                    getCurrentLocation={getCurrentLocation}
                    setCurrent={setCurrent}
                    setLoading={setLoading}
                    setFishGeolocation={setFishGeolocation} />
            </div>
        )
    };

    if (current === 'loading') {
        return <SpinningIcon
                    disabled={loading} />
    }
};

