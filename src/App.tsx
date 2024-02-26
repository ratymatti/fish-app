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
import { ActiveProvider } from './contexts/ActiveContext';

function App() {
    const [freeze, setFreeze] = useState<boolean>(false);

    return (
        <ActiveProvider>
            <UserProvider>
                <LocationProvider>
                    <FishProvider>
                        <WeatherProvider>
                            <div className='App'>
                                {freeze && <Freeze />}
                                <Header />
                                <MainContainer
                                    setFreeze={setFreeze} />
                                <Footer />
                            </div>
                        </WeatherProvider>
                    </FishProvider>
                </LocationProvider>
            </UserProvider>
        </ActiveProvider>
    )
}

export default App;
