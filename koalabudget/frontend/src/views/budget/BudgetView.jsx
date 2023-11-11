import React, { useState } from 'react';

import BudgetAvailableCard from './reports/BudgetAvailableCard';
import BudgetReportView from './reports/BudgetReportView';
import BudgetToggle from './BudgetToggle';
import DashboardView from './dashboard/DashboardView';
import Grid from '@mui/material/Grid';
import MonthPicker from '../global/components/MonthPicker';
import { budgetViewToggle } from './BudgetToggle';
import dayjs from 'dayjs';
import useFetch from '../global/customHooks/useFetch';
import { useSearchParams } from 'react-router-dom';

function BudgetView() {
    const [ budget, setBudget, isBudgetLoading, isBudgetError] = useFetch(`/budget/`)

    //selectedMonth is in the dayjs format
    const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()));
    // const [searchParams, setSearchParams] = useSearchParams({view: "report"})
    // const view = searchParams.get('view')
    const [alignment, setAlignment] = useState(budgetViewToggle.REPORT)

    const monthBudget = budget?.filter(item => item.month.slice(0,7) === selectedMonth.format("YYYY-MM"))


  return (
    <div>
      
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h1>Budget</h1>
          {/* <BudgetToggle alignment={searchParams} setAlignment={setSearchParams}/> */}
          <BudgetToggle alignment={alignment} setAlignment={setAlignment}/>

          <MonthPicker date={selectedMonth} setDate={setSelectedMonth}/>
          {/* {JSON.stringify(budgetByMonth)} */}

        </Grid>
        <Grid item xs={4}>
          <BudgetAvailableCard monthBudget={monthBudget} selectedMonth={selectedMonth}/>

        </Grid>

      </Grid>

        {isBudgetLoading?
            <div>...Loading...</div>:
            isBudgetError?
                <div>ERROR</div> :
                alignment === "report"?
                    <BudgetReportView budget={budget} monthBudget={monthBudget} selectedMonth={selectedMonth} setBudget={setBudget} />:
                    <DashboardView date={selectedMonth} setDate={setSelectedMonth} />}


    </div>
  )
}

export default BudgetView