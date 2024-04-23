import React, { useState } from 'react';
import Map from '../Map/Map';
import Add from '../Add/Add';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import { LocationContext, LocationContextType } from '../../contexts/LocationContext';
import { LocationObject } from '../../types/location';
import Button from '../Button/Button';

export enum CurrentState {
    Map = 'map',
    Add = 'add',
    Loading = 'loading'
}

export default function AddContainer(): JSX.Element | null {
    const [current, setCurrent] = useState<CurrentState>(CurrentState.Map);
    const [fishGeolocation, setFishGeolocation] = useState<LocationObject[]>([]);

    const { userLocation, setUserLocation } = React.useContext(LocationContext) as LocationContextType;

    function handleClick(): void {
        if (fishGeolocation.length) {
            setUserLocation(
                {
                    lat: fishGeolocation[0].geolocation.lat,
                    lng: fishGeolocation[0].geolocation.lng
                }
            );
        }
        setCurrent(CurrentState.Map);
    }


    if (current === CurrentState.Map && userLocation) {
        return (
            <div className='h-1/2 w-full mx-8 flex flex-col'>
                <Map
                    zoom={12}
                    center={userLocation}
                    setFishGeolocation={setFishGeolocation}
                    markerLocations={fishGeolocation} />
                <div className='flex justify-center py-8'>
                    <Button
                        onClick={() => setCurrent(CurrentState.Add)}
                        disabled={!fishGeolocation.length}>
                        {'Select location'}
                    </Button>
                </div>
            </div>
        )
    }

    if (current === CurrentState.Add) {
        return (
            <div>
                <div className='flex justify-center mb-2'>
                    <Button onClick={handleClick}>
                        {'Edit location'}
                    </Button>
                </div>
                <Add
                    fishGeolocation={fishGeolocation}
                    setCurrent={setCurrent}
                    setFishGeolocation={setFishGeolocation} />
            </div>

        )
    }

    if (current === CurrentState.Loading) {
        return (
            <div id='loading'>
                <SpinningIcon />
            </div>
        )
    }

    return null;
}

