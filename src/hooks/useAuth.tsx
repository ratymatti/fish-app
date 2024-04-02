import { useState } from "react";

interface FetchUserData {
    endpoint: string;
    method: string;
    idToken: string;
}

interface IdToken {
    idToken: string;
}

export function useAuth() {
    const [response, setResponse] = useState<boolean | null>(null);

    const rootUrl = 'http://localhost:8080/user';

    async function fetchUserAuth({ endpoint, method, idToken }: FetchUserData) {
        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        }

        const urlToFetch = `${rootUrl}/${endpoint}`;

        try {
            const response = await fetch(urlToFetch, config);
            setResponse(response.ok);
        } catch (err) {
            console.error(err);
        }
    }

    function authenticateUser({ idToken }: IdToken ) {
        const endpoint = 'authenticate';
        const method = 'POST';
        
        fetchUserAuth({ endpoint, method, idToken });
    }


    return { authenticateUser, response }
}