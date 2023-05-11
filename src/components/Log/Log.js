import React from 'react'
import './Log.css';

export default function Log(props) {
    
    const { fishes, sortByField } = props;

  return (
    <div className='log'>
        <table>
            <thead>
                <tr>
                    <th onClick={() => sortByField('species')}>Species</th>
                    <th onClick={() => sortByField('cm')}>Length</th>
                    <th onClick={() => sortByField('river')}>River</th> 
                    <th onClick={() => sortByField('date')}>Date</th>
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
}

