import React, { useState } from 'react';
import Map from '../Map/Map';
import Add from '../Add/Add';

export default function AddContainer(props) {
    const [active, setActive] = useState('map');

    if (active === 'map') {
        return (
            <Map
                center={props.location} />
        )
    } else {
        return (
            <Add
                addFish={props.addFish} />
        )
    }
}

