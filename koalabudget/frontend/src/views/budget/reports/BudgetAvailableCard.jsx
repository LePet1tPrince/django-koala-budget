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
  
  
  
    const initialBudgetIncome = monthBudget?.filter(entry => entry.category.type === "Income")
    const initialBudgetExpense = monthBudget?.filter(entry => entry.category.type === "Expense")
    const initialBudgetGoal = monthBudget?.filter(entry => entry.category.type === "Goal")
  
    
    
    useEffect(() =>{
          // setChangedData([...initialBudget]) // setting up the input state
          calculateTotals(initialBudgetIncome, setIncomeTotals) //set column totals using initial budget
          calculateTotals(initialBudgetExpense, setExpenseTotals) //set column totals using initial budget
          calculateTotals(initialBudgetGoal, setGoalTotals) //set column totals using initial budget
      
          
        },[monthBudget])

  return (
    <div>
        <Card variant="outlined" >
            <CardContent sx={{"alignItems": "center", "background": "green"}}>
                <Typography>
                    Net Worth
                </Typography>
                <Typography>
                    {DollarFormat.format(incomeTotals.available + expenseTotals.available + goalTotals.available)}
                </Typography>
                <Typography>
                    Available to Budget
                </Typography>
                <Typography>
                    $50
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}

export default BudgetAvailableCard