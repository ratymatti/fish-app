import React from 'react';
import { useState, useEffect } from 'react';
import AddContainer from '../AddContainer/AddContainer';
import Log from '../Log/Log';
import MapContainer from '../MapContainer/MapContainer';
import Weather from '../Weather/Weather';
import './MainContainer.css';
import Auth from '../Auth/Auth';
import Error from '../Error/Error';

export default function MainContainer(props) {
    const {
        active, changeLocation,
        getCurrentLocation, location,
        isLoggedIn, setIsLoggedIn,
        setFreeze
    } = props;

    const [error, setError] = useState(false);

    useEffect(() => {
        error ? setFreeze(true) : setFreeze(false);
    }, [error]);

    return (
        <div className='main-container'>
            {error && <Error
                errorMessage={error}
                setError={setError} />}
            {active === 'AddContainer' && <AddContainer
                location={location}
                active={active}
                setError={setError}
                changeLocation={changeLocation}
                getCurrentLocation={getCurrentLocation} />
            }
            {active === 'Log' && <Log
                setFreeze={setFreeze} />
            }
            {active === 'Weather' && <Weather
                location={location}
                active={active} />
            }
            {active === 'MapContainer' && <MapContainer
                center={location}
                active={active} />
            }
            {!isLoggedIn && <Auth
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn} />}
        </div>
    )
}

