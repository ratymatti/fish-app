import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import './Map.css';


export default function Map(props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    })

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    
    return <GoogleMap
              zoom={props.zoom}
              center={props.center}
              mapContainerClassName='map-container' />
}
