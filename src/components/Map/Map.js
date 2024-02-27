import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './Map.css';
import { mapStyles } from '../../modules/mapStyles/mapStyles';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import createCoords from '../../modules/createCoords/createCoords';

import { LocationContext } from '../../contexts/LocationContext';
import { ActiveContext, ActiveState } from '../../contexts/ActiveContext';

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    mapTypeControl: true,
    zoomControl: true,
};

export default function Map(props) {
    const {
        markerLocations,
        zoom, setFishGeolocation,
        setDisabled, setNewWeatherLocation
    } = props;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const [markers, setMarkers] = useState([]);

    const { userLocation } = React.useContext(LocationContext);
    const { active } = React.useContext(ActiveContext);

    useEffect(() => {
        setMarkers(markerLocations);
    }, [markerLocations]);

    function handleClick(event) {
        const selectedLocation = createCoords(event);

        if (active === ActiveState.AddFish) {
            setFishGeolocation([selectedLocation]);
            setDisabled(false);
        } else if (active === ActiveState.Weather) {
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
            center={userLocation}
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
