import React, { useState, useEffect } from 'react';
import { getBudgets, getBudgetByMonth } from '../global/apiRequests/budget';
import MonthPicker from './MonthPicker';
import BudgetTable from './BudgetTable';



function BudgetView() {
    const [budget, setBudget] = useState();
    const [date, setDate] = useState();

    useEffect(() => {
        getBudgets(setBudget);

    },[])

    useEffect(() => {
        if (date) {
            getBudgetByMonth(setBudget, date.$y, date.$M + 1)
        } else {
            
        }
    }, [date])


  return (
    <div>
        <h1>Budget</h1>
        <MonthPicker date={date} setDate={setDate}/>
        <BudgetTable budget={budget}/>
        {/* {JSON.stringify(budget)} */}


    </div>
  )
}

export default BudgetView