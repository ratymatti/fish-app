import React, { useContext } from 'react';
import AddContainer from '../AddContainer/AddContainer';
import Log from '../Log/Log';
import MapContainer from '../MapContainer/MapContainer';
import Weather from '../Weather/Weather';
import Auth from '../Auth/Auth';
import { CreateFishProvider } from '../../contexts/CreateFishContext';
import { AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';

interface MainContainerProps {
    setFreeze: (freeze: boolean) => void;
}

export default function MainContainer({ setFreeze }: MainContainerProps) {
    const { isLoggedIn, active } = useContext(AppStateContext) as AppStateContextType;

    return (
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
    )
}

