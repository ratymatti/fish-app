import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { mapStyles } from '../../utils/mapStyles';
import createCoords from '../../utils/createCoords';
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
    setNewWeatherLocation?: (value: LocationObject[]) => void;
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

    const { active, mapRef, loading } = useContext(AppStateContext) as AppStateContextType;
    
    const [markers, setMarkers] = useState<Marker[]>([]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    });

    function handleClick(event: google.maps.MapMouseEvent): void {
        try {
            const selectedLocation = createCoords(event);

            if (active === ActiveState.AddFish) {
                if (setFishGeolocation) setFishGeolocation([selectedLocation]);
            } else if (active === ActiveState.Weather) {
                if (setNewWeatherLocation) setNewWeatherLocation([selectedLocation]);
            }
        } catch (error) {
            console.error(error);
            // Handle this error in a more user-friendly way later
        }
    }

    useEffect(() => {
        setMarkers(markerLocations);
    }, [markerLocations]);

    if (!isLoaded || loading) {
        return (
            <div>Loading..</div>
        )
    }

    let center: Location;

    if (mapRef.current) {
        center = mapRef.current!;
    } else {
        center = { lat: 66.215381, lng: 29.635635 }
        // If user location is not available, center the map to
        // 'Hevonperse' ('Horses ass' in English) in Kuusamo, Finland 
    }

    return (
        <GoogleMap
            zoom={zoom}
            center={center}
            mapContainerClassName='w-full h-full'
            onClick={(event) => handleClick(event)}
            options={options}
            onLoad={map => {
                map.addListener('bounds_changed', () => {
                    const center = map.getCenter();
                    if (center) mapRef.current = { lat: center.lat(), lng: center.lng() }
                })
            }}
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
