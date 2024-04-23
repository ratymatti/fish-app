import React, { useContext } from 'react';
import './HeaderButton.css';

import { AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';

interface HeaderButtonProps {
    buttonValue: ActiveState;
}

export default function HeaderButton({ buttonValue }: HeaderButtonProps) {
    const { active, setActive } = useContext(AppStateContext) as AppStateContextType;

    return (
        <li>
            <button
                onClick={() => setActive(buttonValue)}
                className={active === buttonValue ? 'active' : ''}>
                {buttonValue}
            </button>
        </li>
    )
}
