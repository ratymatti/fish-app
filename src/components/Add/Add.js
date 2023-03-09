import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const optionsSpecies = [
    { value: 'trout', label: 'Trout' },
    { value: 'salmon', label: 'Salmon' },
    { value: 'grayling', label: 'Grayling' },
    { value: 'rainbowtrout', label: 'Rainbowtrout'}
];

const optionsCm = [];

const optionsRiver = [
    {value: 'Kitkajoki', label: 'Kitkajoki'},
    {value: 'Kuusinkijoki', label: 'Kuusinkijoki'},
];

function addCmOptions() {
    for (let i = 1; i < 201; i++) {
        optionsCm.push({value: i, label: i + ' cm'})
    }
}

addCmOptions()

export default function Add(props) {
    const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='add'>
        <form>
            <Select 
                options={optionsSpecies}
                placeholder='Species' />
            <Select
                options={optionsCm}
                placeholder='cm' />
            <Select
                options={optionsRiver}
                placeholder='River' />
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />         
        </form>
    </div>
  )
}

