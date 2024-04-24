import React, { useState } from 'react';
import { BsTrash } from 'react-icons/bs';

interface RemoveButtonProps {
    content: {
        header: string;
        info: { text: string; value: string }[];
        id: string;
        icon: string;
    };
    removeFromTracking: (id: string) => void;
}

export default function RemoveButton(props: RemoveButtonProps): JSX.Element {
    const { content, removeFromTracking } = props;

    const [clicked, setClicked] = useState<boolean>(false);

    function handleClick(currentID: string) {
        removeFromTracking(currentID);
        setClicked(false);
    }

    return (
        <div className='flex items-center p-2 uppercase text-xs'>
            <div className='hover:cursor-pointer'>
                {clicked === false && <BsTrash
                    onClick={() => setClicked(true)} />}
            </div>
            {clicked && (
                <>
                    <p className='mr-2 text-orange-400'>Are you sure?</p>
                    <button className='mx-1 uppercase transition ease-in-out delay-100 hover:-translate-y-1 hover:text-orange-400 hover:scale-110 duration-100' onClick={() => handleClick(content.id)}>
                        Yes
                    </button>
                    <button className='mx-1 uppercase transition ease-in-out delay-100 hover:-translate-y-1 hover:text-orange-400 hover:scale-110 duration-100' onClick={() => setClicked(false)}>
                        No
                    </button>
                </>

            )}
        </div>
    )
}

