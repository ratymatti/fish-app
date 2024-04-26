import React, { useContext, useEffect } from 'react';
import Textarea from 'rc-textarea';
import { CreateFishContext, CreateFishContextType } from '../../contexts/CreateFishContext';
import { CurrentState } from './AddContainer';
import { LocationObject } from '../../types/location';
import BasicDateCalendar from '../Main/BasicDateCalendar';
import {
    optionsCm,
    optionsSpecies,
    optionsLocation,
    SingleValueOptionType
} from '../../utils/addUtils';
import { CustomSelect } from '../Main/CustomSelect';

interface AddProps {
    fishGeolocation: LocationObject[];
    setCurrent: (current: CurrentState) => void;
    setFishGeolocation: (fishGeolocation: LocationObject[]) => void;
}

export default function Add({ fishGeolocation }: AddProps): JSX.Element {
    const { newFishData, setNewFishData } = useContext(CreateFishContext) as CreateFishContextType;

    function handleDateChange(date: Date): void {
        setNewFishData({ ...newFishData, date });
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
        <form className='h-full w-full flex flex-row justify-between'>
            <div className='h-full w-1/2 mr-4'>
                <BasicDateCalendar onDateChange={handleDateChange} />
            </div>
            <div className='w-1/2 h-full ml-4'>
                <div className='flex flex-col h-full'>
                    <CustomSelect
                        value={newFishData.species}
                        options={optionsSpecies}
                        placeholder='Select species'
                        onChange={(selectedSpecies: SingleValueOptionType) => {
                            if (selectedSpecies && selectedSpecies.value) {
                                setNewFishData({ ...newFishData, species: String(selectedSpecies.value) });
                            }
                        }} />
                    <CustomSelect
                        value={newFishData.length}
                        options={optionsCm}
                        placeholder='Select length'
                        onChange={(length: SingleValueOptionType) => {
                            if (length && length.value) {
                                setNewFishData({ ...newFishData, length: Number(length.value) });
                            }
                        }} />
                    <CustomSelect
                        value={newFishData.locationName}
                        options={optionsLocation}
                        placeholder='Select location name'
                        onChange={(selectedLocationName: SingleValueOptionType) => {
                            if (selectedLocationName && selectedLocationName.value) {
                                setNewFishData({ ...newFishData, locationName: String(selectedLocationName.value) })
                            }
                        }} />
                    <Textarea
                        className='bg-neutral-500 text-neutral-900 rounded p-2 h-full focus:outline-none border border-neutral-900 flex-grow textarea'
                        onChange={(e) => setNewFishData({ ...newFishData, comment: e.target.value })}
                        placeholder={"Add a comment..."} />
                </div>
            </div>
        </form>
    )
}

