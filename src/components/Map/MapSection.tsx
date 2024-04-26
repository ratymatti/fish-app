import React, { useContext, useEffect, useState } from 'react';
import Map from './Map';
import { FishContext, FishContextType } from '../../contexts/FishContext';
import { Location, LocationObject } from '../../types/location';
import { FishObject } from '../../types/fish';
import { AppStateContext, AppStateContextType } from '../../contexts/AppStateContext';
import MapContainer from './MapContainer';

const filterAndTransformFishes = (userFishArr: FishObject[]): LocationObject[] => {
    return userFishArr
        .filter(fish => fish.id && fish.geolocation)
        .map(fish => ({
            id: fish.id as string,
            geolocation: {
                lat: (fish.geolocation as Location).lat,
                lng: (fish.geolocation as Location).lng
            }
        }));
}

export default function MapSection(): JSX.Element {
    const { userFishArr } = useContext(FishContext) as FishContextType;
    const { userLocation } = useContext(AppStateContext) as AppStateContextType;

    const [fishGeolocationArr, setFishGeolocationArr] = useState<LocationObject[]>([]);

    useEffect(() => {
        const validFishArray: LocationObject[] = filterAndTransformFishes(userFishArr);
        setFishGeolocationArr(validFishArray);
    }, [userFishArr]);

    return (
        <MapContainer>
            <Map
                center={userLocation}
                zoom={10}
                markerLocations={fishGeolocationArr} />
        </MapContainer>
    )
}

