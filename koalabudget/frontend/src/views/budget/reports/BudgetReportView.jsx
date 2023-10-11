import React, { useState, useEffect } from 'react';
import BudgetTable from './BudgetTable';
import { getAccounts } from '../../global/apiRequests/account';
import NewMonthButton from './NewMonthButton';
import useFetch from '../../global/apiRequests/useFetch';

function BudgetReport({ budget, selectedMonth, setBudget }) {
  // const [ incomeBudget, setIncomeBudget ] = useState();
  // const [ expenseBudget, setExpenseBudget ] = useState();

  // useEffect(() =>{
  //   console.log("change budget")
  //   setIncomeBudget(budget?.filter(entry => entry.category.type === "Income"))
  //   setExpenseBudget(budget?.filter(entry => entry.category.type === "Expense"))

  // },[budget])

  const incomeBudget = budget?.filter(entry => entry.category.type === "Income")
  const expenseBudget = budget?.filter(entry => entry.category.type === "Expense")
  
  // console.log("incomeBudget", JSON.stringify(incomeBudget))
  return (
    <div>
      {/* {JSON.stringify(budget)} */}
      {/* {JSON.stringify(incomeBudget)} */}
      <NewMonthButton selectedMonth={selectedMonth} budget={budget} setBudget={setBudget}/>
      <h3>Income</h3>
        <BudgetTable budget={incomeBudget}/>
      <h3>Expenses</h3>
        <BudgetTable budget={expenseBudget}/>
        </div>
  )
}

export default BudgetReport