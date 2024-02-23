import React from 'react';
import './Header.css';
import Auth from '../Auth/Auth';

import { UserContext } from '../../contexts/UserContext';

export default function Header(props) {
    const { active, setActive } = props;

    const { isLoggedIn } = React.useContext(UserContext);

    return (
        <div className='header'>
            <h1>Only <span className='fish-logo'>Fishes</span></h1>
            {isLoggedIn &&
                <div className='header-buttons'>
                    <ul>
                        <li>
                            <button
                                onClick={() => setActive('AddContainer')}
                                className={active === 'AddContainer' ? "active" : ""}>
                                Add Fish
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActive('Log')}
                                className={active === 'Log' ? "active" : ""}>
                                Log
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActive('MapContainer')}
                                className={active === 'MapContainer' ? "active" : ""}>
                                Map
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActive('Weather')}
                                className={active === 'Weather' ? "active" : ""}>
                                Weather
                            </button>
                        </li>
                        <li>{isLoggedIn &&
                            <Auth
                                setActive={setActive} />}
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

