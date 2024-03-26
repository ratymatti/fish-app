
import { auth } from "../config/firebase";
import { useState, useEffect } from "react";

interface IdToken {
    idToken: string | null;
}

export function useIdToken(): IdToken {
    const [idToken, setIdToken] = useState<string | null>(null);

    useEffect(() => {
        async function getIdToken(): Promise<void> {
            try {
                if (auth.currentUser) {
                    const token = await auth.currentUser?.getIdToken();
                    setIdToken(token);
                }
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.error(err);
                }
            }
        }
        getIdToken();
    }, []);

    return { idToken };
}