import React from 'react'
import './Log.css';

export default function Log(props) {
  return (
    <div className='log'>
        <table>
            <thead>
                <tr>
                    <th onClick={() => props.sortByField('species')}>Species</th>
                    <th onClick={() => props.sortByField('cm')}>Length</th>
                    <th onClick={() => props.sortByField('river')}>River</th> 
                    <th onClick={() => props.sortByField('date')}>Date</th>
                </tr>
            </thead>
            <tbody>
                {props.fishes.map(fish => (
                    <tr key={fish.id}>
                        <td>{fish.species}</td>
                        <td>{fish.cm}</td>
                        <td>{fish.river}</td>
                        <td>{fish.date}</td>
                    </tr>
                ))}
            </tbody>   
        </table>
    </div>
  )
}

