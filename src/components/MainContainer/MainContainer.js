import React from 'react'
import Add from '../Add/Add'
// import Log from '../Log/Log'
import './MainContainer.css'


export default function MainContainer(props) {
  return (
    <div className='main-container'>
        {/* <Log /> */}
        <Add
            addFish={props.addFish}
        />
    </div>
  )
}

