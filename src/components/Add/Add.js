import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import Textarea from 'rc-textarea';
import "react-datepicker/dist/react-datepicker.css";
import './Add.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import createFish from '../../modules/createFish/createFish.js';
import validateForm from '../../modules/validateForm/validateForm.js';

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
    const [comment, setComment] = useState('');

    const {
        getDocuments,
        fishGeolocation,
        getCurrentLocation,
        setCurrent,
        setFishGeolocation,
    } = props;

    const fishesRef = collection(db, "fishes");

    async function handleSubmit(event) {
        event.preventDefault();
        const errorMessage = validateForm(species, cm, water, fishGeolocation);

        if (errorMessage) {
            setError(errorMessage);
            return;
        } else {

            setCurrent('loading');
            
            try {
                const newFish = await createFish(species, cm, water, catchDate, comment, fishGeolocation);
                await addDoc(fishesRef, newFish);
            } catch(err) {
                console.error(err);
            }

            getDocuments();
            await getCurrentLocation();
            setFishGeolocation([]);
            setCurrent('map');
        }    
    }


    const styleOptions = {
        option: (styles) => ({...styles, color: 'black'})
    };

    const placeholder = "Add comment...";

    return (
        <div className='add'>
            <form>
                <DatePicker
                    className='options'
                    selected={catchDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setCatchDate(date)} />
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
                <Textarea
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={placeholder}
                    autoSize={{minRows: 5}} />
            <div className='submit'>
                <button
                    type='submit'
                    onClick={handleSubmit}>Submit</button>
            </div>        
                
            </form>
            {error && <div className="error">
                {error}<br></br>
                <button onClick={() => setError('')}>Close</button>
            </div>}
        </div>
    )
};

