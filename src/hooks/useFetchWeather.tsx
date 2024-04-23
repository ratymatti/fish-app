
import { Location } from '../types/location';
import { WeatherObject } from '../types/weather';
import { useIdToken } from './useIdToken';
import { WeatherEndpoint } from '../contexts/WeatherContext';

interface FetchCurrentWeatherHook {
    fetchCurrentWeather: (location: Location, endpoint: WeatherEndpoint) => Promise<WeatherObject | null>;
}

export function useFetchWeather(): FetchCurrentWeatherHook {

    const { refreshedIdToken } = useIdToken();

    const rootUrl = 'http://localhost:8080/weather';

    async function fetchWeatherFromBackend({ endpoint, method, body }): Promise<WeatherObject | null> {
        const urlToFetch = `${rootUrl}${endpoint}`;

        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshedIdToken}`
            },
            body: JSON.stringify(body)
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
        return null;
    }

    function fetchCurrentWeather(location: Location, endpoint: WeatherEndpoint): Promise<WeatherObject | null> {
        const method = 'POST';
        const body = location;
        return fetchWeatherFromBackend({ endpoint, method, body });
    }

    return { fetchCurrentWeather };
}