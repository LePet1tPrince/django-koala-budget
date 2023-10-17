import BudgetTable from './BudgetTable';
import NewMonthGenerator from './NewMonthGenerator';
import React from 'react';

function BudgetReport({ budget, budgetByMonth, selectedMonth, setBudget }) {
  

  
  
  return (
    <div>
      <NewMonthGenerator selectedMonth={selectedMonth} budget={budget} setBudget={setBudget}/>
      <h3>Income</h3>
        <BudgetTable budget={budget} budgetThisMonth={budgetByMonth} tableType="income"/>
      <h3>Expenses</h3>
        <BudgetTable budget={budget} budgetThisMonth={budgetByMonth} tableType="expense"/>
        </div>
  )
}

export default BudgetReport