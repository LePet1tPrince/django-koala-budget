import { calculateTotals, reverseBudgetValues, sortBudget } from '../../global/functions/BudgetFunctions';
import react, { useEffect, useState } from 'react';

import { DollarFormat } from '../../global/apiRequests/global';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

function BudgetSummary({monthBudget}) {
  const [incomeTotals, setIncomeTotals] = useState({budget: 0, actual: 0, available: 0});
  const [expenseTotals, setExpenseTotals] = useState({budget: 0, actual: 0, available: 0});


    const initialBudgetIncome = monthBudget?.filter(entry => entry.category.type === "Income")
    const initialBudgetExpense = monthBudget?.filter(entry => entry.category.type === "Expense")


    


    useEffect(() =>{
        // setChangedData([...initialBudget]) // setting up the input state
        calculateTotals(initialBudgetIncome, setIncomeTotals) //set column totals using initial budget
        calculateTotals(initialBudgetExpense, setExpenseTotals) //set column totals using initial budget
    
        
      },[monthBudget])


  return (
    <div>
        <TableContainer component={Paper}>

<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      

    </TableRow>
  </TableHead>
  <TableBody>
    
    <TableRow 
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
    <TableCell component="th" scope="row"><Typography variant="h5">Summary</Typography></TableCell>

      {/* <TableCell align="right"><Typography variant="h5">{DollarFormat.format(budget_total)}</Typography></TableCell>
      <TableCell align="right"><Typography variant="h5">{DollarFormat.format(actual_total)}</Typography></TableCell>
      <TableCell align="right"><Typography variant="h5">{DollarFormat.format(available_total)}</Typography></TableCell> */}
      <TableCell align="right"><Typography variant="h5">{DollarFormat.format(incomeTotals.budget - expenseTotals.budget)}</Typography></TableCell>
      <TableCell align="right"><Typography variant="h5">{DollarFormat.format(incomeTotals.actual - expenseTotals.actual)}</Typography></TableCell>
      <TableCell align="right"><Typography variant="h5">{DollarFormat.format(incomeTotals.available + expenseTotals.available)}</Typography></TableCell>

    </TableRow>
  </TableBody>
</Table>
</TableContainer>
    </div>
  )
}

export default BudgetSummary