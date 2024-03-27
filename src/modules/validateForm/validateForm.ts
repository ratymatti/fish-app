/**
 * Function validateForm
 * used in Add.js
 * @description Validates the form by checking if the species, cm, water and location
 *  are provided correctly
 * @param {*} species 
 * @param {*} length 
 * @param {*} locationName 
 * @param {*} fishGeolocation 
 * @returns string or null
 */

interface ValidateFormParams {
    species: string | null;
    length: number | null;
    locationName: string | null;
    geolocation: {
        lat: number;
        lng: number;
    } | null;
    catchDate: Date | null;
}

function validateForm({species, length, locationName, geolocation, catchDate}: ValidateFormParams): string | null {
    if (!species) return 'Species is required';
        
    if (!length || isNaN(length) || length <= 0) return 'Length must be greater than 0';
    
    if (!locationName) return 'Location is required.';
    
    if (!geolocation) return 'Geolocation is required.';

    if (!catchDate) return 'Date is required.';
    
    return null;       
}

export default validateForm;