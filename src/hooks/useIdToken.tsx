
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState, useEffect } from "react";

interface IdToken {
    idToken: string | null;
}

export function useIdToken(): IdToken {
    const [idToken, setIdToken] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                setIdToken(token);
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    return { idToken }
}