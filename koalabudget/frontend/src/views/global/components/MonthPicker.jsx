import * as React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function DatePickerViews({date, setDate}) {

    function handleDateChange(newDate) {
        setDate(newDate);
        console.log(newDate)
    }

    function handleMoveRight() {
      setDate(dayjs(new Date(date.$y,date.$M+1,date.$D)))
    }

    function handleMoveLeft() {
      setDate(dayjs(new Date(date.$y,date.$M-1,date.$D)))

    }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        
        <DatePicker 
        label={'Month'} 
        views={['year','month']}
        openTo="month"
        value={date}
        onChange={handleDateChange} 
        defaultValue={dayjs(new Date())}
        // renderInput={(params) => <TextField {...params} />}
        />
        <Button variant="outlined" color="inherit" onClick={handleMoveLeft}><ChevronLeftIcon fontSize='large'/></Button>
        <Button variant="outlined" color="inherit" onClick={handleMoveRight}><ChevronRightIcon fontSize='large'/></Button>

      </DemoContainer>
    </LocalizationProvider>
  );
}
