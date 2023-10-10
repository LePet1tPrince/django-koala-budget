import React, { useState, useEffect } from 'react';
import BudgetTable from './BudgetTable';
import { getAccounts } from '../../global/apiRequests/account';
import NewMonthButton from './NewMonthButton';
import useFetch from '../../global/apiRequests/useFetch';

function BudgetReport({ budget, selectedMonth }) {
  const incomeBudget = budget?.filter(entry => entry.category.type === "Income")
  const expense_budget = budget?.filter(entry => entry.category.type === "Expense")

  return (
    <div>
      <NewMonthButton selectedMonth={selectedMonth}/>
      <h3>Income</h3>
        <BudgetTable budget={incomeBudget}/>
      <h3>Expenses</h3>
        <BudgetTable budget={expense_budget}/>
        </div>
  )
}

export default BudgetReport