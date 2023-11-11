import react, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { DollarFormat } from '../../global/apiRequests/global';
import React from 'react';
import Typography from '@mui/material/Typography';
import { calculateTotals } from '../../global/functions/BudgetFunctions';

function BudgetAvailableCard(props) {
    const {monthBudget} = props;
    const [incomeTotals, setIncomeTotals] = useState({budget: 0, actual: 0, available: 0});
    const [expenseTotals, setExpenseTotals] = useState({budget: 0, actual: 0, available: 0});
    const [goalTotals, setGoalTotals] = useState({budget: 0, actual: 0, available: 0});
    const [assetTotals, setAssetTotals] = useState({budget: 0, actual: 0, available: 0});
    const [liabilityTotals, setLiabilityTotals] = useState({budget: 0, actual: 0, available: 0});


  
  
  
    const initialBudgetIncome = monthBudget?.filter(entry => entry.category.type === "Income")
    const initialBudgetExpense = monthBudget?.filter(entry => entry.category.type === "Expense")
    const initialBudgetGoal = monthBudget?.filter(entry => entry.category.type === "Goal")
    const initialBudgetAsset = monthBudget?.filter(entry => entry.category.type === "Asset")
    const initialBudgetLiability = monthBudget?.filter(entry => entry.category.type === "Liability")


    const netWorth = incomeTotals.available + expenseTotals.available + goalTotals.available + incomeTotals.budget - expenseTotals.budget - goalTotals.budget
    const budgetAvailable =  incomeTotals.budget - expenseTotals.budget - goalTotals.budget
    
    const netWorth2 = assetTotals.actual + liabilityTotals.actual
    
    useEffect(() =>{
          // setChangedData([...initialBudget]) // setting up the input state
          calculateTotals(initialBudgetIncome, setIncomeTotals) //set column totals using initial budget
          calculateTotals(initialBudgetExpense, setExpenseTotals) //set column totals using initial budget
          calculateTotals(initialBudgetGoal, setGoalTotals) //set column totals using initial budget
          calculateTotals(initialBudgetAsset, setAssetTotals) //set column totals using initial budget
          calculateTotals(initialBudgetLiability, setLiabilityTotals) //set column totals using initial budget
      
          
        },[monthBudget])

  return (
    <div>
        <Card variant="outlined" >
            <CardContent sx={{"alignItems": "center", "background": "green"}}>
                <Typography>
                    Net Worth
                </Typography>
                <Typography>
                    {/* {DollarFormat.format(netWorth)} */}
                    {netWorth2}
                </Typography>
                <Typography>
                    Available to Budget
                </Typography>
                <Typography>
                    {DollarFormat.format(budgetAvailable)}
                </Typography>
            </CardContent>
        </Card>
        Income: {JSON.stringify(incomeTotals)}<br/>
        Expense: {JSON.stringify(expenseTotals)}<br/>
        Goal: {JSON.stringify(goalTotals)}<br/>
        Asset: {JSON.stringify(assetTotals)}<br/>
        Liability: {JSON.stringify(liabilityTotals)}<br/>

    </div>
  )
}

export default BudgetAvailableCard