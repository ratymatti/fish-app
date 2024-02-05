import React from 'react';
import { useState } from 'react';
import AddContainer from '../AddContainer/AddContainer';
import Log from '../Log/Log';
import MapContainer from '../MapContainer/MapContainer';
import Weather from '../Weather/Weather';
import './MainContainer.css';
import Auth from '../Auth/Auth';
import Error from '../Error/Error';

export default function MainContainer(props) {
    const {
        active,
        changeLocation,
        fishes,
        getCurrentLocation,
        location,
        sortByField,
        weather,
        isLoggedIn,
        setIsLoggedIn,
        getDocuments,
    } = props;

    const [error, setError] = useState('');

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
                getCurrentLocation={getCurrentLocation}
                getDocuments={getDocuments} />
            }
            {active === 'Log' && <Log
                fishes={fishes}
                sortByField={sortByField} />
            }
            {active === 'Weather' && <Weather
                weather={weather}
                location={location}
                active={active} />
            }
            {active === 'MapContainer' && <MapContainer
                center={location}
                active={active}
                fishes={fishes} />
            }
            {!isLoggedIn && <Auth
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn} />}
        </div>
    )
}

