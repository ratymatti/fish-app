import React, { useEffect, useState } from 'react'
import Textarea from 'rc-textarea';

export default function CustomTextarea({ newFishDataRef }) {
    const initialValue = newFishDataRef.current.comment;
    const [value, setValue] = useState<string | null>(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    useEffect(() => {
        if (value) {
            newFishDataRef.current.comment = value;
        }
    }, [value]);

    return (
        <Textarea
            className='bg-neutral-500 text-neutral-900 rounded p-2 h-full focus:outline-none border border-neutral-900 flex-grow textarea'
            onChange={(e) => handleChange(e)}
            placeholder={"Add a comment..."}
            value={value || ''}
        />
    )
}
