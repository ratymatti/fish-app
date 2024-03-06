import { Timestamp } from "firebase/firestore";
import { WeatherObject } from "./weather";
import { Location } from "./location";

/**
 * Interface FishObject
 * @description Interface for the fish objects stored in the database
 * Used in:
 *      FishContext.tsx,
 *      CreateFishContext.tsx,
 *      sortFishes.ts,
 *      FishCard.tsx,
 *      MapContainer.tsx
 */

export interface FishObject {
    id: string | null;
    species: string | null;
    cm: number | null;
    date: Date | Timestamp | null;
    dateString: string | null;
    locationName: string | null;
    comment: string | null;
    weather: WeatherObject | null;
    geolocation: Location | null;
}

export interface CardFish {
    header: string | null | undefined;
    info: { text: string; value: string }[];
    weather: { text: string; value: string | number }[];
    id: string;
}