import React from 'react'

interface SectionButtonProps {
    children: string;
    onClick: () => void;
    disabled?: boolean;
    modal?: boolean;
}

export default function SectionButton({ children, onClick, disabled, modal, ...props }: SectionButtonProps) {
    let style = 'border uppercase rounded-md px-2';
    
    if (modal) {
        style += ' border-orange-400 text-orange-400 hover:text-orange-300 text-sm';
    } else if (disabled) {
        style += ' opacity-30 border-neutral-400 text-neutral-400 bg-neutral-900 text-xs';
    } else {
        style += ' border-orange-400 text-orange-400 hover:text-orange-300 text-xs';
    }

    return (
        <button className={style} onClick={onClick} disabled={disabled} {...props}>
            {children}
        </button>
    )
}
