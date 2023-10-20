import React from 'react'
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../../config/firebase';
import { auth } from '../../config/firebase';
import "./Auth.css";

export default function Auth(props) {
  const {
    setIsLoggedIn,
    isLoggedIn,
    setActive
  } = props;  

  async function signInWithGoogle() {
    try {
        await signInWithPopup(auth, googleProvider);
        console.log(auth?.currentUser?.email);
        setIsLoggedIn(true);
    } catch(err) {
        console.error(err);
    }  
  }
  
  async function logOut() {
    try {
        await signOut(auth);
        setIsLoggedIn(false);
        setActive('');
        console.log("signed out")
    } catch(err) {
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

