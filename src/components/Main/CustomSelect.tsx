import React, { MutableRefObject, useEffect, useState } from 'react';
import Select from 'react-select';
import { OptionTypeNumber, OptionTypeString, SingleValueOptionType, styleOptions } from '../../utils/addUtils';
import { NewFishObject } from '../../types/fish';

interface CustomSelectProps {
    options: OptionTypeString[] | OptionTypeNumber[];
    refKey: string;
    newFishDataRef: MutableRefObject<NewFishObject>;
}

export const CustomSelect = ({ options, refKey, newFishDataRef }: CustomSelectProps) => {
    const initialValue = newFishDataRef.current[refKey];
    const [value, setValue] = useState<string | number | null>(initialValue);

    const placeholder: string = `Set ${refKey}`;

    function handleChange(selectedOption: SingleValueOptionType) {
        if (selectedOption && selectedOption.value) {
            setValue(selectedOption.value);
        }
    }

    useEffect(() => {
        if (value) {
            newFishDataRef.current[refKey] = value;
        }    
    }, [value]);

    return (
        <Select
            value={value ? { value, label: typeof value === 'number' ? `${value} cm` : value } : null}
            options={options}
            placeholder={placeholder}
            styles={styleOptions}
            components={{ IndicatorSeparator: () => null }}
            onChange={handleChange}
        />
    )
}

