import React from 'react';
import './Header.css';
import Auth from '../Auth/Auth';
import HeaderButton from '../HeaderButton/HeaderButton';

import { UserContext, UserContextType } from '../../contexts/UserContext';

export default function Header() {
    const { isLoggedIn }: {isLoggedIn : boolean } = React.useContext(UserContext) as UserContextType;

    return (
        <div className='header'>
            <h1>Only <span className='fish-logo'>Fishes</span></h1>
            {isLoggedIn &&
                <div className='header-buttons'>
                    <ul>
                        <HeaderButton
                            buttonValue={'AddContainer'}
                            buttonText={'Add Fish'} />
                        <HeaderButton
                            buttonValue={'Log'}
                            buttonText={'Fishes'} />
                        <HeaderButton
                            buttonValue={'MapContainer'}
                            buttonText={'Map'} />
                        <HeaderButton
                            buttonValue={'Weather'}
                            buttonText={'Weather'} />
                        <li>
                            {isLoggedIn && <Auth />}
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

