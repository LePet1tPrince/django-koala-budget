import { calculateTotals, reverseBudgetValues, sortBudget } from '../../global/functions/BudgetFunctions';
import react, { useEffect, useState } from 'react';

import Chip from '@mui/material/Chip';
import { DollarFormat } from '../../global/apiRequests/global';
import Paper from '@mui/material/Paper';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { putBudget } from '../../global/apiRequests/budget';
import useSnackbar from '../../global/customHooks/useSnackbar';

export default function BudgetTable(props) {
  const { budget, budgetThisMonth, tableType } = props;
  let initialBudget
  if ( tableType === "income") {
    initialBudget = budgetThisMonth?.filter(entry => entry.category.type === "Income")
        
  } else if ( tableType === "expense" ) {
    initialBudget = budgetThisMonth?.filter(entry => entry.category.type === "Expense")
    
  } else if ( tableType === "goal") {
    initialBudget = budgetThisMonth?.filter(entry => entry.category.type === "Goal")

  }
  const [changedData, setChangedData] = useState([...initialBudget]);
  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar();
  const debugSetting = localStorage.getItem('debugSetting');
  const [columnTotals, setColumnTotals] = useState({budget: 0, actual: 0, available: 0});




  useEffect(() =>{
    setChangedData([...initialBudget]) // setting up the input state
    calculateTotals(initialBudget, setColumnTotals) //set column totals using initial budget

    
  },[budgetThisMonth])




  const handleChange = (e, row) => {
    const newValue = e.target.value.trim() === '' ? '0.00' : e.target.value.toString(); // Handle blank value as 0

      const updatedData = changedData.map((data) => {
        if (data.id === row.id) {
          // Update the 'budget' field of the matching row with the new value
          const currentDecimals = e.target.value.toString().split('.')[1]?.length
          return { ...data, budget: parseFloat(newValue).toFixed(Math.min(currentDecimals,2)) }; //maximum allowed 2 decimals. less is okay
          // return { ...data, budget: e.target.value }; //maximum allowed 2 decimals. less is okay
        
        }
        return data;
      });
      if (debugSetting === 'true') {
      console.log('updated data', updatedData)
      }
      setChangedData(updatedData);
    };


// run the blur function
    async function handleBlur(row) {
      //find the budget that has been changed
      const matchingBudget = budget.find(bud => bud.id === row.id)

      if (matchingBudget && row.budget !== matchingBudget.budget) {
        const changedBudget = {
          ...row,
          category: row.category.id,
          budget: matchingBudget.category.type === "Income"? -parseFloat(row.budget).toFixed(2): parseFloat(row.budget).toFixed(2)
        };
        try {
          const response = await putBudget(changedBudget, changedBudget.id);
      if (response.status === 200) {
        const responsejson = await response.json()
        //only display if debut set to true.
        if (debugSetting === 'true') {
          console.log('success')
          console.log("Budget",budget)
          console.log("ChangedBudget",changedBudget)
          console.log("response", responsejson)
          openSnackbar("Update Successful", 'success')

        }

       
              const categoryObject = budget.find(b => (b.id === changedBudget.id)).category
              const updatedChangedData = changedData.map((b) => (b.id === changedBudget.id ? 
                  categoryObject.type === "Income"?

                  {...responsejson,
                    category: categoryObject, 
                    budget: -responsejson.budget, 
                    actual: -responsejson.actual, 
                    available: responsejson.available} 
  
                    : 
                    {...responsejson,
                      category: categoryObject, 
                      available: responsejson.available
                    } : b));
              setChangedData(updatedChangedData)
              calculateTotals(updatedChangedData, setColumnTotals)


              
      
  
      } else {
        openSnackbar("Error " + response.status + ' - ' + response.statusText, 'error')
  
      }

        } catch (error) {
          console.error(error);
          openSnackbar('An error occurred while updating the budget.', 'error');
        }

                    
       }
    
    }


  return (
    <TableContainer component={Paper}>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right">Actual</TableCell>
            <TableCell align="right">Available</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {sortBudget(changedData)?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, "padding": "0" }}
            >
              <TableCell component="th" scope="row">
                {row.category.name}
              </TableCell>
              <TableCell align="right"
              sx={{"margin": "0px", "padding": "0"}}>

                <TextField
                  type="number"
                  onChange={(e) => handleChange(e,row)}
                  value={row.budget}
                  onBlur={() => handleBlur(row)}
                  size="small"
                  
                  />
              </TableCell>

              {/* <TableCell align="right">{DollarFormat.format(row.budget)}</TableCell> */}
              <TableCell align="right">{DollarFormat.format(row.actual)}</TableCell>
              <TableCell align="right">
              <Chip label={DollarFormat.format(row.available)} color={row.available>=0?'success':'error'} />
              {/* <Button onClick={handleBlur} variant="contained">Save</Button> */}
              </TableCell>

            </TableRow>
          ))}
          <TableRow>
          <TableCell><Typography variant="h5">Total</Typography></TableCell>

            {/* <TableCell align="right"><Typography variant="h5">{DollarFormat.format(budget_total)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(actual_total)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(available_total)}</Typography></TableCell> */}
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(columnTotals.budget)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(columnTotals.actual)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(columnTotals.available)}</Typography></TableCell>

          </TableRow>
        </TableBody>
      </Table>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />
    </TableContainer>
  );
}
