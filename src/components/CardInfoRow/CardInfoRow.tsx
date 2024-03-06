import React from 'react'
import './CardInfoRow.css';

interface CardInfoRowProps {
    text: string;
    value: string | number;
}

export default function CardInfoRow(props: CardInfoRowProps): JSX.Element {
    const { text, value } = props;

    return (
        <div>
            <h5>{text}{value}</h5>
        </div>
    )
}
