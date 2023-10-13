import React, { useState } from 'react';
import './RemoveButton.css';
import { BsTrash } from 'react-icons/bs';

export default function RemoveButton({ removeTracking, content }) {
    const [clicked, setClicked] = useState(false);

    function handleClick(id) {
      removeTracking(id);
      setClicked(false);  
    }

  return (
    <div className='remove-button'>
      <div className='trash-button'>
        {clicked === false && <BsTrash
                                  onClick={() => setClicked(true)} /> }
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

