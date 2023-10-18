/**
     * Function that sorts fishes depending on users choices.
     * firstSort() function sorts array of objects by selected field
     * and after that it's returned descending or ascending order 
     * depending value of direction parameter.
     * 
     * @param field which is field that user selects
     * @param fishes that is allways the state variable that contains users fishes
     * @param direction that is direction user is chosen fishes to be sorted
     * 
     * @returns that sorted list
     */

export const sortFishes = (field, fishes, direction) => {

    function firstSort() {
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
    };

    const result = firstSort();

    if (direction === 'asc') {
      return result.reverse();
    } 
    
    if (direction === 'desc') {
      return result;
    }
 
};
