import React, { useState, useEffect } from 'react'
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
    
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        setMarkers(props.markerLocations);
    }, [props.markerLocations]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    function handleClick(event) {
        if (props.active === 'AddContainer') {
            props.setFishGeolocation([{location: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                },
                id: new Date()
            }]); 
        }   
    }

    

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
           {markers.map(marker => <Marker  key={marker.id.valueOf()}
                                            position={{ lat: marker.location.lat, lng: marker.location.lng }} />)}    
        </GoogleMap>
    );
}
