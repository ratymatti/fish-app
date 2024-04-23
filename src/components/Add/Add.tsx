import React, { useContext, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import DatePicker from "react-datepicker";
import Textarea from 'rc-textarea';
import "react-datepicker/dist/react-datepicker.css";
import './Add.css';
import validateForm from '../../modules/validateForm/validateForm';
import { optionsSpecies, optionsWater } from '../../modules/options/options';
import { CreateFishContext, CreateFishContextType, initialFishData } from '../../contexts/CreateFishContext';
import { CurrentState } from '../AddContainer/AddContainer';
import { LocationObject } from '../../types/location';
import { useSaveFish } from '../../hooks/useSaveFish';
import { FishContext, FishContextType } from '../../contexts/FishContext';
import { optionsCm } from '../../modules/options/optionsCm';
import { AppStateContext, AppStateContextType } from '../../contexts/AppStateContext';
import Button from '../Button/Button';

interface AddProps {
    fishGeolocation: LocationObject[];
    setCurrent: (current: CurrentState) => void;
    setFishGeolocation: (fishGeolocation: LocationObject[]) => void;
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

export default function Add({ fishGeolocation, setFishGeolocation, setCurrent }: AddProps): JSX.Element {
    const { newFishData, setNewFishData } = useContext(CreateFishContext) as CreateFishContextType;
    const { updateUserFishArr } = useContext(FishContext) as FishContextType;
    const { setError } = useContext(AppStateContext) as AppStateContextType

    const { saveFishData } = useSaveFish();

    async function handleSubmit(event: React.FormEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        const errorMessage = validateForm(newFishData);

        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setCurrent(CurrentState.Loading);

        if (newFishData.date instanceof Date) setNewFishData({ ...newFishData, date: newFishData.date.toISOString() });

        try {
            const savedFish = await saveFishData(newFishData);
            updateUserFishArr(savedFish);
            setNewFishData(JSON.parse(JSON.stringify(initialFishData)));
        } catch (err) {
            console.error(err);
        }

        setCurrent(CurrentState.Map);
        setFishGeolocation([]);
    }

    useEffect(() => {
        if (fishGeolocation.length) {
            setNewFishData({
                ...newFishData, geolocation: {
                    lat: fishGeolocation[0].geolocation.lat,
                    lng: fishGeolocation[0].geolocation.lng
                }
            });
        }
    }, [fishGeolocation]);

    return (
        <div className='add'>
            <form>
                <div className='select'>
                    <DatePicker
                        className='date-option'
                        selected={newFishData.date}
                        placeholderText='Select date'
                        dateFormat="dd/MM/yyyy"
                        onChange={(date: Date) => setNewFishData({ ...newFishData, date })} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsSpecies}
                        placeholder='Select species'
                        styles={styleOptions}
                        onChange={(selectedSpecies: SingleValue<OptionTypeString>) => {
                            if (selectedSpecies && selectedSpecies.value) setNewFishData({ ...newFishData, species: selectedSpecies.value });
                        }} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsCm}
                        placeholder='Select lenght'
                        styles={styleOptions}
                        onChange={(length: SingleValue<OptionTypeNumber>) => {
                            if (length && length.value) setNewFishData({ ...newFishData, length: length.value });
                        }} />
                </div>
                <div className='select'>
                    <Select
                        className='options'
                        options={optionsWater}
                        placeholder='Select location name'
                        styles={styleOptions}
                        onChange={(selectedLocationName: SingleValue<OptionTypeString>) => {
                            if (selectedLocationName && selectedLocationName.value) setNewFishData({ ...newFishData, locationName: selectedLocationName.value });
                        }} />
                </div>
                <div className='select'>
                    <Textarea
                        className='comment-option'
                        onChange={(e) => setNewFishData({ ...newFishData, comment: e.target.value })}
                        placeholder={"Add a comment..."}
                        autoSize={{ minRows: 5 }} />
                </div>
                <div className='mt-2 flex justify-center'>
                    <Button onClick={handleSubmit}>
                        {'Submit'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

