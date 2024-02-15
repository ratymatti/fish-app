import React, { useState, useEffect } from 'react'
import './Log.css';
import FishCard from '../FishCard/FishCard';
import { FishContext } from '../../contexts/FishContext';
import { sortFishes } from '../../modules/sortFishes/sortFishes';

export default function Log(props) {
    const { setFreeze } = props;

    const [direction, setDirection] = useState('desc');
    const [currentField, setCurrentField] = useState('date');
    const [currentFishID, setCurrentFishID] = useState(null);

    const { fishes, setFishes } = React.useContext(FishContext);

    function handleClick(field) {
        if (field === currentField) {
            const newDirection = direction === 'desc' ? 'asc' : 'desc';
            setDirection(newDirection);
            sortByField(field, newDirection);
        } else {
            setDirection('desc');
            setCurrentField(field);
            sortByField(field, 'desc');
        }
    }

    function sortByField(field, direction) {
        const sortedFishes = sortFishes(field, fishes, direction);
        setFishes(sortedFishes);
    }

    function closeCard() {
        setCurrentFishID(null);
    }

    useEffect(() => {
        sortByField('date', 'desc');
    }, [])

    useEffect(() => {
        currentFishID ? setFreeze(true) : setFreeze(false);
    }, [currentFishID]);


    return (
        <div className='log'>
            {currentFishID && <FishCard
                closeCard={closeCard}
                currentFishID={currentFishID}
                fishes={fishes} />}
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleClick('species')}>Species</th>
                            <th onClick={() => handleClick('cm')}>Length</th>
                            <th onClick={() => handleClick('water')}>Water</th>
                            <th onClick={() => handleClick('date')}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fishes.slice(0).reverse().map(fish => (

                            <tr onClick={() => setCurrentFishID(fish.id)} className='row' key={fish.id}>
                                <td>{fish.species}</td>
                                <td>{fish.cm}cm</td>
                                <td>{fish.water}</td>
                                <td>{fish.dateString}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

