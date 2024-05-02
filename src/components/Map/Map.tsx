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
        setFishGeolocation,
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

    return (
        <GoogleMap
            zoom={mapRef.current.zoom}
            center={mapRef.current.center}
            mapContainerClassName='w-full h-full'
            onClick={(event) => handleClick(event)}
            options={options}
            onLoad={map => {
                map.addListener('bounds_changed', () => {
                    const center = map.getCenter();
                    const zoom = map.getZoom();
                    if (center && zoom) {
                        mapRef.current = {
                            center: { lat: center.lat(), lng: center.lng() },
                            zoom
                        }
                    }
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
