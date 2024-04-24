/**
 * Function validateForm
 * used in Add.js
 * @description Validates the form by checking if the species, cm, water, date and location
 *  are provided correctly
 * @param {*} newFishData as NewFishObject
 * @returns string or null
 */

import { NewFishObject } from "../../types/fish";

function validateForm(newFishData : NewFishObject): string | null {
    if (!newFishData.date) return 'Date is required';

    if (!newFishData.species) return 'Species is required';
        
    if (!newFishData.length || isNaN(newFishData.length) || newFishData.length <= 0) return 'Length is required';
    
    if (!newFishData.locationName) return 'Location is required';
    
    if (!newFishData.geolocation) return 'Geolocation is required';
    
    return null;       
}

export default validateForm;