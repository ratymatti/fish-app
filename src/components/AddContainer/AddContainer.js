import React, { useState } from 'react';
import Map from '../Map/Map';
import Add from '../Add/Add';
import './AddContainer.css';

export default function AddContainer(props) {
    const [active, setActive] = useState('map');

    if (active === 'map') {
        return (
            <div className='map'>
                <Map
                    center={props.location}
                    zoom={12} />
                <button className='button' onClick={() => setActive('add')}>Select location</button>
            </div>
        )
    };

    if (active === 'add') {
        return (
            <div className='add'>
                <button className='button' onClick={() => setActive('map')}>Edit location</button>
                <Add
                addFish={props.addFish} />
            </div>
        )
    };
};

