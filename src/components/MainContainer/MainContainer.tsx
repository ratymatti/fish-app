import React, { useEffect, useContext } from 'react';
import AddContainer from '../AddContainer/AddContainer';
import Log from '../Log/Log';
import MapContainer from '../MapContainer/MapContainer';
import Weather from '../Weather/Weather';
import Auth from '../Auth/Auth';
import { CreateFishProvider } from '../../contexts/CreateFishContext';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import { AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';
import InvalidInputModal from '../InvalidInputModal/InvalidInputModal';
//import './MainContainer.css';

interface MainContainerProps {
    setFreeze: (freeze: boolean) => void;
}

export default function MainContainer({ setFreeze }: MainContainerProps) {
    const { error, setError } = useContext(AppStateContext) as AppStateContextType;

    const { modalRef, openModal, closeModal } = useModal();  

    const { isLoggedIn, active } = useContext(AppStateContext) as AppStateContextType;

    function handleCloseModal(): void {
        closeModal();
        setError('');
    }

    useEffect(() => {
        if (error.trim() !== '') {
            openModal();
        }
    }, [error]);

    return (
        <>
            <Modal ref={modalRef}>
                <InvalidInputModal errorMessage={error} onClose={handleCloseModal} />
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

