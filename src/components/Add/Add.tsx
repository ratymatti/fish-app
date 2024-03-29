import React, { useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import DatePicker from "react-datepicker";
import Textarea from 'rc-textarea';
import "react-datepicker/dist/react-datepicker.css";
import './Add.css';
import validateForm from '../../modules/validateForm/validateForm';
import { optionsSpecies, optionsWater } from '../../modules/options/options';
import { CreateFishContext, CreateFishContextType } from '../../contexts/CreateFishContext';
import { CurrentState } from '../AddContainer/AddContainer';
import { LocationObject } from '../../types/location';
import { useSaveFish } from '../../hooks/useSaveFish';
import { useIdToken } from '../../hooks/useIdToken';
import { FishContext, FishContextType } from '../../contexts/FishContext';


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
        length, setLength,
        locationName, setLocationName,
        setComment, createNewFish } = React.useContext(CreateFishContext) as CreateFishContextType;

    const { updateUserFishArr } = React.useContext(FishContext) as FishContextType;
    
    const { saveFishData } = useSaveFish();

    const { idToken } = useIdToken();

    

    async function handleSubmit(event: React.FormEvent<HTMLButtonElement>): Promise<void>{
        event.preventDefault();

        const errorMessage = validateForm({species, length, locationName, geolocation, catchDate});
        
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setCurrent(CurrentState.Loading);

        try {
            const newFish = createNewFish();
            if (idToken !== null) {
               const savedFish = await saveFishData({ idToken, newFish });
               updateUserFishArr(savedFish);
            }
            
        } catch (err) {
            console.error(err);
        }
        
        setCurrent(CurrentState.Map);
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
                            if (selectedCm && selectedCm.value) setLength(selectedCm.value);
                        }} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsWater}
                        placeholder='Select location name'
                        styles={styleOptions}
                        onChange={(selectedLocationName: SingleValue<OptionTypeString>) => {
                            if (selectedLocationName && selectedLocationName.value) setLocationName(selectedLocationName.value);
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

