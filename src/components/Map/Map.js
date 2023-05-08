import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './Map.css';
import { mapStyles } from '../../modules/mapStyles/mapStyles';
import SpinningIcon from '../SpinningIcon/SpinningIcon';

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    mapTypeControl: true,
    zoomControl: true,
};

export default function Map(props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });
    
    const [markers, setMarkers] = useState([]);

    const { 
        active,
        center,
        markerLocations,
        zoom,
        setFishGeolocation,
        setDisabled
    } = props;
    
    useEffect(() => {
        setMarkers(markerLocations);
    }, [markerLocations]);

    function handleClick(event) {
        if (active === 'AddContainer') {
            setFishGeolocation([
                {
                    location: {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                    },
                id: new Date()
                }
            ]);
            setDisabled(false); 
        };   
    };

    if (!isLoaded) {
        return <SpinningIcon />;
    }

    return (
        <GoogleMap
            zoom={zoom}
            center={center}
            mapContainerClassName='map-container'
            onClick={(event) => {
                handleClick(event);
            }}
            options={options}
        >
           {isLoaded && markers.map(marker => <MarkerF  key={marker.id.valueOf()}
                                            position={{ lat: marker.location.lat, lng: marker.location.lng }} />)}    
        </GoogleMap>
    )
};
