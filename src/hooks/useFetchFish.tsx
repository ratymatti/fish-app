/**
 * Custom hook for fetching fish data
 * @returns {FetchFish} - object with function for fetching fish data
 */

interface FetchFish {
    fetchFishData: (data: IdToken) => Promise<any>
}

interface IdToken {
    idToken: string;
}

export function useFetchFish(): FetchFish {
    const urlToFetch = 'http://localhost:8080/user/fishes';

    async function fetchFishData({ idToken }: IdToken): Promise<any> {
        const config: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        }

        try {
            const response = await fetch(urlToFetch, config);
            const data = await response.json();
            console.log(data)
            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    return { fetchFishData }
}