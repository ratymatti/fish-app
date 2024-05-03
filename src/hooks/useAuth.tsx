import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../config/firebase';
import { auth } from '../config/firebase';
import { HttpError } from '../exceptions/HttpError';

interface IdToken {
    idToken: string;
}

interface AuthHook {
    signInWithGoogle: () => Promise<boolean>;
    signOutWithGoogle: () => Promise<boolean>;
}

export function useAuth(): AuthHook {

    async function authenticateUser({ idToken }: IdToken): Promise<Response | Error> {
        const config: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        }
        const url = 'http://localhost:8080/user/authenticate';
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
            }
            return response;
        } catch (err) {
            if (err instanceof HttpError) {
                return err;
            }
            throw new HttpError('Service Unavailable', 503);
        }
    }

    async function signInWithGoogle(): Promise<boolean> {
        try {
            await signInWithPopup(auth, googleProvider);

            const idToken = await auth.currentUser?.getIdToken();
            if (!idToken) {
                console.error('User not authenticated');
                return false;
            }
            const response = await authenticateUser({ idToken });
            if ((response as Response).ok) {
                return true;
            }
        } catch (err) {
            console.error(err);
        }
        return false;
    }

    async function signOutWithGoogle(): Promise<boolean> {
        try {
            await signOut(auth);
            return true;
        } catch (err) {
            console.error(err);
        }
        return false;
    }

    return { signInWithGoogle, signOutWithGoogle }
}