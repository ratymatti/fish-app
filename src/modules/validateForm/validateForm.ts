import { AppError } from "../../contexts/AppStateContext";
/**
 * Function validateForm
 * used in Add.js
 * @description Validates the form by checking if the species, cm, water, date and location
 *  are provided correctly
 * @param {*} newFishData as NewFishObject
 * @returns string or null
 */

import { NewFishObject } from "../../types/fish";

function validateForm(newFishData : NewFishObject): AppError | null {
    if (!newFishData.date) {
        return AppError.Date;
    } else if (!newFishData.species) {
        return AppError.Species;
    } else if (!newFishData.length || isNaN(newFishData.length) || newFishData.length < 10) {
        return AppError.Length;
    } else if (!newFishData.locationName) {
        return AppError.Location;
    } else if (!newFishData.geolocation) {
        return AppError.Geolocation;
    } else {
        return null;       
    }
}

export default validateForm;