import { NewFishObject } from "../types/fish";
import { useIdToken } from "./useIdToken";

/**
 * Custom hook for saving fish data
 * @returns {SaveFish} - object with function for saving fish data
 */
  
  interface SaveFish {
    saveFishData: (args: NewFishObject) => Promise<any>
  }

export function useSaveFish(): SaveFish {
    const urlToFetch = 'http://localhost:8080/fish/save';

    const { refreshedIdToken } = useIdToken();

    async function saveFishData(newFishData: NewFishObject): Promise<any> {
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
    }
   return { saveFishData }
}