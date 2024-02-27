import { Field, SortDirection } from '../../components/Log/Log';
import { FishType } from '../../contexts/CreateFishContext';

/**
 * Sorts an array of fish objects based on the selected field and direction.
 * 
 * @param {string} field - The field to sort the fish objects by (e.g., 'species', 'cm', 'water', 'date').
 * @param {Array} fishes - The array of fish objects to be sorted.
 * @param {string} direction - The sorting direction ('asc' for ascending, 'desc' for descending).
 * 
 * @returns {Array} - The sorted array of fish objects.
 */

export const sortFishes = (field: Field, fishes: FishType[], direction: SortDirection): FishType[] => {
    const fishesCopy = [...fishes];

    function sortFishesByField() {
        switch (field) {
            case Field.SPECIES:
                return fishesCopy.sort((fishA, fishB) => {
                    const speciesComparison = (fishB.species || '').localeCompare(fishA.species || '') ?? 0;
                    return speciesComparison === 0 ? (fishB.cm ?? 0) - (fishA.cm ?? 0) : speciesComparison;
                });

            case Field.LENGTH:
                return fishes.sort((fishA, fishB) => (fishA.cm ?? 0) - (fishB.cm ?? 0));

            case Field.LOCATION:
                return fishesCopy.sort((fishA, fishB) => {
                    const waterComparison = (fishB.water || '').localeCompare(fishA.water || '') ?? 0;
                    return waterComparison === 0 ? (fishB.cm ?? 0) - (fishA.cm ?? 0) : waterComparison;
                });

            case Field.DATE:
                return fishesCopy.sort((fishA, fishB) => {
                    const dateA = fishA.date instanceof Date ? fishA.date.getTime() : 0;
                    const dateB = fishB.date instanceof Date ? fishB.date.getTime() : 0;
                    const dayComparison = dateA - dateB;
                    return dayComparison === 0 ? (fishA.cm ?? 0) - (fishB.cm ?? 0) : dayComparison;
                });

            default:
                return fishesCopy;
        }
    }

    const result = sortFishesByField();

    return direction === SortDirection.DESC ? result : result.reverse(); // Reverse the array if the direction is ascending
}
