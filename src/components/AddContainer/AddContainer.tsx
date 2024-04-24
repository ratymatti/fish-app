import React, { useContext, useEffect, useState } from 'react';
import Map from '../Map/Map';
import Add from '../Add/Add';
import SpinningIcon from '../SpinningIcon/SpinningIcon';
import { LocationObject } from '../../types/location';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import InvalidInputModal from '../InvalidInputModal/InvalidInputModal';
import { AppStateContext, AppStateContextType } from '../../contexts/AppStateContext';
import { useModal } from '../../hooks/useModal';

export enum CurrentState {
    Map = 'map',
    Add = 'add',
    Loading = 'loading'
}

export default function AddContainer(): JSX.Element | null {
    const [current, setCurrent] = useState<CurrentState>(CurrentState.Map);
    const [fishGeolocation, setFishGeolocation] = useState<LocationObject[]>([]);

    const { error, setError, userLocation, setUserLocation } = useContext(AppStateContext) as AppStateContextType;

    const { modalRef, openModal, closeModal } = useModal();

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

    function handleCloseModal(): void {
        closeModal();
        setError('');
    }

    useEffect(() => {
        if (error.trim() !== '') {
            openModal();
        }
    }, [error]);


    if (current === CurrentState.Map && userLocation) {
        return (
            <div className='h-4/6 w-full flex flex-col mx-8 pb-8'>
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
            <>
                <Modal ref={modalRef}>
                    <InvalidInputModal errorMessage={error} onClose={handleCloseModal} />
                </Modal>
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
            </>
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

