import React, { useState, useEffect } from 'react';
import { getBudgets, getBudgetByMonth } from '../global/apiRequests/budget';
import MonthPicker from './MonthPicker';



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
        <MonthPicker date={date} setDate={setDate}/>
        <div>{JSON.stringify(budget)}</div>
        <button onClick={() => getBudgetByMonth(setBudget,2023,8)}>August</button>
        <button onClick={() => getBudgetByMonth(setBudget,2023,9)}>September</button>


    </div>
  )
}

export default BudgetView