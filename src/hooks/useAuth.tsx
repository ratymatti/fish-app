import { useState } from "react";

interface FetchUserData {
    endpoint: string;
    method: string;
    body: AuthData;
}

interface AuthData {
    name: string;
    email: string;
    idToken: string;
}

export function useAuth() {
    const [response, setResponse] = useState<any>(null);

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
            setResponse(response)
        } catch (err) {
            console.error(err);
        }
    }

    async function authenticateUser({ name, email, idToken }: AuthData ) {
        const endpoint = 'authenticate';
        const method = 'POST';
        const body = {
            name: name,
            email: email,
            idToken: idToken
        }
        fetchUserAuth({ endpoint, method, body });
    }

    return { authenticateUser, response }
}