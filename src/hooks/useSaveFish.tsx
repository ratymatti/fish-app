import { NewFishObject } from "../types/fish";

/**
 * Custom hook for saving fish data
 * @returns {SaveFish} - object with function for saving fish data
 */

interface SaveFishDataArgs {
    idToken: string;
    newFish: NewFishObject;
  }
  
  interface SaveFish {
    saveFishData: (args: SaveFishDataArgs) => Promise<any>
  }

export function useSaveFish(): SaveFish {
    const urlToFetch = 'http://localhost:8080/fish/save';

    async function saveFishData({ idToken, newFish }: SaveFishDataArgs): Promise<any> {
        const config: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(newFish)
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