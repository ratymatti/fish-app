import { useState, useEffect } from "react";

function useCreateFish() {
    const [species, setSpecies] = useState(null);
    const [cm, setCm] = useState(0);
    const [water, setWater] = useState(null);
    const [catchDate, setCatchDate] = useState();
    const [comment, setComment] = useState('');

    return {
        species, setSpecies,
        cm, setCm,
        water, setWater,
        catchDate, setCatchDate,
        comment, setComment
    }
}

export default useCreateFish;