import React, { useContext, useEffect, useState } from 'react';
import Map from './Map';
import { FishContext, FishContextType } from '../../contexts/FishContext';
import { Location, LocationObject } from '../../types/location';
import { FishObject } from '../../types/fish';
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

    const [fishGeolocationArr, setFishGeolocationArr] = useState<LocationObject[]>([]);

    useEffect(() => {
        const validFishArray: LocationObject[] = filterAndTransformFishes(userFishArr);
        setFishGeolocationArr(validFishArray);
    }, [userFishArr]);

    return (
        <MapContainer>
            <Map
                markerLocations={fishGeolocationArr} />
        </MapContainer>
    )
}

