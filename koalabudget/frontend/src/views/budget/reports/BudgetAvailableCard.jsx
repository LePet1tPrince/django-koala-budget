import react, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { DollarFormat } from '../../global/apiRequests/global';
import React from 'react';
import Typography from '@mui/material/Typography';
import { calculateTotals } from '../../global/functions/BudgetFunctions';
import useFetch from '../../global/customHooks/useFetch';

function BudgetAvailableCard(props) {
    const {monthBudget, selectedMonth} = props;
    
    const [ monthData, setMonthData, isMonthDataLoading, isMonthDataError] = useFetch(`/transactions/month/${selectedMonth.$y}/${selectedMonth.$M}`)
    const [incomeTotals, setIncomeTotals] = useState({budget: 0, actual: 0, available: 0});
    const [expenseTotals, setExpenseTotals] = useState({budget: 0, actual: 0, available: 0});
    const [goalTotals, setGoalTotals] = useState({budget: 0, actual: 0, available: 0});
    // const [netWorth, setNetWorth] = useState(0);
    // const [liabilityTotals, setLiabilityTotals] = useState({budget: 0, actual: 0, available: 0});

    var netWorth = monthData?.NetWorth
  
  
  
    const initialBudgetIncome = monthBudget?.filter(entry => entry.category.type === "Income")
    const initialBudgetExpense = monthBudget?.filter(entry => entry.category.type === "Expense")
    const initialBudgetGoal = monthBudget?.filter(entry => entry.category.type === "Goal")
   


    const budgetAvailable =  incomeTotals.budget - expenseTotals.budget - goalTotals.budget
    const totalAvailable = incomeTotals.available + expenseTotals.available + goalTotals.available
    
    // const netWorth2 = assetTotals.actual + liabilityTotals.actual
    
    useEffect(() =>{
          // setChangedData([...initialBudget]) // setting up the input state
          calculateTotals(initialBudgetIncome, setIncomeTotals) //set column totals using initial budget
          calculateTotals(initialBudgetExpense, setExpenseTotals) //set column totals using initial budget
          calculateTotals(initialBudgetGoal, setGoalTotals) //set column totals using initial budget
        //   const newNetWorth = 
        
      
          
        },[monthBudget])

  return (
    <div>
        <Card variant="outlined" sx={{ borderRadius: '16px' }} >
            <CardContent sx={{"background-image": "linear-gradient(to bottom right, lightgreen , white);"}}>
                <Typography variant='h4'>
                    Net Worth
                </Typography>
                <Typography>
                    {isMonthDataLoading? "...Loading...": DollarFormat.format(netWorth)}
                </Typography>
                <Typography variant='h4'>
                    Available to Budget
                </Typography>
                <Typography>
                    {DollarFormat.format(netWorth - totalAvailable)}
                </Typography>
            </CardContent>
        </Card>
        {/* Income: {JSON.stringify(incomeTotals)}<br/>
        Expense: {JSON.stringify(expenseTotals)}<br/>
        Goal: {JSON.stringify(goalTotals)}<br/>
        Asset: {JSON.stringify(assetTotals)}<br/>
        Liability: {JSON.stringify(liabilityTotals)}<br/> */}

    </div>
  )
}

export default BudgetAvailableCard