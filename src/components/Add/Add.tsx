import React, { useContext, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import Textarea from 'rc-textarea';
import { CreateFishContext, CreateFishContextType } from '../../contexts/CreateFishContext';
import { CurrentState } from '../AddContainer/AddContainer';
import { LocationObject } from '../../types/location';
import BasicDateCalendar from '../BasicDateCalendar/BasicDateCalendar';
import {
    OptionTypeNumber,
    OptionTypeString,
    styleOptions,
    optionsCm,
    optionsSpecies,
    optionsLocation } from '../../utils/addUtils';   

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
                        <Select
                            options={optionsSpecies}
                            placeholder='Select species'
                            styles={styleOptions}
                            components={{
                                IndicatorSeparator: () => null
                            }}
                            onChange={(selectedSpecies: SingleValue<OptionTypeString>) => {
                                if (selectedSpecies && selectedSpecies.value) setNewFishData({ ...newFishData, species: selectedSpecies.value });
                            }} />
                        <Select
                            options={optionsCm}
                            placeholder='Select lenght'
                            styles={styleOptions}
                            components={{
                                IndicatorSeparator: () => null
                            }}
                            onChange={(length: SingleValue<OptionTypeNumber>) => {
                                if (length && length.value) setNewFishData({ ...newFishData, length: length.value });
                            }} />
                        <Select
                            className='options'
                            options={optionsLocation}
                            placeholder='Select location name'
                            styles={styleOptions}
                            components={{
                                IndicatorSeparator: () => null
                            }}
                            onChange={(selectedLocationName: SingleValue<OptionTypeString>) => {
                                if (selectedLocationName && selectedLocationName.value) setNewFishData({ ...newFishData, locationName: selectedLocationName.value });
                            }} />
                        <Textarea
                            className='bg-neutral-500 text-neutral-900 rounded p-2 h-full focus:outline-none border border-neutral-900 flex-grow textarea'
                            onChange={(e) => setNewFishData({ ...newFishData, comment: e.target.value })}
                            placeholder={"Add a comment..."}/>
                    </div>
                </div>
            </form>
    )
}

