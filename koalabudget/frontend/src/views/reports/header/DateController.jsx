import React, { useState } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';

const dateRangeOptions = [
    {"label":"This Month", "Range": [dayjs(new Date()).startOf('month'), dayjs(new Date()).endOf('month')]},
    {"label":"Last Month", "Range": [dayjs(new Date()).subtract(1,'M').startOf('month'), dayjs(new Date()).subtract(1,'M').endOf('month')]},
    {"label":"This Year", "Range": [dayjs(new Date()).startOf('year'), dayjs(new Date()).endOf('year')]},
    {"label":"Last Year", "Range": [dayjs(new Date()).subtract(1,'y').startOf('year'), dayjs(new Date()).subtract(1,'y').endOf('year')]},


]

function DateController({setValue}) {
    const [range, setRange] = useState('Last Month');

  const handleChange = (e) => {
    setRange(e.target.value);
    setValue(dateRangeOptions.find(op => op.label == e.target.value).Range)
    console.log("value", e.target.value)
    console.log("daterangeoptions", dateRangeOptions.find(op => op.label == e.target.value).Range)
  };
  return (
    <div>
        {/* {dateRangeOptions[event.target.value]} */}
        <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Range</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={range}
          label="Date Range"
          onChange={handleChange}
        >
            {dateRangeOptions.map(item => {
                return (<MenuItem key={item.label} value={item.label}>{item.label}</MenuItem>)
            })}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
    </div>
  )
}

export default DateController