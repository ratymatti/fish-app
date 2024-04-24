import React from 'react'

interface SectionButtonProps {
    children: string;
    onClick: () => void;
    disabled?: boolean;
}

export default function SectionButton({ children, onClick, disabled, ...props }: SectionButtonProps) {
    let style = 'border uppercase rounded-md text-xs px-2';
    
    if (disabled) {
        style += ' opacity-30 border-neutral-400 text-neutral-400 bg-neutral-900';
    } else {
        style += ' border-orange-400 text-orange-400 hover:text-orange-300';
    }

    return (
        <button className={style} onClick={onClick} disabled={disabled} {...props}>
            {children}
        </button>
    )
}
