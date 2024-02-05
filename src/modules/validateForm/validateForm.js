/**
 * Function validateForm
 * used in Add.js
 * @description Validates the form by checking if the species, cm, water and location are filled in correctly
 * @param {*} species 
 * @param {*} cm 
 * @param {*} water 
 * @param {*} fishGeolocation 
 * @returns string or null
 */

function validateForm(species, cm, water, fishGeolocation) {
    if (!species) {
        return 'Species is required.';
    } else if (!cm || isNaN(cm) || cm <= 0) {
        return 'Cm must be greater than 0.';
    } else if (!water) {
        return 'Water is required.';
    } else if (!fishGeolocation) {
        return 'Location is required.';
    } else {
        return null;
    }       
}

export default validateForm;