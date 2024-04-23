import React, { useContext } from 'react';

import { AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';

interface HeaderButtonProps {
    buttonValue: ActiveState;
}

export default function HeaderButton({ buttonValue }: HeaderButtonProps) {
    const { active, setActive } = useContext(AppStateContext) as AppStateContextType;

    let styles = "text-s border-2 uppercase rounded-md py-1 px-4 hover:border-orange-400 transition-colors duration-800 ease-in-out"

    if (active === buttonValue) {
        styles += " text-black bg-orange-400 border-orange-400 hover:cursor-default";
    } else {
        styles += " hover:text-orange-400";
    }

    return (
        <li>
            <button
                onClick={active !== buttonValue ? () => setActive(buttonValue) : undefined}
                className={styles}>
                {buttonValue}
            </button>
        </li>
    )
}
