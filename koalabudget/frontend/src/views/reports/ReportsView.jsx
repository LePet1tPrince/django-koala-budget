import React, { useState } from 'react';

import DateController from './DateController';
import DateRangePicker from './DateRangePicker';
import Grid from '@mui/material/Grid';
import ReportPage from './ReportPage';
import ReportTable from './ReportTable'
import dayjs from 'dayjs';
import useFetch from '../global/customHooks/useFetch.js';

function ReportsView() {
  const [value, setValue] = useState([dayjs('2023-04-17'),dayjs('2023-05-17')]);
  const [ data, setData, isDataLoading, isDataError] = useFetch(`/reports/${value[0].format("YYYY-MM-DD")}/${value[1].format("YYYY-MM-DD")}`)
  const reportTypes = {PNL: "Income v Expense", BS: "Net Worth"}
//   accounts, selectedAccountId, setSelectedAccountId
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
        <ReportPage/>
        {/* <ReportTable data={data} reportType={reportTypes.PNL}/> */}
        {/* {JSON.stringify(data)} */}
    </div>
  )
}

export default ReportsView