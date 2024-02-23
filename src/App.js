import React, { useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Freeze from './components/Freeze/Freeze';

import { FishProvider } from './contexts/FishContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { LocationProvider } from './contexts/LocationContext';

function App() {
    const [active, setActive] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [freeze, setFreeze] = useState(false);


    return (
        <LocationProvider>
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
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            setFreeze={setFreeze} />
                        <Footer />
                    </div>
                </WeatherProvider>
            </FishProvider>
        </LocationProvider>
    )
}

export default App;
