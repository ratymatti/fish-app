import React, { useState } from 'react';
import MainContainer from './components/Main/MainContainer';
import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import Freeze from './components/Main/Freeze';

import { FishProvider } from './contexts/FishContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { AppStateProvider } from './contexts/AppStateContext';

function App() {
    const [freeze, setFreeze] = useState<boolean>(false);

    return (
        <AppStateProvider>
                    <FishProvider>
                        <WeatherProvider>
                            <div className='h-screen overflow-auto'>
                                {freeze && <Freeze />}
                                <Header />
                                <MainContainer
                                    setFreeze={setFreeze} />
                                {/* <Footer /> */}
                            </div>
                        </WeatherProvider>
                    </FishProvider>
        </AppStateProvider>
                

    )
}

export default App;
