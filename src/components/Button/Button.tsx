import React from 'react'

interface ButtonProps {
    children: string;
    disabled?: boolean;
    onClick: (() => void) | ((event: React.FormEvent<HTMLButtonElement>) => Promise<void>);
}

export default function Button({children, disabled, onClick, ...props}: ButtonProps) {
    let styles = 'text-white bg-neutral-800 border-white mx-8 border-2 uppercase rounded-md px-4 py-1';

    if (!disabled) {
        styles += ' hover:cursor-pointer hover:border-orange-400 hover:text-orange-400';
    } else {
        styles += ' opacity-30';
    }

    return (
        <button
            className={styles}
            disabled={disabled}
            onClick={onClick}
            {...props}>
            {children}
        </button>
    )
}
