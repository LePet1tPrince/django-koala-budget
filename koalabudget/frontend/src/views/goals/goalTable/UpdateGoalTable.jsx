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
import { putGoal } from '../../global/apiRequests/goal';
import useSnackbar from '../../global/customHooks/useSnackbar';

export default function UpdateGoalTable({ goals, setGoals, mode }) {
const [changedData, setChangedData] = useState([...goals]);
  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar();
  const debugSetting = localStorage.getItem('debugSetting');

//   useEffect(() =>{
//     setChangedData([...initialBudget]) // setting up the input state
//     calculateTotals(initialBudget, setColumnTotals) //set column totals using initial budget

    
//   },[budgetThisMonth])

    const handleChange = (e, row) => {
        const newValue = e.target.value.trim() === '' ? '0.00' : e.target.value.toString(); // Handle blank value as 0
    
          const updatedData = changedData.map((data) => {
            if (data.id === row.id) {
              // Update the 'budget' field of the matching row with the new value
              const currentDecimals = e.target.value.toString().split('.')[1]?.length
              return { ...data, saved: parseFloat(newValue).toFixed(Math.min(currentDecimals,2)) }; //maximum allowed 2 decimals. less is okay
            
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
      const matchingGoal = goals?.find(goal => goal.id === row.id)
        //convert this function to be able to work for goal.
      if (matchingGoal && row !== matchingGoal) {
        const changedGoal = {
          ...row,
        //   category: row.category.id,
          saved: parseFloat(row.saved).toFixed(2)
        };
        try {
          const response = await putGoal(changedGoal, changedGoal.id);
      if (response.status === 200) {
        const responsejson = await response.json()
        //only display if debut set to true.
        if (debugSetting === 'true') {
          console.log('success')
          console.log("Goals",goals)
          console.log("ChangedGoals",changedGoal)
          console.log("response", responsejson)
          openSnackbar("Update Successful", 'success')

        }

       
            //   const categoryObject = budget.find(b => (b.id === changedBudget.id)).category
              const updatedChangedData = changedData.map((b) => (b.id === changedGoal.id ? 
                  
                    {...responsejson,
                      saved: responsejson.saved, 
                      remainder: responsejson.remainder
                    //   available: responsejson.available
                    } : b));
              setChangedData(updatedChangedData)
              setGoals(updatedChangedData)
              console.log("updateddata", updatedChangedData)

            //   calculateTotals(updatedChangedData, setColumnTotals)
          openSnackbar('Goals Saved', 'success');
          console.log("responsejson", responsejson)
          



              
      
  
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
            <TableCell>Goal Name</TableCell>
            <TableCell align="right">Target</TableCell>
            <TableCell align="right">Saved</TableCell>
            <TableCell align="right">Still to Go</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {changedData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{DollarFormat.format(row.target)}</TableCell>
              {mode === "view"? <TableCell align="right">{DollarFormat.format(row.saved)}</TableCell>:
              <TableCell align="right">
                <TextField
                  type="number"
                  margin="none"
                  onChange={(e) => handleChange(e,row)}
                  value={row.saved}
                  onBlur={() => handleBlur(row)}
                  />
              </TableCell>}
              {/* <TableCell align="right">{DollarFormat.format(row.saved)}</TableCell> */}
              <TableCell align="right">{DollarFormat.format(row.remainder)}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

    </TableContainer>
  );
}
