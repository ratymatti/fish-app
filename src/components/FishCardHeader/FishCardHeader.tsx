import React from 'react'
import './FishCardHeader.css';

interface FishCardHeaderProps {
    closeCard: () => void;
}

export default function FishCardHeader(props: FishCardHeaderProps): JSX.Element {
    const { closeCard } = props;

    return (
        <div className='fish-card-header'>
            <h3 className='close-card' onClick={() => closeCard()}>x</h3>
        </div>
    )
}
