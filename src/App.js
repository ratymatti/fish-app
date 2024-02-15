import React, { useState, useEffect } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';
import getLocation from './modules/getLocation/getLocation';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Freeze from './components/Freeze/Freeze';

import { FishProvider } from './contexts/FishContext';
import { WeatherProvider } from './contexts/WeatherContext';

function App() {
    const [active, setActive] = useState('');
    const [location, setLocation] = useState(null);
    const [currentUserLocation, setCurrentUserLocation] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [freeze, setFreeze] = useState(false);

    function changeLocation(location) {
        setLocation(location);
    }

    useEffect(() => {
        async function getCoords() {
            const coords = await getLocation();
            setLocation(coords);

            if (!currentUserLocation) {
                setCurrentUserLocation(coords);
            }
        };

        getCoords();
    }, [currentUserLocation]);

    return (
        <FishProvider>
            <WeatherProvider>
                <div className="App">
                    {freeze && <Freeze />}
                    <Header
                        active={active}
                        setActive={setActive}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn} />
                    <MainContainer
                        active={active}
                        location={location}
                        changeLocation={changeLocation}
                        getCurrentLocation={getLocation}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        setFreeze={setFreeze} />
                    <Footer />
                </div>
            </WeatherProvider>
        </FishProvider>
    )
}

export default App;
