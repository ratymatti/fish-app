import React, { useContext } from 'react';
import Auth from '../Auth/Auth';
import HeaderButton from '../HeaderButton/HeaderButton';

import { ActiveState, AppStateContext, AppStateContextType } from '../../contexts/AppStateContext';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderButtonsContainer from '../HeaderButtonsContainer/HeaderButtonsContainer';

export default function Header() {
    const { isLoggedIn } = useContext(AppStateContext) as AppStateContextType;

    return (
        <div className='sticky top-0 z-[10] m-0 bg-neutral-800 flex justify-between w-full h-28 border-b'>
            <HeaderLogo />
            {isLoggedIn &&
                    <HeaderButtonsContainer>
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
                    </HeaderButtonsContainer>}
        </div>
    )
}

