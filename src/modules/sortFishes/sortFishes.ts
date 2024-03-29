import { Field, SortDirection } from '../../hooks/useSorting';
import { FishObject } from '../../types/fish';

/**
 * Sorts an array of fish objects based on the selected field and direction.
 * 
 * @param {Field} field - The field to sort the fish objects by (e.g., 'species', 'cm', 'water', 'date').
 * @param {FishObject[]} userFishArr - The array of fish objects to be sorted.
 * @param {SortDirection} direction - The sorting direction ('asc' for ascending, 'desc' for descending).
 * 
 * @returns {Array} - The sorted array of fish objects.
 */

interface SortFishes {
    field : Field;
    userFishArr : FishObject[];
    direction : SortDirection;
}

export const sortFishes = ({field, userFishArr, direction}: SortFishes): FishObject[] => {
    const fishesCopy = [...userFishArr];

    function sortFishesByField() {

        switch (field) {
            case Field.SPECIES:
                return fishesCopy.sort((fishA, fishB) => {
                    const speciesComparison = (fishB.species || '').localeCompare(fishA.species || '') ?? 0;
                    return speciesComparison === 0 ? (fishA.length ?? 0) - (fishB.length ?? 0) : speciesComparison;
                });

            case Field.LENGTH:
                return fishesCopy.sort((fishA, fishB) => (fishA.length ?? 0) - (fishB.length ?? 0));

            case Field.LOCATION:
                return fishesCopy.sort((fishA, fishB) => {
                    const waterComparison = (fishB.locationName || '').localeCompare(fishA.locationName || '') ?? 0;
                    return waterComparison === 0 ? (fishA.length ?? 0) - (fishB.length ?? 0) : waterComparison;
                });

            case Field.DATE:
                return fishesCopy.sort((fishA, fishB) => {
                    const dateA = fishA.date instanceof Date ? fishA.date.getTime() : 0;
                    const dateB = fishB.date instanceof Date ? fishB.date.getTime() : 0;
                    const dayComparison = dateA - dateB;
                    return dayComparison === 0 ? (fishA.length ?? 0) - (fishB.length ?? 0) : dayComparison;
                });

            default:
                return fishesCopy;
        }
    }

    const result = sortFishesByField();

    return direction === SortDirection.DESC ? result : result.reverse(); // Reverse the array if the direction is ascending
}
