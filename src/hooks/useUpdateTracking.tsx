import { WeatherObject } from "../types/weather";
import { useIdToken } from "./useIdToken";

interface UpdateTrackingsHook {
    fetchUpdateTrackingWeather: (weatherObjId: string) => Promise<WeatherObject | null>;
}

export function useUpdateTracking(): UpdateTrackingsHook {

    const { refreshedIdToken } = useIdToken();

    const rootUrl = 'http://localhost:8080/weather';

    async function fetchUpdateTracking({ endpoint, method }): Promise<WeatherObject | null> {

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
        return null;
    }

    function fetchUpdateTrackingWeather(weatherObjId: string): Promise<WeatherObject | null> {
        const endpoint = `/update/${weatherObjId}`;
        const method = 'PUT';

        return fetchUpdateTracking({ endpoint, method });
    }

    return { fetchUpdateTrackingWeather };
}