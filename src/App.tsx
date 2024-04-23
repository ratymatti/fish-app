import React, { useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Freeze from './components/Freeze/Freeze';

import { FishProvider } from './contexts/FishContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { LocationProvider } from './contexts/LocationContext';

import { AppStateProvider } from './contexts/AppStateContext';

function App() {
    const [freeze, setFreeze] = useState<boolean>(false);

    return (
        <AppStateProvider>
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
        </AppStateProvider>
                

    )
}

export default App;
