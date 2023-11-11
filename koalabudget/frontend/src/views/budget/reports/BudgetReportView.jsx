import BudgetAvailableCard from './BudgetAvailableCard';
import BudgetCollapsableTable from './BudgetCollapsableTable';
import BudgetSummary from './BudgetSummary';
import BudgetTable from './BudgetTable';
import NewMonthGenerator from './NewMonthGenerator';
import React from 'react';

function BudgetReport({ budget, monthBudget, selectedMonth, setBudget }) {
  

  
  
  return (
    <div>
      <NewMonthGenerator selectedMonth={selectedMonth} budget={budget} setBudget={setBudget}/>
      {/* <h3>test</h3> */}
      {/* <BudgetCollapsableTable budget={budget} budgetThisMonth={monthBudget} tableType="income"/> */}
      <h3>Income</h3>
        <BudgetTable budget={budget} budgetThisMonth={monthBudget} tableType="income"/>
      <h3>Expenses</h3>
        <BudgetTable budget={budget} budgetThisMonth={monthBudget} tableType="expense"/>
      <h3>Goals</h3>
        <BudgetTable budget={budget} budgetThisMonth={monthBudget} tableType="goal"/>
        <BudgetSummary monthBudget={monthBudget}/>
        

        </div>
  )
}

export default BudgetReport