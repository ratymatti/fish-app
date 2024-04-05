import { useIdToken } from './useIdToken';

interface DeleteTracking {
    fetchRemoveWeather: (idToRemove: string) => Promise<boolean>;
}

export function useFetchDelete(): DeleteTracking {
    const rootUrl = 'http://localhost:8080/weather';

    const { refreshedIdToken } = useIdToken();

    async function fetchDeleteFromBackend({ endpoint }): Promise<boolean> {
        const urlToFetch = `${rootUrl}${endpoint}`;

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

    function fetchRemoveWeather(idToRemove: string): Promise<boolean> {
        const endpoint = `/delete/${idToRemove}`;
    
        return fetchDeleteFromBackend({ endpoint });
    }

    return { fetchRemoveWeather };
}