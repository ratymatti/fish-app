import React, { useState } from 'react'
import './Log.css';

export default function Log({ fishes, sortByField }) {
    const [direction, setDirection] = useState('desc');
    const [currentField, setCurrentField] = useState('date')

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

  return (
    <div className='log'>
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleClick('species')}>Species</th>
                    <th onClick={() => handleClick('cm')}>Length</th>
                    <th onClick={() => handleClick('river')}>River</th> 
                    <th onClick={() => handleClick('date')}>Date</th>
                </tr>
            </thead>
            <tbody>
                {fishes.slice(0).reverse().map(fish => (
                    
                    <tr className='row' key={fish.id}>
                        <td>{fish.species}</td>
                        <td>{fish.cm}</td>
                        <td>{fish.river}</td>
                        <td>{fish.date.toLocaleDateString('en-GB')}</td>
                    </tr>
                ))}
            </tbody>   
        </table>
    </div>
  )
};

