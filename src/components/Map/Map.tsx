import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './Map.css';
import { mapStyles } from '../../modules/mapStyles/mapStyles';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import createCoords from '../../modules/createCoords/createCoords';

import { LocationContext, LocationContextType } from '../../contexts/LocationContext';
import { ActiveContext, ActiveContextType, ActiveState } from '../../contexts/ActiveContext';
import { Location, LocationObject } from '../../types/location';


const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    mapTypeControl: true,
    zoomControl: true,
}

interface MapProps {
    markerLocations: LocationObject[];
    zoom: number;
    setFishGeolocation?: (value: LocationObject[]) => void;
    setDisabled?: (value: boolean) => void;
    setNewWeatherLocation?: (value: any) => void;
    center?: Location | null;
}

interface Marker {
    id: string;
    geolocation: Location;
}

export default function Map(props: MapProps): JSX.Element {
    const {
        markerLocations,
        zoom, setFishGeolocation,
        setDisabled, setNewWeatherLocation
    } = props;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    });

    const [markers, setMarkers] = useState<Marker[]>([]);

    const { userLocation } = React.useContext(LocationContext) as LocationContextType;
    const { active } = React.useContext(ActiveContext) as ActiveContextType;

    let center: Location = { lat: 67.92, lng: 26.5 };

    if (userLocation) center = userLocation;

    function handleClick(event: any): void{
        const selectedLocation = createCoords(event);

        if (active === ActiveState.AddFish) {
            if (setFishGeolocation) setFishGeolocation([selectedLocation]);
            if (setDisabled) setDisabled(false);
        } else if (active === ActiveState.Weather) {
            if (setNewWeatherLocation) setNewWeatherLocation([selectedLocation]);
        }
    }

    useEffect(() => {
        setMarkers(markerLocations);
    }, [markerLocations]);

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
                        lat: marker.geolocation?.lat,
                        lng: marker.geolocation?.lng
                    }
                } />)}
        </GoogleMap>
    )
}
