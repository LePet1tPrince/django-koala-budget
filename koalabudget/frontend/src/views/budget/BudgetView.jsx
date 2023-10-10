import React, { useState, useEffect } from 'react';
import { getBudgets, getBudgetByMonth } from '../global/apiRequests/budget';
import MonthPicker from '../global/MonthPicker';
import BudgetTable from './reports/BudgetTable';
import BudgetReportView from './reports/BudgetReportView';
import { useSearchParams } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import DashboardView from './dashboard/DashboardView';
import { Button } from '@mui/material';
import BudgetToggle from './BudgetToggle';
import dayjs from 'dayjs';
import useFetch from '../global/apiRequests/useFetch';




function BudgetView() {
    // const [budget, setBudget] = useState();
    const [ budget, setBudget, isBudgetLoading, isBudgetError] = useFetch(`/budget/`)

    const [date, setDate] = useState(dayjs(new Date()));
    // const [alignment, setAlignment] = useState('report');
    const [searchParams, setSearchParams] = useSearchParams({view: "report"})
    const view = searchParams.get('view')

    // useEffect(() => {
    //     getBudgets(setBudget);

    // },[])

    useEffect(() => {
        if (date) {
            getBudgetByMonth(setBudget, date.$y, date.$M + 1)
        } 
    }, [date])


  return (
    <div>
        <h1>Budget</h1>
        <BudgetToggle alignment={searchParams} setAlignment={setSearchParams}/>
        <MonthPicker date={date} setDate={setDate}/>

        {isBudgetLoading?
            <div>...Loading...</div>:
            isBudgetError?
                <div>ERROR</div> :
                view === "report"?
                    <BudgetReportView budget={budget} selectedMonth={date} />:
                    <DashboardView date={date} setDate={setDate} />}


    </div>
  )
}

export default BudgetView