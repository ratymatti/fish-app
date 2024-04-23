import React from 'react';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <div className='sticky bottom-0'>
            <p>Copyright © Matti Räty, {year}</p>
        </div>
    )
}

