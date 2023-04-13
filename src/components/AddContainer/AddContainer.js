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
                <button onClick={() => setActive('add')}>Select location</button>
            </div>
        )
    } else {
        return (
            <div className='add'>
                <Add
                addFish={props.addFish} />
            </div>
        )
    }
}

