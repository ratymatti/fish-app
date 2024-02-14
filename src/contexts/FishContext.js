import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { sortFishes } from '../modules/sortFishes/sortFishes';

export const FishContext = React.createContext();

export function FishProvider({ children }) {
    const [fishes, setFishes] = useState([]);

    const fishesRef = collection(db, "fishes");

    async function getDocuments() {
        try {
            const data = await getDocs(fishesRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setFishes(sortFishes('date', filteredData, 'desc'));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getDocuments();
    }, []); // Empty dependency array because this needs to run only once for now

    return (
        <FishContext.Provider value={{ fishes, setFishes, getDocuments }}>
            {children}
        </FishContext.Provider>
    );
}