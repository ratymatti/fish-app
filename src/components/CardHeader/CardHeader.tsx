import React from 'react'
import './CardHeader.css';

interface CardHeaderProps {
    text: string;
}

export default function CardHeader(props: CardHeaderProps): JSX.Element {
    const { text } = props;

    return (
        <div className='card-header'>
            <h3>{text}</h3>
        </div>
    )
}
