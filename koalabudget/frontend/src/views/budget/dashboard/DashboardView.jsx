import React, { useState, useEffect } from 'react';
import data from './BarChatdata.json';
import BarChart from './BarChart';
import { getTransactions, ConvertTransactionsBTF } from '../../global/apiRequests/transaction';
import { getBarData } from '../../global/apiRequests/dashboard';
// import MonthPicker from '../global/MonthPicker';


function DashboardView({ date, setDate}) {
    const [incomeBarData, setIncomeBarData] = useState();
    const [expenseBarData, setExpenseBarData] = useState();
    // const [date, setDate] = useState();


    useEffect(() => {
        if (date) {
        getBarData(setIncomeBarData,"income", date.$y, date.$M + 1);
        getBarData(setExpenseBarData,"expense", date.$y, date.$M + 1);
        }

    }, [date])


  return (
    <div style={{height:"800px"}}>
        {/* <MonthPicker date={date} setDate={setDate}/> */}
        <h1>Income</h1>
        <div style={{height: "40%", width: "50%"}}>
            {incomeBarData?
            <BarChart data={incomeBarData} date={date}/>
            :<div>Loading</div>}
        <h1>Expenses</h1>
        {expenseBarData?
            <BarChart data={expenseBarData} date={date}/>
            :<div>Loading</div>}                    


        </div>
    </div>
  )
}

export default DashboardView