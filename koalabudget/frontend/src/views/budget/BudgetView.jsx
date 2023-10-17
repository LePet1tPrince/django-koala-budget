import React, { useState } from 'react';

import BudgetReportView from './reports/BudgetReportView';
import BudgetToggle from './BudgetToggle';
import DashboardView from './dashboard/DashboardView';
import MonthPicker from '../global/components/MonthPicker';
import dayjs from 'dayjs';
import useFetch from '../global/customHooks/useFetch';
import { useSearchParams } from 'react-router-dom';

function BudgetView() {
    // const [budget, setBudget] = useState();
    const [ budget, setBudget, isBudgetLoading, isBudgetError] = useFetch(`/budget/`)

    const [date, setDate] = useState(dayjs(new Date()));
    // const [alignment, setAlignment] = useState('report');
    const [searchParams, setSearchParams] = useSearchParams({view: "report"})
    const view = searchParams.get('view')

    const budgetByMonth = budget?.filter(item => item.month.slice(0,7) === date.format("YYYY-MM"))
    console.log(JSON.stringify(budgetByMonth))


  return (
    <div>
        <h1>Budget</h1>
        <BudgetToggle alignment={searchParams} setAlignment={setSearchParams}/>
        <MonthPicker date={date} setDate={setDate}/>
        {/* {JSON.stringify(budgetByMonth)} */}

        {isBudgetLoading?
            <div>...Loading...</div>:
            isBudgetError?
                <div>ERROR</div> :
                view === "report"?
                    <BudgetReportView budget={budget} budgetByMonth={budgetByMonth} selectedMonth={date} setBudget={setBudget} />:
                    <DashboardView date={date} setDate={setDate} />}


    </div>
  )
}

export default BudgetView