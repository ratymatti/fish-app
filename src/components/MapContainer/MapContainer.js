import React from 'react';
import Map from '../Map/Map';
import { FishContext } from '../../contexts/FishContext';


export default function MapContainer(props) {
  const { active, center } = props;

    const { fishes } = React.useContext(FishContext);
  
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

