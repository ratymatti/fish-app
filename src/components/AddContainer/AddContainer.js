import React, { useState } from 'react';
import Map from '../Map/Map';
import Add from '../Add/Add';
import './AddContainer.css';
import SpinningIcon from '../SpinningIcon/SpinningIcon';

export default function AddContainer(props) {
    const [active, setActive] = useState('map');
    const [fishGeolocation, setFishGeolocation] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    function handleClick() {
        if (fishGeolocation.length) {
            props.changeLocation({
                lat: fishGeolocation[0].location.lat,
                lng: fishGeolocation[0].location.lng
            }
            );
            setActive('map');
        } else {
            setActive('map');
        }   
    };


    if (active === 'map' && props.location) {
        return (
            <div className='map'>
                <Map
                    center={props.location}
                    zoom={12}
                    active={props.active}
                    setFishGeolocation={setFishGeolocation}
                    markerLocations={fishGeolocation}
                    setDisabled={setDisabled} />
                <button className='button' disabled={disabled}  onClick={() => setActive('add')}>Select location</button>
            </div>
        )
    } 

    if (active === 'add') {
        return (
            <div className='add'>
                <button className='button' onClick={handleClick}>Edit location</button>
                <Add
                    addFish={props.addFish}
                    fishGeolocation={fishGeolocation}
                    getCurrentLocation={props.getCurrentLocation}
                    setActive={setActive}
                    setLoading={setLoading} />
            </div>
        )
    };

    if (active === 'loading') {
        return <SpinningIcon
                    disabled={loading} />
    }
};

