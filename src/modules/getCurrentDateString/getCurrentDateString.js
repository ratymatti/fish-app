/**
 * Function getCurrentDate
 * @description Returns the current date in the format DD/MM/YYYY 
 * @returns {string} - current date
 */

function getCurrentDateString() {
    const now = new Date();
    
    const day = now.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();

    const formattedDateString = `${day}/${month}/${year}`;

    return formattedDateString;
}

export default getCurrentDateString;