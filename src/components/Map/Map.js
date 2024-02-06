import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './Map.css';
import { mapStyles } from '../../modules/mapStyles/mapStyles';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import { v4 as uuidv4 } from 'uuid';

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    mapTypeControl: true,
    zoomControl: true,
};

export default function Map(props) {
    const {
        active, center,
        markerLocations, zoom,
        setFishGeolocation, setDisabled,
        setNewWeatherLocation,
    } = props;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        setMarkers(markerLocations);
    }, [markerLocations]);

    function handleClick(event) {
        const selectedLocation = {
            location: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            },
            id: uuidv4()
        };

        if (active === 'AddContainer') {
            setFishGeolocation([selectedLocation]);
            setDisabled(false);
        } else if (active === 'Weather') {
            setNewWeatherLocation([selectedLocation]);
        }
    }

    if (!isLoaded) {
        return (
            <div className='loading-map'>
                <SpinningIcon />
            </div>
        )
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
            {markers.map(marker => <MarkerF
                key={marker.id.valueOf()}
                position={
                    {
                        lat: marker.location.lat,
                        lng: marker.location.lng
                    }
                } />)}
        </GoogleMap>
    )
}
