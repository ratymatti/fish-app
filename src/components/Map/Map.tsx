import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { mapStyles } from '../../modules/mapStyles/mapStyles';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import createCoords from '../../modules/createCoords/createCoords';
import { Location, LocationObject } from '../../types/location';
import { AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';


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
        setNewWeatherLocation
    } = props;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    });

    const [markers, setMarkers] = useState<Marker[]>([]);

    const { active, userLocation } = useContext(AppStateContext) as AppStateContextType;

    let center: Location = { lat: 67.92, lng: 26.5 };

    if (userLocation) center = userLocation;

    function handleClick(event: any): void{
        const selectedLocation = createCoords(event);

        if (active === ActiveState.AddFish) {
            if (setFishGeolocation) setFishGeolocation([selectedLocation]);
        } else if (active === ActiveState.Weather) {
            if (setNewWeatherLocation) setNewWeatherLocation([selectedLocation]);
        }
    }

    useEffect(() => {
        setMarkers(markerLocations);
    }, [markerLocations]);

    if (!isLoaded) {
        return (
            <div className='h-full w-full'>
                <SpinningIcon />
            </div>
        )
    }

    return (
        <GoogleMap
            zoom={zoom}
            center={center}
            mapContainerClassName='w-full h-full'
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
