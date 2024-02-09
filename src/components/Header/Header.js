import React from 'react';
import './Header.css';
import Auth from '../Auth/Auth';

export default function Header(props) {
    const {
        setActive, isLoggedIn,
        setIsLoggedIn, active
    } = props;

    return (
        <div className='header'>
            <h1>Only <span className='fish-logo'>Fishes</span></h1>
            {isLoggedIn &&
                <div className='header-buttons'>
                    <ul>
                        <li>
                            <button
                                onClick={() => setActive('AddContainer')}
                                className={active === 'AddContainer' ? "active" : ""}>Add Fish
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActive('Log')}
                                className={active === 'Log' ? "active" : ""}>Log
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActive('MapContainer')}
                                className={active === 'MapContainer' ? "active" : ""}>Map
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActive('Weather')}
                                className={active === 'Weather' ? "active" : ""}>Weather
                            </button>
                        </li>
                        <li>{isLoggedIn && <Auth
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            setActive={setActive} />}
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

