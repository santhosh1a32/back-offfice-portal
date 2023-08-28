import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CustomDatePicker({
    label='Date', 
    value, className='', 
    onChangeHandler,
    disablePast
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer className={className} components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    className='custom-date-picker'
                    label={label}
                    value={value}
                    onChange={(newValue) => onChangeHandler(newValue)}
                    disablePast={disablePast}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}