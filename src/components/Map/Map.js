import React, { useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import './Map.css';
import { mapStyles } from '../../modules/mapStyles/mapStyles';

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    mapTypeControl: true,
    zoomControl: true,
}

export default function Map(props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });
    const [map, setMap] = useState(null); // Add state variable to hold map instance
    const [markers, setMarkers] = useState([]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <GoogleMap
            zoom={props.zoom}
            center={props.center}
            mapContainerClassName='map-container'
            onLoad={(map) => setMap(map)} // Set state variable when map is loaded
            onClick={(event) => {
                setMarkers(current => [...current, {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    time: new Date(),
                }])
            }}
            options={options}
        >
           {markers.map(marker => <Marker  key={marker.time}
                                            position={{ lat: marker.lat, lng: marker.lng }} />)}    
        </GoogleMap>
    );
}
