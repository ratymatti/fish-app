import React, { useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import DatePicker from "react-datepicker";
import Textarea from 'rc-textarea';
import "react-datepicker/dist/react-datepicker.css";
import './Add.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import validateForm from '../../modules/validateForm/validateForm';
import { optionsSpecies, optionsWater } from '../../modules/options/options';
import { FishContext, FishContextType } from '../../contexts/FishContext';
import { CreateFishContext, CreateFishContextType } from '../../contexts/CreateFishContext';
import { CurrentState } from '../AddContainer/AddContainer';
import { LocationObject } from '../../types/location';


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
    fishGeolocation: LocationObject[];
    setCurrent: (current: CurrentState) => void;
    setFishGeolocation: (fishGeolocation: LocationObject[]) => void;
    setError: (error: string) => void;
}

type OptionTypeString = {
    label: string;
    value: string;
}

type OptionTypeNumber = {
    label: string;
    value: number;
}

enum FishRef {
    FISHES = 'fishes'
}

const styleOptions = {
    option: (styles) => ({ ...styles, color: 'black' })
};

export default function Add(props : AddProps): JSX.Element {
    const {
        fishGeolocation, setCurrent,
        setFishGeolocation, setError
    } = props;

    const {
        geolocation, setGeolocation, 
        catchDate, setCatchDate,
        species, setSpecies,
        cm, setCm,
        water, setWater,
        setComment, createFish } = React.useContext(CreateFishContext) as CreateFishContextType;

    const { getDocuments } = React.useContext(FishContext) as FishContextType;

    const fishesRef = collection(db, FishRef.FISHES);

    async function handleSubmit(event: React.FormEvent<HTMLButtonElement>): Promise<void>{
        event.preventDefault();

        const errorMessage = validateForm({species, cm, water, geolocation});
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setCurrent(CurrentState.Loading);

        try {
            const newFish = createFish();
            await addDoc(fishesRef, newFish) 
        } catch (err) {
            console.error(err);
        }
        
        setCurrent(CurrentState.Map);
        getDocuments();
        setFishGeolocation([]);
    }

    useEffect(() => {
        if (fishGeolocation.length) {
            setGeolocation({
                lat: fishGeolocation[0].geolocation.lat,
                lng: fishGeolocation[0].geolocation.lng
            });
        }
    }, [fishGeolocation]);

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

