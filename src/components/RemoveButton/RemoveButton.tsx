import React, { useState } from 'react';
import './RemoveButton.css';
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
        <div className='remove-button'>
            <div className='trash-button'>
                {clicked === false && <BsTrash
                    onClick={() => setClicked(true)} />}
            </div>
            {clicked && (
                <div className='remove-buttons'>
                    <p>Are you sure?</p>
                    <button onClick={() => handleClick(content.id)}>
                        Yes
                    </button>
                    <button onClick={() => setClicked(false)}>
                        No
                    </button>
                </div>
            )}
        </div>
    )
}

