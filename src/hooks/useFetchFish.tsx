/**
 * Custom hook for fetching fish data
 * @returns {FetchFish} - object with function for fetching fish data
 */

interface FetchFish {
    fetchFishData: (data: FetchFishData) => Promise<any>
}

interface FetchFishData {
    endpoint: string;
    method: string;
    body: string;
}

export function useFetchFish(): FetchFish {
    const rootUrl = 'http://localhost:8080/fish';

    async function fetchFishData({ endpoint, method, body }: FetchFishData): Promise<any> {
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
    return { fetchFishData }
}