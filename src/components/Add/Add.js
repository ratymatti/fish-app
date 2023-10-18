import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Add.css';
import fetchWeather from '../../modules/fetchWeather/fetchWeather';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const optionsSpecies = [
    { value: 'trout', label: 'Trout' },
    { value: 'salmon', label: 'Salmon' },
    { value: 'grayling', label: 'Grayling' },
    { value: 'rainbowtrout', label: 'Rainbowtrout' }
];

const optionsWater = [
    { value: 'Kitkajoki', label: 'Kitkajoki' },
    { value: 'Kuusinkijoki', label: 'Kuusinkijoki' },
    { value: 'Byske', label: 'Byske' },
    { value: 'Kemijoki', label: 'Kemijoki' },
    { value: 'Ounasjoki', label: 'Ounasjoki' },
    { value: 'Other', label: 'Other' },
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
    const [water, setWater] = useState(null);
    const [catchDate, setCatchDate] = useState(new Date());
    const [error, setError] = useState('');

    const {
        getDocuments,
        fishGeolocation,
        getCurrentLocation,
        setCurrent,
        setFishGeolocation,
    } = props;

    const fishesRef = collection(db, "fishes");

    async function onSubmitFish() {
        try {
            const newFish = await createFish();
            await addDoc(fishesRef, newFish);
        } catch(err) {
            console.error(err);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const errorMessage = validateForm();

        if (errorMessage) {
            setError(errorMessage);
            return;
        } else {
            const fish = await createFish();

            setCurrent('loading');
            onSubmitFish();
            getDocuments();
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
        } else if (!water) {
            return 'Water is required.';
        } else if (!fishGeolocation) {
            return 'Location is required.';
        } else {
            return null;
        }     
    };

    async function createFish() {
        const today = new Date();
        let weather;

        if (today.getDate() === catchDate.getDate()) {
            weather = await fetchWeather({
                lat: fishGeolocation[0].location.lat,
                lng: fishGeolocation[0].location.lng 
            })
        }

        
        const day = catchDate.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero
        const month = (catchDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = catchDate.getFullYear();

        const savedDate = `${day}/${month}/${year}`;
        

        return {
            species: species,
            cm: cm,
            water: water,
            date: catchDate,
            dateString: savedDate,
            id: new Date().valueOf(),
            location: {
                lat: fishGeolocation[0].location.lat,
                lng: fishGeolocation[0].location.lng
               },
            weather: weather       
        }
    };

    const styleOptions = {
        option: (styles) => ({...styles, color: 'black'})
    };

    return (
        <div className='add'>
            <form>
                <Select
                    className='options'
                    options={optionsSpecies}
                    placeholder='Species'
                    styles={styleOptions}
                    onChange={(selectedSpecies) => setSpecies(selectedSpecies.value)} />
                <Select
                    className='options'
                    options={optionsCm}
                    placeholder='cm'
                    styles={styleOptions}
                    onChange={(selectedCm) => setCm(selectedCm.value)} />
                <Select
                    className='options'
                    options={optionsWater}
                    placeholder='Water'
                    styles={styleOptions}
                    onChange={(selectedWater) => setWater(selectedWater.value)} />
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

