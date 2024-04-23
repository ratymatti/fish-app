import React, { useContext } from 'react';
import './Header.css';
import Auth from '../Auth/Auth';
import HeaderButton from '../HeaderButton/HeaderButton';

import { ActiveState, AppStateContext, AppStateContextType } from '../../contexts/AppStateContext';

export default function Header() {
    
    const { isLoggedIn } = useContext(AppStateContext) as AppStateContextType;

    return (
        <div className='header'>
            <h1>Only <span className='fish-logo'>Fishes</span></h1>
            {isLoggedIn &&
                <div className='header-buttons'>
                    <ul>
                        <HeaderButton
                            buttonValue={ActiveState.AddFish} />
                        <HeaderButton
                            buttonValue={ActiveState.Fishes} />
                        <HeaderButton
                            buttonValue={ActiveState.Map} />
                        <HeaderButton
                            buttonValue={ActiveState.Weather} />
                        <li>
                            {isLoggedIn && <Auth />}
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

