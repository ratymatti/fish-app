import React from 'react'
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../../config/firebase';
import { auth } from '../../config/firebase';
import "./Auth.css";

import { UserContext } from '../../contexts/UserContext';
import { ActiveContext } from '../../contexts/ActiveContext';

export default function Auth() {
    const { setActive } = React.useContext(ActiveContext);
    const { isLoggedIn, setIsLoggedIn } = React.useContext(UserContext);

    async function signInWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log(auth?.currentUser?.email); // REMOVE THIS LATER
            if (auth.currentUser) setIsLoggedIn(true);
        } catch (err) {
            console.error(err);
        }
    }

    async function logOut() {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            setActive('');
            console.log("signed out")
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='auth'>
            {isLoggedIn ?
                <button
                    onClick={logOut}>Sign Out</button> :
                <button
                    onClick={signInWithGoogle}>Sign In With Google</button>
            }
        </div>
    )
}

