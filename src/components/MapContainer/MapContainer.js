import React from 'react';
import Map from '../Map/Map';
import { FishContext } from '../../contexts/FishContext';
import { LocationContext } from '../../contexts/LocationContext';


export default function MapContainer(props) {
    const { active } = props;

    const { fishes } = React.useContext(FishContext);
    const { userLocation } = React.useContext(LocationContext);

    return (
        <div className='map-container'>
            <Map
                center={userLocation}
                zoom={10}
                active={active}
                markerLocations={fishes} />
        </div>
    )
}

