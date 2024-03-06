import React from 'react'
import './FishCardInfoRow.css';

interface FishCardInfoRowProps {
    text: string;
    value: string | number;
}

export default function FishCardInfoRow(props: FishCardInfoRowProps): JSX.Element {
    const { text, value } = props;

    return (
        <div>
            <h5>{text}{value}</h5>
        </div>
    )
}
