import React, { useEffect } from 'react'
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../../config/firebase';
import { auth } from '../../config/firebase';
import "./Auth.css";

import { UserContext, UserContextType } from '../../contexts/UserContext';
import { ActiveContext, ActiveContextType, ActiveState } from '../../contexts/ActiveContext';
import { useAuth } from '../../hooks/useAuth';

export default function Auth() {
    const { setActive } = React.useContext(ActiveContext) as ActiveContextType;
    const { isLoggedIn, setIsLoggedIn } = React.useContext(UserContext) as UserContextType;

    const { authenticateUser, response } = useAuth();

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

