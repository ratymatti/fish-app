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
    removeTracking: (id: string) => void;
}

export default function RemoveButton(props: RemoveButtonProps): JSX.Element {
    const { content, removeTracking } = props;
    
    const [clicked, setClicked] = useState<boolean>(false);

    function handleClick(id: string) {
        removeTracking(id);
        setClicked(false);
    }

    return (
        <div className='remove-button'>
            <div className='trash-button'>
                {clicked === false && <BsTrash
                    onClick={() => setClicked(true)} />}
            </div>
            {clicked === true && (
                <div className='remove-buttons'>
                    <p>Are you sure?</p>
                    <button
                        onClick={() => handleClick(content.id)}>Yes</button>
                    <button
                        onClick={() => setClicked(false)}>No</button>
                </div>
            )}
        </div>
    )
}

