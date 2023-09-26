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
import { postTransaction } from '../../global/apiRequests/transaction.jsx';


function TableTransactionForm(props) {
  //props
    const {accounts, activeAccountId} = props;
    // State used to input form. This should eventually be condensed
    //setting initial state so I can reset whenever I need to
    const formInputIntialState = {
      date:dayjs(new Date()),
      selectedCategory : '',
      inflow : '',
      outflow : '',
      notes : ''
    }; 
    const [transactionInput, setTransactionInput] = useState(formInputIntialState)

    // state to handle snackbar for transaction either successfully posting or error.
    const [snackbarData, setSnackbarData] = useState({
      isOpen: false,
      severity: 'info',
      message: ''
    })

    // make post request and submit a snackbar based on ther results
    async function submitPost(data) {
      const response = await postTransaction(data);
      if (response.status === 201) {
        setSnackbarData({
          message: "Post Successful",
          severity: 'success',
          isOpen: true
      })
        setTransactionInput(formInputIntialState)

    } else {
          setSnackbarData({
          message: "Error " + response.status + ' - ' + response.statusText,
          severity: 'error',
          isOpen: true
        })

    }}

  
  
    //translates the form into proper api post form.
    function handleTransactionPost() {
      if (transactionInput.inflow > 0) {
        const transaction = {
          "date": transactionInput.date.format("YYYY-MM-DD"),
          "amount": transactionInput.inflow,
          "debit": activeAccountId,
          "credit": transactionInput.selectedCategory,
          "notes": transactionInput.notes
      };
    // console.log(JSON.stringify(transaction))
    // postTransaction(transaction)
    submitPost(transaction)


      } else if (transactionInput.outflow >0) {
        const transaction = {
          "date": transactionInput.date.format("YYYY-MM-DD"),
          "amount": transactionInput.outflow,
          "debit": transactionInput.selectedCategory,
          "credit": activeAccountId,
          "notes": transactionInput.notes
      }; 
    // console.log(JSON.stringify(transaction))
    // postTransaction(transaction)
    submitPost(transaction)

      
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
        setTransactionInput({...transactionInput, date : newDate});
        console.log(newDate);
    }




  function handleChange(event, field) {
    // setTransactionInput({...transactionInput, field : event.target.value});
    const updatedTransactionInput = { ...transactionInput };
    updatedTransactionInput[field] = event.target.value;
    if (field === "inflow") {
    updatedTransactionInput['outflow'] = '';
    } else if (field === "outflow") {
      updatedTransactionInput['inflow'] = '';
    }
    setTransactionInput(updatedTransactionInput);
  
  }

  return (
    <TableRow>
      
        <TableCell>

           <LocalizationProvider dateAdapter={AdapterDayjs}>

         <DatePicker 
         value={transactionInput.date}
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
            value={transactionInput.selectedCategory}
            label="Category"
            onChange={e => handleChange(e, "selectedCategory")}
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
          onChange={e => handleChange(e, "inflow")}
          value={transactionInput.inflow}
        />
        {/* {inflow} */}

      </TableCell>
      <TableCell align="right">
      <TextField
          id="outflow-number"
          label="OutFlow"
          type="number"
          onChange={e => handleChange(e, "outflow")}
          value={transactionInput.outflow}
        />
        {/* {outflow} */}

      </TableCell>
      <TableCell align="right">
      <TextField
          id="notes"
          label="Notes"
          multiline
          maxRows={4}
          onChange={e => handleChange(e, "notes")}
          value={transactionInput.notes}
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