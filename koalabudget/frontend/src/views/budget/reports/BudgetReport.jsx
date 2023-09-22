import React from 'react';
import BudgetTable from './BudgetTable';

function BudgetReport({ budget }) {
  const incomeBudget = budget?.filter(entry => entry.category.type === "Income")
  const expense_budget = budget?.filter(entry => entry.category.type === "Expense")
  if (budget) {
  return (

    <div>
      <h3>Income</h3>
        <BudgetTable budget={incomeBudget}/>
      <h3>Expenses</h3>
        <BudgetTable budget={expense_budget}/>

    </div>
  )}
}

export default BudgetReport