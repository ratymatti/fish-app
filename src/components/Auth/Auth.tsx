import React, { useContext, useEffect } from 'react'
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../../config/firebase';
import { auth } from '../../config/firebase';
import "./Auth.css";

import { useAuth } from '../../hooks/useAuth';
import { useIdToken } from '../../hooks/useIdToken';
import { AppStateContext, AppStateContextType, ActiveState } from '../../contexts/AppStateContext';

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


    return (
        <div className='auth'>
            {isLoggedIn ?
                <button onClick={logOut}>
                    Sign Out
                </button>
            :
                <button onClick={signInWithGoogle}>
                    Sign In With Google
                </button>}
        </div>
    )
}

