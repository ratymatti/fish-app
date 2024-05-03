import React, { useContext, useEffect } from 'react';
import { CreateFishContext, CreateFishContextType } from '../../contexts/CreateFishContext';
import { CurrentState } from './AddContainer';
import { LocationObject } from '../../types/location';
import BasicDateCalendar from '../Main/BasicDateCalendar';
import { CustomSelect } from '../Main/CustomSelect';
import CustomTextarea from '../Main/CustomTextarea';
import {
    optionsCm,
    optionsSpecies,
    optionsLocation } from '../../utils/addUtils';

interface AddProps {
    fishGeolocation: LocationObject[];
    setCurrent: (current: CurrentState) => void;
    setFishGeolocation: (fishGeolocation: LocationObject[]) => void;
}

export default function Add({ fishGeolocation }: AddProps): JSX.Element {
    const { newFishDataRef } = useContext(CreateFishContext) as CreateFishContextType;

    useEffect(() => {
        if (fishGeolocation.length) {
            newFishDataRef.current.geolocation = {
                lat: fishGeolocation[0].geolocation.lat,
                lng: fishGeolocation[0].geolocation.lng
            }
        }
    }, [fishGeolocation]);

    return (
        <form className='h-full w-full flex flex-row justify-between'>
            <div className='h-full w-1/2 mr-4'>
                <BasicDateCalendar newFishDataRef={newFishDataRef} />
            </div>
            <div className='w-1/2 h-full ml-4'>
                <div className='flex flex-col h-full'>
                    <CustomSelect
                        options={optionsSpecies}
                        refKey='species'
                        newFishDataRef={newFishDataRef}
                         />
                    <CustomSelect
                        options={optionsCm}
                        refKey='length'
                        newFishDataRef={newFishDataRef}
                         />
                    <CustomSelect                        
                        options={optionsLocation}
                        refKey='location'
                        newFishDataRef={newFishDataRef}
                         />
                    <CustomTextarea newFishDataRef={newFishDataRef} />
                </div>
            </div>
        </form>
    )
}

