/**
 * Function validateForm
 * used in Add.js
 * @description Validates the form by checking if the species, cm, water and location
 *  are provided correctly
 * @param {*} species 
 * @param {*} cm 
 * @param {*} water 
 * @param {*} fishGeolocation 
 * @returns string or null
 */

interface ValidateFormParams {
    species: string | null | undefined;
    cm: number | null | undefined;
    water: string | null | undefined;
    location: {
        lat: number;
        lng: number;
    } | null | undefined;
}

function validateForm({species, cm, water, location}: ValidateFormParams): string | null {
    if (!species) return 'Species is required';
        
    if (!cm || isNaN(cm) || cm <= 0) return 'Length must be greater than 0';
    
    if (!water) return 'Location is required.';
    
    if (!location) return 'Geolocation is required.';
    
    return null;       
}

export default validateForm;