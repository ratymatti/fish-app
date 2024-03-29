import React, { useEffect, useState } from 'react';
import Map from '../Map/Map';
import { FishContext, FishContextType } from '../../contexts/FishContext';
import { LocationContext, LocationContextType } from '../../contexts/LocationContext';
import { Location, LocationObject } from '../../types/location';
import { FishObject } from '../../types/fish'; 

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

export default function MapContainer(): JSX.Element {
    const { userFishArr } = React.useContext(FishContext) as FishContextType;
    const { userLocation } = React.useContext(LocationContext) as LocationContextType;

    const [fishGeolocationArr, setFishGeolocationArr] = useState<LocationObject[]>([]);

    useEffect(() => {
        const validFishArray: LocationObject[] = filterAndTransformFishes(userFishArr);
        setFishGeolocationArr(validFishArray);
    }, [userFishArr]);

    return (
        <div className='map-container'>
            <Map
                center={userLocation}
                zoom={10}
                markerLocations={fishGeolocationArr} />
        </div>
    )
}

