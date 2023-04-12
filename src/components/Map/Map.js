import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'


export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    })
   
  return (
    <div className='map'>
        <p>map</p>
    </div>
  )
}

