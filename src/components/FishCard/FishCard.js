import React, { useEffect, useState } from 'react'
import './FishCard.css';

export default function FishCard(props) {
    const {
        closeCard,
        currentFishID,
        fishes    
    } = props;

    const [cardFish, setCardFish] = useState(null);

    useEffect(() => {
        async function getFishData() {
            const fish = await fishes.find(fish => fish.id === currentFishID);
            setCardFish(fish);
        }
        getFishData();
    },[])
    
  return (
    <div className='fish-card'>
        <div className='fish-card-header'>
            <h3 className='close-card' onClick={() => closeCard()}>X</h3>
        </div>
    </div>
  )
}

