/**
 * Sorts an array of fish objects based on the selected field and direction.
 * 
 * @param {string} field - The field to sort the fish objects by (e.g., 'species', 'cm', 'water', 'date').
 * @param {Array} fishes - The array of fish objects to be sorted.
 * @param {string} direction - The sorting direction ('asc' for ascending, 'desc' for descending).
 * 
 * @returns {Array} - The sorted array of fish objects.
 */

export const sortFishes = (field, fishes, direction) => {
    const fishesCopy = [...fishes];

    function sortFishesByField() {
        switch (field) {
            
            case 'species':
                return fishesCopy.sort((fishA, fishB) => {
                    const speciesComparison = fishB.species.localeCompare(fishA.species);
                    return speciesComparison === 0 ? fishA.cm - fishB.cm : speciesComparison; // If species are equal, compare by size
                });

            case 'cm':
                return fishes.sort((fishA, fishB) => fishA.cm - fishB.cm);

            case 'water':
                return fishesCopy.sort((fishA, fishB) => {
                    const waterComparison = fishB.water.localeCompare(fishA.water);
                    return waterComparison === 0 ? fishA.cm - fishB.cm : waterComparison; // If water are equal, compare by size
                });
                
            case 'date':
                return fishesCopy.sort((fishA, fishB) => {
                    const dayA = Math.floor(fishA.date.seconds / (24*60*60)); // Convert seconds 
                    const dayB = Math.floor(fishB.date.seconds / (24*60*60)); // to days

                    const dayComparison = dayA - dayB;
                    return dayComparison === 0 ? fishA.cm - fishB.cm : dayComparison; // If the days are equal, compare the cm values
                });

            default:
                return fishesCopy;
        }
    }

    const result = sortFishesByField();

    return direction === 'desc' ? result : result.reverse(); // Reverse the array if the direction is ascending
}
