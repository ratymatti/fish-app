import React from 'react';
import Map from '../Map/Map';
import { FishContext, FishContextType } from '../../contexts/FishContext';
import { LocationContext, LocationContextType } from '../../contexts/LocationContext';
import { FishType } from '../../contexts/CreateFishContext';

export default function MapContainer() {
    const { fishes } = React.useContext(FishContext) as FishContextType;
    const { userLocation } = React.useContext(LocationContext) as LocationContextType;

    const fishArray: FishType[] = fishes;
    const validFishArray = fishArray
        .filter(fish => fish.id !== null && fish.id !== undefined)
        .filter(fish => fish.location !== null && fish.location !== undefined)
        .map(fish => {
            return {
                id: fish.id as string,
                location: {
                    lat: (fish.location as { lat: number; lng: number; }).lat,
                    lng: (fish.location as { lat: number; lng: number; }).lng
                }
            }
        });

    return (
        <div className='map-container'>
            <Map
                center={userLocation}
                zoom={10}
                markerLocations={validFishArray} />
        </div>
    )
}

