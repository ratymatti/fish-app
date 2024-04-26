import React from 'react'

interface CardHeaderProps {
    text: string;
}

export default function CardHeader(props: CardHeaderProps): JSX.Element {
    const { text } = props;

    return (
        <div className='bg-red-300 border'>
            <h3>{text}</h3>
            <p className="bg-orange-400">content</p>
        </div>
    )
}
