import React from 'react';
import './HeaderButton.css';

import { ActiveContext, ActiveContextType, ActiveState } from '../../contexts/ActiveContext';

interface HeaderButtonProps {
    buttonValue: ActiveState;
}

export default function HeaderButton({ buttonValue }: HeaderButtonProps) {
    const { active, setActive } = React.useContext(ActiveContext) as ActiveContextType;

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
