import React, { useState } from 'react';

import BudgetReportView from './reports/BudgetReportView';
import BudgetToggle from './BudgetToggle';
import DashboardView from './dashboard/DashboardView';
import MonthPicker from '../global/components/MonthPicker';
import dayjs from 'dayjs';
import useFetch from '../global/customHooks/useFetch';
import { useSearchParams } from 'react-router-dom';

function BudgetView() {
    const [ budget, setBudget, isBudgetLoading, isBudgetError] = useFetch(`/budget/`)

    //selectedMonth is in the dayjs format
    const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()));
    // const [searchParams, setSearchParams] = useSearchParams({view: "report"})
    // const view = searchParams.get('view')
    const [alignment, setAlignment] = useState('report')

    const monthBudget = budget?.filter(item => item.month.slice(0,7) === selectedMonth.format("YYYY-MM"))
    // console.log(JSON.stringify(budgetByMonth))


  return (
    <div>
        <h1>Budget</h1>
        {/* <BudgetToggle alignment={searchParams} setAlignment={setSearchParams}/> */}
        <BudgetToggle alignment={alignment} setAlignment={setAlignment}/>

        <MonthPicker date={selectedMonth} setDate={setSelectedMonth}/>
        {/* {JSON.stringify(budgetByMonth)} */}

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