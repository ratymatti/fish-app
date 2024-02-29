import React from 'react';
import Map from '../Map/Map';
import { FishContext, FishContextType } from '../../contexts/FishContext';
import { LocationContext, LocationContextType } from '../../contexts/LocationContext';
import { FishType } from '../../contexts/CreateFishContext';
import { Location, LocationObject } from '../../types/location';

const filterAndTransformFishes = (fishes: FishType[]): LocationObject[] => {
    return fishes
        .filter(fish => fish.id && fish.location)
        .map(fish => ({
            id: fish.id as string,
            location: {
                lat: (fish.location as Location).lat,
                lng: (fish.location as Location).lng
            }
        }));
}

export default function MapContainer(): JSX.Element {
    const { fishes } = React.useContext(FishContext) as FishContextType;
    const { userLocation } = React.useContext(LocationContext) as LocationContextType;

    const validFishArray: LocationObject[] = filterAndTransformFishes(fishes);

    return (
        <div className='map-container'>
            <Map
                center={userLocation}
                zoom={10}
                markerLocations={validFishArray} />
        </div>
    )
}

