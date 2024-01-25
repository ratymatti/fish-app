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

    function sortFishesByField() {
        switch (field) {
            case 'species':
                const sortedBySpecies = [...fishes].sort((fishA, fishB) => {
                    const speciesComparison = fishB.species.localeCompare(fishA.species);

                    if (speciesComparison === 0) {
                        // If species are equal, compare by size
                        return fishA.cm - fishB.cm;
                    } else {
                        // Otherwise, compare by species
                        return speciesComparison;
                    }
                });
                return [...sortedBySpecies];

            case 'cm':
                return [...fishes.sort((fishA, fishB) => {
                    return fishA.cm - fishB.cm;
                })];

            case 'water':
                const sortedByWater = [...fishes].sort((fishA, fishB) => {
                    const waterComparison = fishB.water.localeCompare(fishA.water);
                    if (waterComparison === 0) {
                        // If river is same, compare by size
                        return fishA.cm - fishB.cm;
                    } else {
                        // Otherwise, compare by river
                        return waterComparison;
                    }
                });
                return [...sortedByWater];

            case 'date':
                const sortedFishes = [...fishes].sort((fishA, fishB) => {
                    // Compare the seconds first
                    const secondsComparison = fishA.date.seconds - fishB.date.seconds;

                    // If the seconds are equal, compare the nanoseconds
                    if (secondsComparison === 0) {
                        return fishA.date.nanoseconds - fishB.date.nanoseconds;
                    }

                    return secondsComparison; // Return the seconds comparison result
                });
                return [...sortedFishes];

            default:
                return [...fishes];
        }
    }

    const result = sortFishesByField();

    if (direction === 'asc') {
        return result.reverse();
    }

    if (direction === 'desc') {
        return result;
    }

}
