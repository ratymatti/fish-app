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

const optionsRiver = [
    { value: 'Kitkajoki', label: 'Kitkajoki' },
    { value: 'Kuusinkijoki', label: 'Kuusinkijoki' },
    { value: 'Byske', label: 'Byske' },
    { value: 'Kemijoki', label: 'Kemijoki' },
    { value: 'Ounasjoki', label: 'Ounasjoki' },
];

const optionsCm = [];

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

    const {
        addFish,
        fishGeolocation,
        getCurrentLocation,
        setCurrent,
        setFishGeolocation,
    } = props;

    async function handleSubmit(event) {
        event.preventDefault();
        const errorMessage = validateForm();

        if (errorMessage) {
            setError(errorMessage);
            return;
        } else {
            const fish = createFish();

            setCurrent('loading');
            addFish(fish);
            await getCurrentLocation();
            setFishGeolocation([]);
            setCurrent('map');
        }    
    };

    function validateForm() {
        if (!species) {
            return 'Species is required.';
        } else if (!cm || isNaN(cm) || cm <= 0) {
            return 'Cm must be greater than 0.';
        } else if (!river) {
            return 'River is required.';
        } else if (!fishGeolocation) {
            return 'Location is required.';
        } else {
            return null;
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
                lat: fishGeolocation[0].location.lat,
                lng: fishGeolocation[0].location.lng
               }    
        }
    };

    const styles = {
        color: 'black'
    }

    return (
        <div className='add'>
            <form>
                <Select
                    className='options'
                    options={optionsSpecies}
                    placeholder='Species'
                    styles={styles}
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

