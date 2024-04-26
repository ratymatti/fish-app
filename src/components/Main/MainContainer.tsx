import React, { useContext, useEffect } from 'react';
import AddContainer from '../Fishes/AddContainer';
import Log from '../Fishes/Log';
import MapSection from '../Map/MapSection';
import Weather from '../Weather/Weather';
import Auth from '../Auth/Auth';
import { CreateFishProvider } from '../../contexts/CreateFishContext';
import { AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import LocationModal from '../Modal/LocationModal';

export default function MainContainer() {
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
                    <Log />}
                {active === ActiveState.Weather &&
                    <Weather />}
                {active === ActiveState.Map &&
                    <MapSection />}
                {!isLoggedIn &&
                    <Auth />}
            </div>
        </>
    )
}

