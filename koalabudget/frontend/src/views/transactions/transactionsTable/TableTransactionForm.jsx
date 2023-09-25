import React, { useState } from 'react'
import { api_endpoint } from '../../global/apiRequests/global.jsx';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SimpleSnackbar from '../../global/SimpleSnackbar.jsx';
import Snackbar from '@mui/material/Snackbar';


function TableTransactionForm(props) {
  //props
    const {accounts, activeAccountId} = props;
    // State used to input form. This should eventually be condensed
    const [date, setDate] = useState(dayjs(new Date()))
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inflow, setInflow] = useState(0);
    const [outflow, setOutflow] = useState(0);
    const [notes, setNotes] = useState('');

    // consolidating state for the 
    const [transactionPost, setTransactionPost] = useState({
      date:dayjs(new Date()),
      selectedCategory : '',
      inflow : 0,
      outflow : 0,
      notes : ''
    })

    // state to handle snackbar for transaction either working or not working.
    
    const [snackbarData, setSnackbarData] = useState({
      isOpen: false,
      severity: 'info',
      message: ''
    })


    async function postTransaction(data) {
        try {
        const response = await fetch(
          `${api_endpoint}/transactions/`,
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({...data})
            });
    
        const responseJson = await response.json();
        console.log(responseJson)
        setSnackbarData({
          message: "Post Successful",
          severity: 'success',
          isOpen: true
        })
      
        
      } catch (error) {
        console.error(error);
        setSnackbarData({
          message: "Error Posting Transaction",
          severity: 'error',
          isOpen: true
        });
        
      }
    }
  
    //translates the form into proper api post form.
    function handleTransactionPost() {
      if (inflow > 0) {
        const transaction = {
          "date": date.format("YYYY-MM-DD"),
          "amount": inflow,
          "debit": activeAccountId,
          "credit": selectedCategory,
          "notes": notes
      };
    // console.log(JSON.stringify(transaction))
    postTransaction(transaction)


      } else if (outflow >0) {
        const transaction = {
          "date": date.format("YYYY-MM-DD"),
          "amount": outflow,
          "debit": selectedCategory,
          "credit": activeAccountId,
          "notes": notes
      }; 
    // console.log(JSON.stringify(transaction))
    postTransaction(transaction)

      
    } else {
      console.log("else logged")
      setSnackbarData({
        message: "Error Posting Transaction",
        severity: 'error',
        isOpen: true
      })
     
    }
    }
    
    function handleDateChange(newDate) {
        setDate(newDate);
        console.log(newDate);
    }




  function handleChange(event, setState, resetState=null) {
    setState(event.target.value);
    if (resetState) {
      resetState('')
    } 
  
  }

  return (
    <TableRow>
      
        <TableCell>

           <LocalizationProvider dateAdapter={AdapterDayjs}>

         <DatePicker 
         value={date}
         label="Date" 
         onChange={handleDateChange}
         />
         </LocalizationProvider>
         </TableCell>
         
      <TableCell align="right">
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            label="Category"
            onChange={e => handleChange(e, setSelectedCategory)}
          >
            {accounts.sort((a,b) => a.num-b.num)?.map(acc => {
              return (
                <MenuItem value={acc.id}>{acc.num} - {acc.name}</MenuItem>
              )
            })}
          
          </Select>
        </FormControl>
      </Box>
      {/* {selectedCategory} */}

      </TableCell>
      <TableCell align="right">
      <TextField
          id="inflow-number"
          label="inFlow"
          type="number"
          onChange={e => handleChange(e, setInflow, setOutflow)}
          value={inflow}
        />
        {/* {inflow} */}

      </TableCell>
      <TableCell align="right">
      <TextField
          id="outflow-number"
          label="OutFlow"
          type="number"
          onChange={e => handleChange(e, setOutflow, setInflow)}
          value={outflow}
        />
        {/* {outflow} */}

      </TableCell>
      <TableCell align="right">
      <TextField
          id="notes"
          label="Notes"
          multiline
          maxRows={4}
          onChange={e => handleChange(e, setNotes)}
          value={notes}
        />
        {/* {notes} */}

      </TableCell>
      <TableCell align="right">
            
      <Button variant="contained" onClick={handleTransactionPost}>Save</Button>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />
      

      </TableCell>
    </TableRow>
  )
}

export default TableTransactionForm