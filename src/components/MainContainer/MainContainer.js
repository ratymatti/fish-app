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
import { ActiveContext } from '../../contexts/ActiveContext';

export default function MainContainer({ setFreeze }) {
    const [error, setError] = useState(false);

    const { isLoggedIn } = React.useContext(UserContext);
    const { active } = React.useContext(ActiveContext);

    useEffect(() => {
        error ? setFreeze(true) : setFreeze(false);
    }, [error]);

    return (
        <div className='main-container'>
            {error && <Error
                errorMessage={error}
                setError={setError} />}
            {active === 'AddContainer' &&
                <CreateFishProvider>
                    <AddContainer
                        setError={setError} />
                </CreateFishProvider>}
            {active === 'Log' &&
                <Log
                    setFreeze={setFreeze} />}
            {active === 'Weather' &&
                <Weather />}
            {active === 'MapContainer' &&
                <MapContainer />}
            {!isLoggedIn &&
                <Auth />}
        </div>
    )
}

