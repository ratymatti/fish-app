import React from 'react'
import './FishCard.css';

export default function FishCard(props) {
    const {
        closeCard,
        currentFish,    
    } = props;
    
  return (
    <div className='fish-card'>
        <div className='fish-card-header'>
            <h3 onClick={() => closeCard()}>X</h3>
        </div>
    </div>
  )
}

