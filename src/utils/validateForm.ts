import { AppError } from "../contexts/AppStateContext";
/**
 * Function validateForm
 * used in Add.js
 * @description Validates the form by checking if the species, cm, water, date, location and geolocation
 *  are provided correctly
 * @param {*} newFishData as NewFishObject
 * @returns string or null
 */

import { NewFishObject } from "../types/fish";

function validateForm(newFishData: NewFishObject): AppError | null {
    if (!newFishData.date) {
        return AppError.Date;
    }
    if (!newFishData.species) {
        return AppError.Species;
    }
    if (!newFishData.length || isNaN(newFishData.length) || newFishData.length < 10) {
        return AppError.Length;
    }
    if (!newFishData.location) {
        return AppError.Location;
    }
    if (!newFishData.geolocation) {
        return AppError.Geolocation;
    }
    return null;

}

export default validateForm;