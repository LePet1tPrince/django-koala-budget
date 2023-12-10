import { ConvertTransactionsBTF, getTransactions } from '../../global/apiRequests/transaction';
import React, { useEffect, useState } from 'react';

import BarChart from './BarChart';
import BarCharttoggle from './BarChartToggle';
import Box from '@mui/material/Box';
import ChartPie from './ChartPie';
import Grid from '@mui/material/Grid';
import data from './BarChatdata.json';
import { getBarData } from '../../global/apiRequests/dashboard';
import { toggleOptions } from './BarChartToggle';
import useFetch from '../../global/customHooks/useFetch';

function DashboardView({ date, setDate}) {
 
    const [incomeBarData, setIncomeBarData, isIncomeBarLoading, isIncomeBarError] = useFetch(`/dashboard/income/${date.$y}/${date.$M+1}`)
    const [expenseBarData, setExpenseBarData, isExpenseBarLoading, isExpenseBarError] = useFetch(`/dashboard/expense/${date.$y}/${date.$M + 1}`)
    const [alignment, setAlignment] = useState([toggleOptions.ACTUAL])
    


  return (
    <div style={{height:"800px", margin: "50px 0 0 0"}}>
        <BarCharttoggle alignment={alignment} setAlignment={setAlignment}/>

        <h1>Income</h1>
        <Box 
        style={{height: "40%", width: "80%"}}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} style={{height:"300px"}}>
            {!isIncomeBarLoading?
            <BarChart data={incomeBarData} date={date} alignment={alignment}/>
            :<div>Loading</div>}
            </Grid>
            <Grid item xs={6} style={{height:"300px"}}>
              <ChartPie/>
            </Grid>
          </Grid>

        </Box>
        <Box style={{height: "100%", width: "50%"}}>
        <h1>Expenses</h1>
        {!isExpenseBarLoading?
            <BarChart data={expenseBarData} date={date} alignment={alignment}/>
            :<div>Loading</div>}                    
        </Box>
    </div>
  )
}

export default DashboardView