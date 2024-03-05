import React from 'react'
import { useState } from 'react'
import { sortFishes } from '../modules/sortFishes/sortFishes';
import { FishContext } from '../contexts/FishContext';

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

export enum Field {
    SPECIES = 'SPECIES',
    LENGTH = 'LENGTH',
    LOCATION = 'LOCATION',
    DATE = 'DATE'
}

interface SortingHook {
    handleClick: (field: Field) => void;
    sortByField: (field: Field, direction: SortDirection) => void;
}


export default function useSorting(): SortingHook {
    const [direction, setDirection] = useState<SortDirection>(SortDirection.DESC);
    const [currentField, setCurrentField] = useState<Field>(Field.DATE);

    const fishContext = React.useContext(FishContext);

    if (!fishContext) {
        throw new Error("FishContext is undefined");
    }

    const { userFishArr, setUserFishArr } = fishContext;


    function handleClick(field: Field) {
        if (field === currentField) {
            const newDirection = direction === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC;
            setDirection(newDirection);
            sortByField(field, newDirection);
        } else {
            setDirection(SortDirection.DESC);
            setCurrentField(field);
            sortByField(field, SortDirection.DESC);
        }
    }

    function sortByField(field: Field, direction: SortDirection) {
        const sortedFishes = sortFishes(field, userFishArr, direction);
        setUserFishArr(sortedFishes);
    }

    return { handleClick, sortByField }
}
