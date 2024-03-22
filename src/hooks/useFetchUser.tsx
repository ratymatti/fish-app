
interface FetchUserData {
    endpoint: string;
    method: string;
    body: string;
}

export function useFetchUser() {
    const rootUrl = 'http://localhost:8080/user';

    async function fetchUserData({ endpoint, method, body }: FetchUserData): Promise<any> {
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
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async function createNewUser() {
        const endpoint = 'create';
        const method = 'POST';
        const body = {
            name: 'John Doe'
        }
    }

    return { fetchUserData }
}