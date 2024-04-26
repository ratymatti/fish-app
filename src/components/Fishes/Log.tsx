import React, { useContext, useEffect } from 'react'
import { FishContext, FishContextType } from '../../contexts/FishContext';
import FishRow from './FishRow';
import TheadRows from './TheadRows';
import useSorting, { Field, SortDirection } from '../../hooks/useSorting';
import FishCardModal from '../Modal/FishCardModal';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';

export default function Log(): JSX.Element {
    const { userFishArr, selectedFish, setSelectedFish, selectFishById } = useContext(FishContext) as FishContextType;

    const { sortByField } = useSorting();

    const { modalRef, openModal, closeModal } = useModal();

    function handleOpenCard(fishID: string) {
        selectFishById(fishID);
        openModal();
    }

    function handleCloseCard() {
        setSelectedFish(null);
        closeModal();
    }

    useEffect(() => {
        sortByField(Field.DATE, SortDirection.DESC);
    }, []);

    return (
        <>
            <Modal ref={modalRef}>
                {selectedFish && <FishCardModal onClose={handleCloseCard} cardFish={selectedFish} />}
            </Modal>
            <div className='bg-neutral-800 border border-neutral-700 w-5/6 h-1/2 flex items-start justify-center'>
                <table className='bg-neutral-800 text-neutral-200 text-s w-screen overflow-scroll border-separate border-spacing-2 border border-neutral-700'>
                    <thead>
                        <TheadRows />
                    </thead>
                    <tbody>
                        {userFishArr.slice(0).reverse().map(fish => (
                            <FishRow
                                key={fish.id}
                                fish={fish}
                                handleFishRowClick={() => handleOpenCard(fish.id)} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

