import React, { useState, useEffect } from 'react'
import './Log.css';
import FishCard from '../FishCard/FishCard';

export default function Log(props) {
    const {
        fishes,
        sortByField
    } = props;

    const [direction, setDirection] = useState('desc');
    const [currentField, setCurrentField] = useState('date');
    const [currentFishID, setCurrentFishID] = useState(null);

    /**
     * handleClick function that calls sorting function with arguments 'field' (that
     * user selected) and 'direction' (desc or asc) depending on current direction state
     * variable.
     * @param {*} field 
     */

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

    useEffect(() => {
        sortByField('date', 'desc');
    }, [])

    function closeCard() {
        setCurrentFishID(null);
    }

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

