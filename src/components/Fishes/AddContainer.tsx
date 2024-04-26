import React, { useContext, useEffect, useRef, useState } from 'react';
import Map from '../Map/Map';
import Add from './Add';
import { LocationObject } from '../../types/location';
import Button from '../Main/Button';
import Modal from '../Modal/Modal';
import InvalidInputModal from '../Modal/InvalidInputModal';
import { AppError, AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';
import { useModal } from '../../hooks/useModal';
import MapContainer from '../Map/MapContainer';
import { CreateFishContext, CreateFishContextType } from '../../contexts/CreateFishContext';
import validateForm from '../../utils/validateForm';

export enum CurrentState {
    Map = 'map',
    Add = 'add',
    Loading = 'loading'
}

export default function AddContainer(): JSX.Element | null {
    const [current, setCurrent] = useState<CurrentState>(CurrentState.Map);
    const [fishGeolocation, setFishGeolocation] = useState<LocationObject[]>([]);

    const { error, setError, userLocation, setUserLocation, setActive } = useContext(AppStateContext) as AppStateContextType;
    const { newFishData, saveNewFish, resetNewFishData } = useContext(CreateFishContext) as CreateFishContextType;

    const { modalRef, openModal, closeModal } = useModal();

    const submitCountRef = useRef(0);

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
        if (submitCountRef.current >= 3) {
            resetNewFishData();
            setTimeout(() => {
                setActive(ActiveState.Empty);
            }, 500);
        }
        closeModal();
        setError(null);
    }

    async function handleSubmit(): Promise<void> {
        const errorMessage = validateForm(newFishData);
        if (errorMessage) {
            setCurrent(CurrentState.Add);
            setError(errorMessage as AppError);
            return;
        } else {
            submitCountRef.current += 1;
        }    
            const response = await saveNewFish();
            if (response) {
                submitCountRef.current = 0;
                setCurrent(CurrentState.Map);
                setFishGeolocation([]);
            } else {
                setCurrent(CurrentState.Add);
                setError(AppError.Network);
            }
    }

    useEffect(() => {
        if (error !== null) {
            openModal();
        }
    }, [error]);


    if (current === CurrentState.Map && userLocation) {
        return (
            <MapContainer>
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
            </MapContainer>
        )
    }

    if (current === CurrentState.Add) {
        return (
            <>
                <Modal ref={modalRef}>
                    {error && <InvalidInputModal submitCount={submitCountRef} errorMessage={error} onClose={handleCloseModal} />}
                </Modal>
                <div className='w-5/6'>
                    <div className='w-full h-1/2'>
                        <Add
                            fishGeolocation={fishGeolocation}
                            setCurrent={setCurrent}
                            setFishGeolocation={setFishGeolocation} />

                    </div>
                    <div className='flex justify-center my-6'>
                        <Button onClick={handleClick}>
                            {'Edit location'}
                        </Button>
                        <Button onClick={handleSubmit}>
                            {'Submit'}
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    if (current === CurrentState.Loading) {
        return (
            <div>Loading..</div>
        )
    }

    return null;
}

