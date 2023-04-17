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
    //const [markers, setMarkers] = useState([]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    function handleClick(event) {
        if (props.active === 'AddContainer') {
            props.setFishGeolocation([{
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            }]); 
        }   
    }

    const markers = props.markerLocations;

    return (
        <GoogleMap
            zoom={props.zoom}
            center={props.center}
            mapContainerClassName='map-container'
            onClick={(event) => {
                handleClick(event);
            }}
            options={options}
        >
           {markers.map(marker => <Marker  key={marker.time.valueOf()}
                                            position={{ lat: marker.lat, lng: marker.lng }} />)}    
        </GoogleMap>
    );
}
