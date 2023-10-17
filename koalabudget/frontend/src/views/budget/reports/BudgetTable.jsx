import react, { useEffect, useState } from 'react';

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
    
  }
  const [changedData, setChangedData] = useState([...initialBudget])
  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()


  useEffect(() =>{
    setChangedData([...initialBudget])
  },[budgetThisMonth, budget, initialBudget])

  let budget_total = 0;
  let actual_total = 0;
  let available_total = 0;
  initialBudget?.map(row => {
    budget_total += parseFloat(row.budget);
    actual_total += parseFloat(row.actual);
    available_total += parseFloat(row.available);
  })




  const handleChange = (e, row) => {
    const newValue = e.target.value.trim() === '' ? '0.00' : e.target.value.toString(); // Handle blank value as 0

      const updatedData = changedData.map((data) => {
        if (data.id === row.id) {
          // Update the 'budget' field of the matching row with the new value
          const currentDecimals = e.target.value.toString().split('.')[1]?.length
          return { ...data, budget: parseFloat(newValue).toFixed(Math.min(currentDecimals,2)) }; //maximum allowed 2 decimals. less is okay
        }
        return data;
      });
      
      setChangedData(updatedData);
    };

    async function handleBlur(row) {
      //find the budget that has been changed
      const matchingBudget = budget.find(bud => bud.id === row.id)

      if (matchingBudget && row.budget !== matchingBudget.budget) {
        const changedBudget = {
          ...row,
          category: row.category.id,
          budget: parseFloat(row.budget).toFixed(2)
        };
        try {
          const response = await putBudget(changedBudget, changedBudget.id);
      if (response.status === 200) {
        const responsejson = await response.json()
        //only display if debut set to true.
        if (localStorage.getItem('debugSetting') === 'true') {
          console.log('success')
          console.log("Budget",budget)
          console.log("ChangedBudget",changedBudget)
          console.log("response", responsejson)
          openSnackbar("Update Successful", 'success')

        }
       
              const categoryObject = budget.find(b => (b.id === changedBudget.id)).category
              const updatedChangedData = changedData.map((b) => (b.id === changedBudget.id ? {...responsejson, category: categoryObject} : b));
              setChangedData(updatedChangedData)
              
      
  
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
          {changedData?.sort((a,b) => a.name - b.name).map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.category.name} - {row.category.num}
              </TableCell>
              <TableCell align="right">

                <TextField
                  type="number"
                  margin="none"
                  onChange={(e) => handleChange(e,row)}
                  value={row.budget}
                  onBlur={() => handleBlur(row)}
                  />
              </TableCell>

              {/* <TableCell align="right">{DollarFormat.format(row.budget)}</TableCell> */}
              <TableCell align="right">{DollarFormat.format(row.actual)}</TableCell>
              <TableCell align="right">{DollarFormat.format(row.available)}
              {/* <Button onClick={handleBlur} variant="contained">Save</Button> */}
              </TableCell>

            </TableRow>
          ))}
          <TableRow>
          <TableCell><Typography variant="h5">Total</Typography></TableCell>

            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(budget_total)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(actual_total)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(available_total)}</Typography></TableCell>


          </TableRow>
        </TableBody>
      </Table>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />
    </TableContainer>
  );
}
