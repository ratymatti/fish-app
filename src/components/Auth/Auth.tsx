import React, { useContext, useEffect } from 'react'
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../../config/firebase';
import { auth } from '../../config/firebase';

import { useAuth } from '../../hooks/useAuth';
import { useIdToken } from '../../hooks/useIdToken';
import { AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';

import googleLogo from '../../assets/web_light_rd_SI.svg';

export default function Auth() {
    const { setActive, isLoggedIn, setIsLoggedIn } = useContext(AppStateContext) as AppStateContextType;

    const { authenticateUser, response } = useAuth();

    const { resetIdTokens } = useIdToken();

    async function signInWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);

            const idToken = await auth.currentUser?.getIdToken();

            if (!idToken) {
                console.error('User not authenticated');
                return;
            }

            authenticateUser({ idToken });

        } catch (err) {
            console.error(err);
        }
    }

    async function logOut() {
        try {
            resetIdTokens();
            await signOut(auth);
            setIsLoggedIn(false);
            setActive(ActiveState.Empty);
            console.log("signed out")
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (response) {
            setIsLoggedIn(true);
        }
    }, [response]);

    const authStyles = "text-s border-2 uppercase rounded-md py-1 px-4 hover:border-orange-400 hover:text-orange-400 transition-colors duration-800 ease-in-out";

    return (
        <div>
            {isLoggedIn ?
                <button className={authStyles} onClick={logOut}>
                    Sign Out
                </button>
                :
                <button className='my-16' onClick={signInWithGoogle}>
                    <img src={googleLogo} alt="Google logo" className="inline-block mr-2" />
                </button>
            }
        </div>
    )
}

