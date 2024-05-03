import React, { useContext } from 'react'
import { AppStateContext, AppStateContextType } from '../../contexts/AppStateContext';

import googleLogo from '../../assets/web_light_rd_SI.svg';

export default function Auth() {
    const { isLoggedIn, handleSignIn, handleSignOut } = useContext(AppStateContext) as AppStateContextType;

    const authStyles = "text-s border-2 uppercase rounded-md py-1 px-4 hover:border-orange-400 hover:text-orange-400 transition-colors duration-800 ease-in-out";

    return (
        <div>
            {isLoggedIn ?
                <button className={authStyles} onClick={handleSignOut}>
                    Sign Out
                </button>
                :
                <button className='my-16' onClick={handleSignIn}>
                    <img src={googleLogo} alt="Google logo" className="inline-block mr-2" />
                </button>
            }
        </div>
    )
}

