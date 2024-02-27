import React, { useState, useEffect } from 'react';
import AddContainer from '../AddContainer/AddContainer';
import Log from '../Log/Log';
import MapContainer from '../MapContainer/MapContainer';
import Weather from '../Weather/Weather';
import './MainContainer.css';
import Auth from '../Auth/Auth';
import Error from '../Error/Error';

import { CreateFishProvider } from '../../contexts/CreateFishContext';
import { UserContext } from '../../contexts/UserContext';
import { ActiveContext, ActiveContextType, ActiveState } from '../../contexts/ActiveContext';

interface MainContainerProps {
    setFreeze: (freeze: boolean) => void;
}

export default function MainContainer({ setFreeze }: MainContainerProps) {
    const [error, setError] = useState<string>('');

    const { isLoggedIn } = React.useContext(UserContext) as { isLoggedIn: boolean };
    const { active } = React.useContext(ActiveContext) as ActiveContextType;

    useEffect(() => {
        error ? setFreeze(true) : setFreeze(false);
    }, [error]);

    return (
        <div className='main-container'>
            {error && <Error
                error={error}
                setError={setError} />}
            {active === ActiveState.AddFish &&
                <CreateFishProvider>
                    <AddContainer
                        setError={setError} />
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

