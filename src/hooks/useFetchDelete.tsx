import { useIdToken } from './useIdToken';

interface DeleteWeatherHook {
    fetchDeleteWeatherObject: (idToRemove: string) => Promise<boolean>;
} 

export function useFetchDelete(): DeleteWeatherHook {
    const rootUrl = 'http://localhost:8080/weather/delete/';

    const { refreshedIdToken } = useIdToken();

    async function fetchDeleteWeatherObject(idToRemove: string ): Promise<boolean> {
        const urlToFetch = `${rootUrl}${idToRemove}`;

        const config: RequestInit = {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshedIdToken}`
            }
        }
        
        try {
            const response = await fetch(urlToFetch, config);
            if (response.ok) {
                return true;
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log(err);
            }
        }
        return false;
    }

    return { fetchDeleteWeatherObject };
}