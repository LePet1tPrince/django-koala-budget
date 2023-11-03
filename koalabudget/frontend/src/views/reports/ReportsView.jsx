import React, { useState } from 'react';

import DateController from './DateController';
import DateRangePicker from './DateRangePicker';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import useFetch from '../global/customHooks/useFetch.js';

function ReportsView() {
  const [value, setValue] = useState([dayjs('2023-04-17'),dayjs('2023-05-17')]);
  const [ data, setData, isDataLoading, isDataError] = useFetch(`/reports/${value[0].format("YYYY-MM-DD")}/${value[1].format("YYYY-MM-DD")}`)

  return (
    <div>
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <DateController setValue={setValue}/>

            </Grid>
            <Grid item xs={8}>
                <DateRangePicker value={value} setValue={setValue}/>

            </Grid>

        </Grid>
        {JSON.stringify(data)}
    </div>
  )
}

export default ReportsView