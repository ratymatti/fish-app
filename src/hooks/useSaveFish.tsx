import { FishObject, RequestFishObject } from "../types/fish";
import { useIdToken } from "./useIdToken";

/**
 * Custom hook for saving fish data
 * @returns {SaveFish} - object with function for saving fish data
 */
  
  interface SaveFishHook {
    saveFishData: (args: RequestFishObject) => Promise<FishObject | null>
  }

export function useSaveFish(): SaveFishHook {
    const urlToFetch = 'http://localhost:8080/fish/save';

    const { refreshedIdToken } = useIdToken();

    async function saveFishData(newFishData: RequestFishObject): Promise<FishObject | null> {
        const config: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshedIdToken}`
            },
            body: JSON.stringify(newFishData)
        }

        try {
            const response = await fetch(urlToFetch, config);
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    }
    
   return { saveFishData }
}