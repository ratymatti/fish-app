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

export default function MainContainer(props) {
    const { active, setFreeze } = props;

    const [error, setError] = useState(false);

    const { isLoggedIn } = React.useContext(UserContext);

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
                        active={active}
                        setError={setError} />
                </CreateFishProvider>
            }
            {active === 'Log' && <Log
                setFreeze={setFreeze} />
            }
            {active === 'Weather' && <Weather
                active={active} />
            }
            {active === 'MapContainer' && <MapContainer
                active={active} />
            }
            {!isLoggedIn && <Auth />}
        </div>
    )
}

