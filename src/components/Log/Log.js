import React from 'react'

export default function Log(props) {
  return (
    <div className='log'>
        <table>
            <tr>
                <th>Species</th>
                <th>River</th> 
                <th>Date</th>
            </tr>
            {props.fishes.map(fish => {
                return (
                    <tr key={fish.id}>
                        <td>{fish.species}</td>
                        <td>{fish.river}</td>
                        <td>{fish.date}</td>
                    </tr>
                )
            })}
        </table>
    </div>
  )
}

