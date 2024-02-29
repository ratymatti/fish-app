import React, { Dispatch, SetStateAction, useState } from 'react';
import Map from '../Map/Map';
import Add from '../Add/Add';
import './AddContainer.css';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import { LocationContext, LocationContextType } from '../../contexts/LocationContext';
import { LocationObject } from '../../types/location';


interface AddContainerProps {
    setError: Dispatch<SetStateAction<string>>;
}

export enum CurrentState {
    Map = 'map',
    Add = 'add',
    Loading = 'loading'
}

export default function AddContainer(props: AddContainerProps): JSX.Element | null {
    const { setError } = props;

    const [current, setCurrent] = useState<CurrentState>(CurrentState.Map);
    const [fishGeolocation, setFishGeolocation] = useState<LocationObject[]>([]);
    const [disabled, setDisabled] = useState<boolean>(true);

    const { userLocation, setUserLocation } = React.useContext(LocationContext) as LocationContextType;

    function handleClick(): void {
        if (fishGeolocation.length) {
            setUserLocation(
                {
                    lat: fishGeolocation[0].location.lat,
                    lng: fishGeolocation[0].location.lng
                }
            );
        }    
        setCurrent(CurrentState.Map);
    }


    if (current === CurrentState.Map && userLocation) {
        return (
            <div className='map'>
                <Map
                    zoom={12}
                    center={userLocation}
                    setFishGeolocation={setFishGeolocation}
                    markerLocations={fishGeolocation}
                    setDisabled={setDisabled} />
                <button className='button' disabled={disabled} onClick={() => setCurrent(CurrentState.Add)}>Select location</button>
            </div>
        )
    }

    if (current === CurrentState.Add) {
        return (
            <div className='add'>
                <button className='button' onClick={handleClick}>Edit location</button>
                <Add
                    setError={setError}
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

