
import { Location } from "./location";

/**
 * Interface FishObject
 * @description Interface for the fish objects stored in the database
 * Used in:
 *      FishContext.tsx,
 *      sortFishes.ts,
 *      FishCard.tsx,
 *      MapContainer.tsx
 */

export interface FishObject {
    id: string;
    species: string;
    length: number;
    date: string | Date;
    locationName: string;
    comment: string | null;
    geolocation: Location;
    dateString: string | null;
}

export interface CardFish {
    header: string;
    info: { text: string; value: string }[];
    weather: { text: string; value: string | number }[];
    id: string;
}

export interface NewFishObject {
    species: string | null;
    length: number | null;
    date: Date | string | null;
    locationName: string | null;
    comment: string | null;
    geolocation: Location;
}