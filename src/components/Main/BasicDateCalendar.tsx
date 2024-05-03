// BasicDateCalendar.tsx
import * as React from 'react';
import { MutableRefObject, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { NewFishObject } from '../../types/fish';

interface BasicDateCalendarProps {
    newFishDataRef: MutableRefObject<NewFishObject>;
}

export default function BasicDateCalendar({ newFishDataRef }: BasicDateCalendarProps) {
    const initialDate: Dayjs | null = newFishDataRef.current.date ? dayjs(newFishDataRef.current.date) : null;
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(initialDate);

    const handleDateChange = (date: Dayjs) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        if (selectedDate) {
            const jsDate: Date = selectedDate.toDate();
            newFishDataRef.current.date = jsDate;
        }
    }, [selectedDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='bg-neutral-500 h-full rounded'>
                <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    className='bg-neutral-500 max-w-full max-h-full text-neutral-900' />
            </div>
        </LocalizationProvider>
    );
}