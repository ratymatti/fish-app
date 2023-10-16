import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from '../../config/firebase';
import { auth } from '../../config/firebase';

export default function Auth() {

  async function signInWithGoogle() {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch(err) {
        console.error(err);
    }  
  }  

  return (
    <div className='auth'>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

