import React from 'react'
import './Log.css';

export default function Log(props) {
  return (
    <div className='log'>
        <table>
            <thead>
                <tr>
                    <th>Species</th>
                    <th>Length</th>
                    <th>River</th> 
                    <th>Date</th>
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

