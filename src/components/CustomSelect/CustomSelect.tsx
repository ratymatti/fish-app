import React from 'react';
import Select from 'react-select';
import { OptionTypeNumber, OptionTypeString, SingleValueOptionType, styleOptions } from '../../utils/addUtils';

interface CustomSelectProps {
    value: string | number | null;
    options: OptionTypeString[] | OptionTypeNumber[];
    placeholder: string;
    onChange: (value: SingleValueOptionType) => void;
}

export const CustomSelect = ({ value, options, placeholder, onChange }: CustomSelectProps) => (
    <Select
        value={value ? { value, label: typeof value === 'number' ? `${value} cm` : value } : null}
        options={options}
        placeholder={placeholder}
        styles={styleOptions}
        components={{ IndicatorSeparator: () => null }}
        onChange={onChange}
    />
);