import { ConvertTransactionsBTF, getTransactions } from '../../global/apiRequests/transaction';
import React, { useEffect, useState } from 'react';

import BarChart from './BarChart';
import data from './BarChatdata.json';
import { getBarData } from '../../global/apiRequests/dashboard';
import useFetch from '../../global/customHooks/useFetch';

function DashboardView({ date, setDate}) {
 
    const [incomeBarData, setIncomeBarData, isIncomeBarLoading, isIncomeBarError] = useFetch(`/dashboard/income/${date.$y}/${date.$M+1}`)
    const [expenseBarData, setExpenseBarData, isExpenseBarLoading, isExpenseBarError] = useFetch(`/dashboard/expense/${date.$y}/${date.$M + 1}`)
    


  return (
    <div style={{height:"800px"}}>
        <h1>Income</h1>
        {JSON.stringify(incomeBarData)}
        <div style={{height: "40%", width: "50%"}}>
            {!isIncomeBarLoading?
            <BarChart data={incomeBarData} date={date}/>
            :<div>Loading</div>}
        <h1>Expenses</h1>
        {!isExpenseBarLoading?
            <BarChart data={expenseBarData} date={date}/>
            :<div>Loading</div>}                    


        </div>
    </div>
  )
}

export default DashboardView