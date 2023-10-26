import BudgetSummary from './BudgetSummary';
import BudgetTable from './BudgetTable';
import NewMonthGenerator from './NewMonthGenerator';
import React from 'react';

function BudgetReport({ budget, monthBudget, selectedMonth, setBudget }) {
  

  
  
  return (
    <div>
      <NewMonthGenerator selectedMonth={selectedMonth} budget={budget} setBudget={setBudget}/>
      <h3>Income</h3>
        <BudgetTable budget={budget} budgetThisMonth={monthBudget} tableType="income"/>
      <h3>Expenses</h3>
        <BudgetTable budget={budget} budgetThisMonth={monthBudget} tableType="expense"/>
        <BudgetSummary monthBudget={monthBudget}/>
        </div>
  )
}

export default BudgetReport