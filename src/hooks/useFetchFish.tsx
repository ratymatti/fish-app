/**
 * Custom hook for fetching fish data
 * @returns {FetchFish} - object with function for fetching fish data
 */

import { FishObject } from "../types/fish";
import { useIdToken } from "./useIdToken";

interface FetchFishHook {
    fetchFishData: () => Promise<FishObject[] | null>
}

export function useFetchFish(): FetchFishHook {
    const urlToFetch = 'http://localhost:8080/fish/user';

    const { refreshedIdToken } = useIdToken();

    async function fetchFishData(): Promise<FishObject[] | null> {
        const config: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshedIdToken}`
            }
        }

        try {
            const response = await fetch(urlToFetch, config);
            if (response.ok) {
                const data: FishObject[] = await response.json();
                return data;
            } 
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    return { fetchFishData }
}