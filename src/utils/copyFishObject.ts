import { NewFishObject, RequestFishObject } from "../types/fish";

/**
 * Values can be type asserted to be non-null here because
 * this function is only called when those are validated.
 *  
 * @param newFishData as NewFishObject
 * @returns RequestFishObject
 */

function copyFishObject(newFishData: NewFishObject): RequestFishObject {
    const currentFishData: RequestFishObject = {
        species: newFishData.species!,
        length: newFishData.length!,
        date: newFishData.date!.toISOString(),
        locationName: newFishData.locationName!,
        comment: newFishData.comment,
        geolocation: {
            lat: newFishData.geolocation.lat,
            lng: newFishData.geolocation.lng,
        }
    };
    return currentFishData;
}

export default copyFishObject;