import React, { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import './Map.css';
import { mapStyles } from '../../modules/mapStyles/mapStyles';

export default function Map(props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });
    const [map, setMap] = useState(null); // Add state variable to hold map instance
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Create a new marker when the map is loaded and map is defined
        if (map) {
            const marker = new Marker({
                map: map,
                position: {lat: 65.96667, lng: 29.18333}
            });  
        }
    }, [map]);
    
    const options = {
        styles: mapStyles,
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <GoogleMap
            zoom={props.zoom}
            center={props.center}
            mapContainerClassName='map-container'
            onLoad={(map) => setMap(map)} // Set state variable when map is loaded
            onClick={() => setLocation({lat: 65.96667, lng: 29.18333})}
            options={options}
        >
            <Marker
                position={location} />
        </GoogleMap>
    );
}
