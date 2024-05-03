import { useIdTokenContext } from '../contexts/IdTokenContext';
import { WeatherObject } from '../types/weather';

interface FetchWeatherTrackingHook {
    fetchUserTrackings: () => Promise<WeatherObject[]>;
}

export function useFetchTrackings(): FetchWeatherTrackingHook {

    const { refreshedIdToken } = useIdTokenContext();

    const rootUrl = 'http://localhost:8080/weather';

    async function fetchWeatherFromBackend({ endpoint, method }): Promise<WeatherObject[]> {
        const urlToFetch = `${rootUrl}${endpoint}`;

        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshedIdToken}`
            }
        }

        try {
            const response = await fetch(urlToFetch, config);
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log(err);
            }
        }
        return [];
    }

    function fetchUserTrackings(): Promise<WeatherObject[]> {
        const endpoint = '/user/trackings';
        const method = 'GET';
        return fetchWeatherFromBackend({ endpoint, method });
    }

    return { fetchUserTrackings };
}