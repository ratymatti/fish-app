import React from 'react';
import MainContainer from './components/Main/MainContainer';
import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';

import { FishProvider } from './contexts/FishContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { AppStateProvider } from './contexts/AppStateContext';
import { IdTokenProvider } from './contexts/IdTokenContext';

function App() {

    return (
        <IdTokenProvider>
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
        </IdTokenProvider>
    )
}

export default App;
