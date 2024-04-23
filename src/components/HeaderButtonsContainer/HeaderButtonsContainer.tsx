import React, { ReactNode } from 'react';

interface HeaderButtonsContainerProps {
    children: ReactNode;
}

export default function HeaderButtonsContainer({ children }: HeaderButtonsContainerProps) {
    return (
        <ul className='text-white mr-8 w-2/3 flex items-center justify-between'>
            {children}
        </ul>
    );
}