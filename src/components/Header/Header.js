import React from 'react'
import './Header.css'; 

export default function Header() {
  return (
    <div className='header'>
        <ul>
            <li><button>Add</button></li>
            <li><button>Log</button></li>
            <li><button>Weather</button></li>
        </ul>
        <h1>Fish App</h1>
    </div>
  )
}
