import React from 'react';
import Map from '../Map/Map';

export default function MapContainer(props) {
  return (
    <div className='map-container'>
        <Map
            center={props.center}
            zoom={10}
            active={props.active} />
    </div>
  )
}

