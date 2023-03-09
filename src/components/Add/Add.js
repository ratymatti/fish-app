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
    { value: 'Kitkajoki', label: 'Kitkajoki' },
    { value: 'Kuusinkijoki', label: 'Kuusinkijoki' },
];

function addCmOptions() {
    for (let i = 1; i <= 200; i++) {
        optionsCm.push({value: i, label: i + ' cm'})
    }
}

addCmOptions()

export default function Add(props) {
    const [species, setSpecies] = useState('');
    const [cm, setCm] = useState(0);
    const [river, setRiver] = useState('');
    const [catchDate, setCatchDate] = useState(new Date());

    function handleSubmit(event) {
        event.preventDefault();
        
        const fish = {
            species: species,
            cm: cm,
            river: river,
            date: catchDate,
            id: new Date().valueOf()
        }

        props.addFish(fish);
    }

  return (
    <div className='add'>
        <form>
            <Select 
                options={optionsSpecies}
                placeholder='Species'
                onChange={(selectedSpecies) => setSpecies(selectedSpecies.value)} />
            <Select
                options={optionsCm}
                placeholder='cm'
                onChange={(selectedCm) => setCm(selectedCm.value)} />
            <Select
                options={optionsRiver}
                placeholder='River'
                onChange={(selectedRiver) => setRiver(selectedRiver.value)} />
            <DatePicker 
                selected={catchDate} 
                onChange={(date) => setCatchDate(date)} />
            <button 
                type='submit'
                onClick={handleSubmit}>Submit</button>         
        </form>
    </div>
  )
}

