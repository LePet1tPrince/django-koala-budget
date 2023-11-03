import react, { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateController from './DateController';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function DateRangePicker({value, setValue}) {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Start Date"
          value={value[0]}
          onChange={(newValue) => setValue([newValue, value[1]])}
        />
        <DatePicker
          label="End Date"
          value={value[1]}
          onChange={(newValue) => setValue([value[0],newValue])}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}