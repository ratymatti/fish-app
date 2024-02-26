import React, { useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import DatePicker from "react-datepicker";
import Textarea from 'rc-textarea';
import "react-datepicker/dist/react-datepicker.css";
import './Add.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import validateForm from '../../modules/validateForm/validateForm.js';
import { optionsSpecies, optionsWater } from '../../modules/options/options.js';
import { FishContext, FishContextType } from '../../contexts/FishContext';
import { CreateFishContext, CreateFishContextType } from '../../contexts/CreateFishContext';


const optionsCm: ValueLabelPair[] = [];

function addCmOptions() {
    for (let i = 10; i <= 150; i++) {
        optionsCm.push({ value: i, label: `${i} cm` })
    }
}

addCmOptions();

interface ValueLabelPair {
    value: number;
    label: string;
}

interface AddProps {
    fishGeolocation: { location: { lat: number, lng: number } }[];
    setCurrent: (current: string) => void;
    setFishGeolocation: (fishGeolocation: any) => void;
    setError: (error: string) => void;
}

type OptionTypeString = {
    label: string | null | undefined;
    value: string | null | undefined;
}

type OptionTypeNumber = {
    label: string | null | undefined;
    value: number | null | undefined;
}

export default function Add(props : AddProps) {
    const {
        fishGeolocation, setCurrent,
        setFishGeolocation, setError
    } = props;

    const {
        location, setLocation, 
        catchDate, setCatchDate,
        species, setSpecies,
        cm, setCm,
        water, setWater,
        setComment, createFish
    } = React.useContext(CreateFishContext) as CreateFishContextType;

    const { getDocuments } = React.useContext(FishContext) as FishContextType;

    const fishesRef = collection(db, "fishes");

    async function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();

        const errorMessage = validateForm(species, cm, water, location);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setCurrent('loading');

        try {
            const newFish = createFish();
            await addDoc(fishesRef, newFish) 
        } catch (err) {
            console.error(err);
        }
        
        setCurrent('map');
        getDocuments();
        setFishGeolocation([]);
    }

    useEffect(() => {
        if (fishGeolocation.length) {
            setLocation({
                lat: fishGeolocation[0].location.lat,
                lng: fishGeolocation[0].location.lng
            });
        }
    }, [fishGeolocation]);

    const styleOptions = {
        option: (styles) => ({ ...styles, color: 'black' })
    };


    return (
        <div className='add'>
            <form>
                <div className='select'>
                    <DatePicker
                        className='date-option'
                        selected={catchDate}
                        placeholderText='Select date'
                        dateFormat="dd/MM/yyyy"
                        onChange={(date: Date) => setCatchDate(date)} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsSpecies}
                        placeholder='Select species'
                        styles={styleOptions}
                        onChange={(selectedSpecies: SingleValue<OptionTypeString>) => {
                            if (selectedSpecies && selectedSpecies.value) setSpecies(selectedSpecies.value);
                        }} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsCm}
                        placeholder='Select lenght'
                        styles={styleOptions}
                        onChange={(selectedCm: SingleValue<OptionTypeNumber>) => {
                            if (selectedCm && selectedCm.value) setCm(selectedCm.value);
                        }} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsWater}
                        placeholder='Select location name'
                        styles={styleOptions}
                        onChange={(selectedWater: SingleValue<OptionTypeString>) => {
                            if (selectedWater && selectedWater.value) setWater(selectedWater.value);
                        }} />
                </div>
                <div className='select'>
                    <Textarea
                        className='comment-option'
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={"Add a comment..."}
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

