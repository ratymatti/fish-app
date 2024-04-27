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
import LocationNotAvailableModal from '../Modal/LocationNotAvailableModal';

export default function MainContainer() {
    const { error, isLoggedIn, active, userLocation, getAndSetLocation } = useContext(AppStateContext) as AppStateContextType;

    const { modalRef, openModal, closeModal } = useModal();

    function handleAllow() {
        getAndSetLocation();
        closeModal();
    }

    function handleClose() {
        closeModal();
    }

    useEffect(() => {
        if (isLoggedIn && !userLocation) {
            openModal();
        } 
    }, [isLoggedIn, userLocation]);

    useEffect(() => {
        setTimeout(() => {
            if (error) {
                openModal();
            }
        }, 500);
    }, [error]);

    return (
        <>
            <Modal ref={modalRef}>
               {!error && <LocationModal onAllow={handleAllow} onDeny={handleClose} />}
               {error && <LocationNotAvailableModal error={error} onClose={handleClose} />}
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

