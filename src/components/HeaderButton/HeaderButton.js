import React from 'react';
import './HeaderButton.css';

import { ActiveContext } from '../../contexts/ActiveContext';

export default function HeaderButton({ buttonValue, buttonText }) {
    const { active, setActive } = React.useContext(ActiveContext);

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
