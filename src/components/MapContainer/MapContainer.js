import React from 'react';
import Map from '../Map/Map';

export default function MapContainer(props) {
  const { active, center, fishes } = props;
  
  return (
    <div className='map-container'>
      <Map
        center={center}
        zoom={10}
        active={active}
        markerLocations={fishes} />
    </div>
  )
};

