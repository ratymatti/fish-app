import React from 'react';
import MainContainer from './components/Main/MainContainer';
import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';

import { FishProvider } from './contexts/FishContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { AppStateProvider } from './contexts/AppStateContext';

function App() {

    return (
        <AppStateProvider>
                    <FishProvider>
                        <WeatherProvider>
                            <div className='h-screen overflow-auto'>
                                <Header />
                                <MainContainer />
                                {/* <Footer /> */}
                            </div>
                        </WeatherProvider>
                    </FishProvider>
        </AppStateProvider>
                

    )
}

export default App;
