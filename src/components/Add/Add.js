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
import { optionsSpecies, optionsWater } from '../../modules/options/options.js';
import { FishContext } from '../../contexts/FishContext';


const optionsCm = [];

function addCmOptions() {
    for (let i = 10; i <= 150; i++) {
        optionsCm.push({ value: i, label: `${i} cm` })
    }
}

addCmOptions();

export default function Add(props) {
    const {
        fishGeolocation, getCurrentLocation,
        setCurrent, setFishGeolocation,
        setError
    } = props;

    const [species, setSpecies] = useState(null);
    const [cm, setCm] = useState(0);
    const [water, setWater] = useState(null);
    const [catchDate, setCatchDate] = useState(new Date());
    const [comment, setComment] = useState('');

    const { getDocuments } = React.useContext(FishContext);

    const fishesRef = collection(db, "fishes");

    async function handleSubmit(event) {
        event.preventDefault();

        const errorMessage = validateForm(species, cm, water, fishGeolocation);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setCurrent('loading');
        try {
            const newFish = await createFish(species, cm, water, catchDate, comment, fishGeolocation);
            await Promise.all([
                addDoc(fishesRef, newFish),
                getDocuments(),
                getCurrentLocation()
            ]);
        } catch (err) {
            console.error(err);
        }
        setFishGeolocation([]);
        setCurrent('map');
    }

    const styleOptions = {
        option: (styles) => ({ ...styles, color: 'black' })
    };

    const placeholder = "Add comment...";

    return (
        <div className='add'>
            <form>
                <div className='select'>
                    <DatePicker
                        className='date-option'
                        selected={catchDate}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => setCatchDate(date)} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsSpecies}
                        placeholder='Species'
                        styles={styleOptions}
                        onChange={(selectedSpecies) => setSpecies(selectedSpecies.value)} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsCm}
                        placeholder='cm'
                        styles={styleOptions}
                        onChange={(selectedCm) => setCm(selectedCm.value)} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsWater}
                        placeholder='Water'
                        styles={styleOptions}
                        onChange={(selectedWater) => setWater(selectedWater.value)} />
                </div>
                <div className='select'>
                    <Textarea
                        className='comment-option'
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={placeholder}
                        autoSize={{ minRows: 5 }} />
                </div>
                <div className='select'>
                    <div className='submit'>
                        <button
                            className='submit-button'
                            type='submit'
                            onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

