import React, { useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Freeze from './components/Freeze/Freeze';

import { FishProvider } from './contexts/FishContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { LocationProvider } from './contexts/LocationContext';
import { UserProvider } from './contexts/UserContext';

function App() {
    const [active, setActive] = useState('');
    const [freeze, setFreeze] = useState(false);

    return (
        <UserProvider>
            <LocationProvider>
                <FishProvider>
                    <WeatherProvider>
                        <div className="App">
                            {freeze && <Freeze />}
                            <Header
                                active={active}
                                setActive={setActive} />
                            <MainContainer
                                active={active}
                                setFreeze={setFreeze} />
                            <Footer />
                        </div>
                    </WeatherProvider>
                </FishProvider>
            </LocationProvider>
        </UserProvider>
    )
}

export default App;
