import react, { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateController from './DateController';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

export default function DateRangePicker({value, setValue}) {
  const [invalidDate, setInvalidDate] = useState(false)

  function handleStartChange(newValue) {
    if (newValue.isBefore(value[1])) {
      setValue([newValue, value[1]])
      setInvalidDate(false)
    } else {
      setInvalidDate(true)
    }

  }


  function handleEndChange(newValue) {
    if (newValue.isAfter(value[0])) {
      setValue([value[0],newValue])
      setInvalidDate(false)

    } else {
      setInvalidDate(true)
    }
  }


  return (
    <div>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Start Date"
          value={value[0]}
          onChange={(newValue) => handleStartChange(newValue)}
          // disableFuture={invalidDate}
          error={true}
          />
        <DatePicker
          label="End Date"
          value={value[1]}
          onChange={(newValue) => handleEndChange(newValue)}
          // disablePast={invalidDate}
          />
      </DemoContainer>
    </LocalizationProvider>
    {invalidDate? <Typography sx={{color: 'red'}}>Invalid Date</Typography>:null}
    </div>
  );
}