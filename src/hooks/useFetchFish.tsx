/**
 * Custom hook for fetching fish data
 * @returns {FetchFish} - object with function for fetching fish data
 */

import { useIdToken } from "./useIdToken";

interface FetchFish {
    fetchFishData: () => Promise<any>
}


export function useFetchFish(): FetchFish {
    const urlToFetch = 'http://localhost:8080/user/fishes';

    const { refreshedIdToken } = useIdToken();

    async function fetchFishData(): Promise<any> {
        const config: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshedIdToken}`
            }
        }

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