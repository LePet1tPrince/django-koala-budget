import React, { useState } from 'react';

import DateController from './DateController';
import DateRangePicker from './DateRangePicker';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';

function ReportsView() {
  const [value, setValue] = useState([dayjs('2022-04-17'),dayjs('2022-04-17')]);

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
    </div>
  )
}

export default ReportsView