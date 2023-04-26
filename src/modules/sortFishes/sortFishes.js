export const sortFishes = (field, fishes) => {

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

      case 'river':
        const sortedByRiver = [...fishes].sort((fishA, fishB) => {
          const riverComparison = fishB.river.localeCompare(fishA.river);
          if (riverComparison === 0) {
            // If river is same, compare by size
            return fishA.cm - fishB.cm;
          } else {
            // Otherwise, compare by river
            return riverComparison;
          }
        });
        return [...sortedByRiver];

      case 'date':
        const sortedFishes = [...fishes].sort((fishA, fishB) => {
          const dateComparison = fishA.date.getTime() - fishB.date.getTime();
          if (dateComparison === 0) {
            // If the dates are equal, compare by size
            return fishA.size - fishB.size;
          } else {
            // Otherwise, compare by date
            return dateComparison;
          }
        });
        return sortedFishes;

      default:
        return [...fishes];
    }
  };
