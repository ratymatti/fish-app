import React, { useContext, useEffect } from 'react';
import AddContainer from '../AddContainer/AddContainer';
import Log from '../Log/Log';
import MapContainer from '../MapContainer/MapContainer';
import Weather from '../Weather/Weather';
import Auth from '../Auth/Auth';
import { CreateFishProvider } from '../../contexts/CreateFishContext';
import { AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import LocationModal from '../LocationModal/LocationModal';

interface MainContainerProps {
    setFreeze: (freeze: boolean) => void;
}

export default function MainContainer({ setFreeze }: MainContainerProps) {
    const { isLoggedIn, active, userLocation, getAndSetLocation } = useContext(AppStateContext) as AppStateContextType;

    const { modalRef, openModal, closeModal } = useModal();

    function handleAllow() {
        getAndSetLocation();
        closeModal();
    }

    function handleDeny() {
        closeModal();
    }

    useEffect(() => {
        if (isLoggedIn && !userLocation) {
            openModal();
        } 
    }, [isLoggedIn, userLocation]);

    return (
        <>
            <Modal ref={modalRef}>
                <LocationModal onAllow={handleAllow} onDeny={handleDeny} />
            </Modal>
            <div className='h-screen px-8 mt-8 flex justify-center'>
                {active === ActiveState.AddFish &&
                    <CreateFishProvider>
                        <AddContainer />
                    </CreateFishProvider>}
                {active === ActiveState.Fishes &&
                    <Log
                        setFreeze={setFreeze} />}
                {active === ActiveState.Weather &&
                    <Weather />}
                {active === ActiveState.Map &&
                    <MapContainer />}
                {!isLoggedIn &&
                    <Auth />}
            </div>
        </>
    )
}

