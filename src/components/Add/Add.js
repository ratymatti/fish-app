import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Add.css';

const optionsSpecies = [
    { value: 'trout', label: 'Trout' },
    { value: 'salmon', label: 'Salmon' },
    { value: 'grayling', label: 'Grayling' },
    { value: 'rainbowtrout', label: 'Rainbowtrout' }
];

const optionsCm = [];

const optionsRiver = [
    { value: 'Kitkajoki', label: 'Kitkajoki' },
    { value: 'Kuusinkijoki', label: 'Kuusinkijoki' },
    { value: 'Byske', label: 'Byske' },
    { value: 'Kemijoki', label: 'Kemijoki' },
    { value: 'Ounasjoki', label: 'Ounasjoki' },
];

function addCmOptions() {
    for (let i = 10; i <= 200; i++) {
        optionsCm.push({ value: i, label: `${i} cm` })
    }
};

addCmOptions();

export default function Add(props) {
    const [species, setSpecies] = useState(null);
    const [cm, setCm] = useState(0);
    const [river, setRiver] = useState(null);
    const [catchDate, setCatchDate] = useState(new Date());
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        let errorMessage = '';

        if (!species) {
            errorMessage = 'Species is required.';
        } else if (!cm || isNaN(cm) || cm <= 0) {
            errorMessage = 'Cm must be greater than 0.';
        } else if (!river) {
            errorMessage = 'River is required.';
        } else if (!props.fishGeolocation) {
            errorMessage = 'Location is required.';
        } 
        
        if (errorMessage) {
            setError(errorMessage);
            return;
        } else {
            const fish = createFish();

            props.setLoading(true);
            props.setCurrent('loading');
            props.addFish(fish);
            await props.getCurrentLocation();
            props.setFishGeolocation([]);
            props.setLoading(false);
            props.setCurrent('map');
        }    
    };

    function createFish() {
        return {
            species: species,
            cm: cm,
            river: river,
            date: catchDate,
            id: new Date().valueOf(),
            location: {
                lat: props.fishGeolocation[0].location.lat,
                   lng: props.fishGeolocation[0].location.lng
               }    
        }
    };

    return (
        <div className='add'>
            <form>
                <Select
                    className='options'
                    options={optionsSpecies}
                    placeholder='Species'
                    onChange={(selectedSpecies) => setSpecies(selectedSpecies.value)} />
                <Select
                    className='options'
                    options={optionsCm}
                    placeholder='cm'
                    onChange={(selectedCm) => setCm(selectedCm.value)} />
                <Select
                    className='options'
                    options={optionsRiver}
                    placeholder='River'
                    onChange={(selectedRiver) => setRiver(selectedRiver.value)} />
                <DatePicker
                    className='options'
                    selected={catchDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setCatchDate(date)} />
                <button
                    type='submit'
                    onClick={handleSubmit}>Submit</button>
            </form>
            {error && <div className="error">
                {error}<br></br>
                <button onClick={() => setError('')}>Close</button>
            </div>}
        </div>
    )
};

