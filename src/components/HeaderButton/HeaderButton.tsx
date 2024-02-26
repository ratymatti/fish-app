import React from 'react';
import './HeaderButton.css';

import { ActiveContext, ActiveContextType } from '../../contexts/ActiveContext';

interface HeaderButtonProps {
    buttonValue: string;
    buttonText: string;
}

export default function HeaderButton({ buttonValue, buttonText }: HeaderButtonProps) {
    const { active, setActive } = React.useContext(ActiveContext) as ActiveContextType;

    return (
        <li>
            <button
                onClick={() => setActive(buttonValue)}
                className={active === buttonValue ? 'active' : ''}>
                {buttonText}
            </button>
        </li>
    )
}
