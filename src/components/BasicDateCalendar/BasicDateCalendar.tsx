// BasicDateCalendar.tsx
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';

export default function BasicDateCalendar({ onDateChange }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const jsDate = date.toDate();
        onDateChange(jsDate);
    };

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