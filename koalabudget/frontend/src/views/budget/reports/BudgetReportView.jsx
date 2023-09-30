import React, { useState, useEffect } from 'react';
import BudgetTable from './BudgetTable';
// import AccountsBudgetTable from './AccountsBudgetTable';
import { getAccounts } from '../../global/apiRequests/account';

function BudgetReport({ budget }) {
  const [accounts, setAccounts] = useState();
  const incomeBudget = budget?.filter(entry => entry.category.type === "Income")
  const expense_budget = budget?.filter(entry => entry.category.type === "Expense")

  const incomeAccounts = accounts?.filter(entry => entry.type === "Income")
  const expenseAccounts = accounts?.filter(entry => entry.type === "Expense")



  useEffect(() => {
    getAccounts(setAccounts)
  },[]);


  if (budget) {
  return (

    <div>
      {/* <AccountsBudgetTable accounts={incomeAccounts}/> */}
      {/* {JSON.stringify(accounts)} */}
      <h3>Income</h3>
        <BudgetTable budget={incomeBudget}/>
      <h3>Expenses</h3>
        <BudgetTable budget={expense_budget}/>

    </div>
  )}
}

export default BudgetReport