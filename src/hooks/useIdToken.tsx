
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState, useEffect } from "react";

interface IdTokenHook {
    initialIdToken: string | null;
    refreshedIdToken: string | null;
    resetIdTokens: () => void;
}

export function useIdToken(): IdTokenHook {
    const [initialIdToken, setInitialIdToken] = useState<string | null>(null);
    const [refreshedIdToken, setRefreshedIdToken] = useState<string | null>(null);

    function resetIdTokens(): void {
        setInitialIdToken(null);
        setRefreshedIdToken(null);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                setInitialIdToken(token);
                setRefreshedIdToken(token);
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken(true);
                setRefreshedIdToken(token);
            }
        }, 60 * 60 * 1000); // Refresh every hour

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, []);

    return { initialIdToken, refreshedIdToken, resetIdTokens }
}