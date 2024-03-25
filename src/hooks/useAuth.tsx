import { useState } from "react";

interface FetchUserData {
    endpoint: string;
    method: string;
    body: IdToken;
}

interface IdToken {
    idToken: string;
}

export function useAuth() {
    const [response, setResponse] = useState<boolean | null>(null);

    const rootUrl = 'http://localhost:8080/user';

    async function fetchUserAuth({ endpoint, method, body }: FetchUserData) {
        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        const urlToFetch = `${rootUrl}/${endpoint}`;

        try {
            const response = await fetch(urlToFetch, config);
            setResponse(response.ok);
        } catch (err) {
            console.error(err);
        }
    }

    async function authenticateUser({ idToken }: IdToken ) {
        const endpoint = 'authenticate';
        const method = 'POST';
        const body = {
            idToken: idToken
        }
        fetchUserAuth({ endpoint, method, body });
    }

    return { authenticateUser, response }
}