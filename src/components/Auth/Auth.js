import React from 'react'
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../../config/firebase';
import { auth } from '../../config/firebase';

export default function Auth(props) {
  const {
    setIsLoggedIn
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
        console.log("signed out")
    } catch(err) {
        console.error(err);
    }
  }

  return (
    <div className='auth'>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        <button onClick={logOut}>Sign Out</button>
    </div>
  )
}

