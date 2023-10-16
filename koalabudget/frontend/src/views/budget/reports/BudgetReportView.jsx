import React, { useState, useEffect } from 'react';
import BudgetTable from './BudgetTable';
import { getAccounts } from '../../global/apiRequests/account';
import NewMonthGenerator from './NewMonthGenerator';
import useFetch from '../../global/apiRequests/useFetch';

function BudgetReport({ budget, budgetByMonth, selectedMonth, setBudget }) {
  // const [ incomeBudget, setIncomeBudget ] = useState();
  // const [ expenseBudget, setExpenseBudget ] = useState();

  // useEffect(() =>{
  //   console.log("change budget")
  //   setIncomeBudget(budget?.filter(entry => entry.category.type === "Income"))
  //   setExpenseBudget(budget?.filter(entry => entry.category.type === "Expense"))

  // },[budget])

  // useEffect(() => {
  //   NewMonthButton({ selectedMonth, budget, setBudget})
  // }, [selectedMonth, budget])

  
  
  // console.log("incomeBudget", JSON.stringify(incomeBudget))
  return (
    <div>
      {/* {JSON.stringify(budget)} */}
      {/* {JSON.stringify(incomeBudget)} */}
      <NewMonthGenerator selectedMonth={selectedMonth} budget={budget} setBudget={setBudget}/>
      <h3>Income</h3>
        <BudgetTable budget={budget} budgetThisMonth={budgetByMonth} setBudget={setBudget} tableType="income"/>
      <h3>Expenses</h3>
        <BudgetTable budget={budget} budgetThisMonth={budgetByMonth} setBudget={setBudget} tableType="expense"/>
        </div>
  )
}

export default BudgetReport