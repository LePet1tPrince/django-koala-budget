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


function TableTransactionForm({accounts}) {
    const [date, setDate] = useState(dayjs(new Date()))
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inflow, setInflow] = useState(0);
    const [outflow, setOutflow] = useState(0);
    const [notes, setNotes] = useState('');




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
      } catch (error) {
        console.error(error);
      }
    }
  
    function handleTransactionPost() {
      const transaction = {
        "date": date.format("YYYY-MM-DD"),
        "amount": 50,
        "debit": 5,
        "credit": 6,
        "notes": "These are my notes"
    };
    console.log(JSON.stringify(transaction))
    postTransaction(transaction)
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
        //  defaultValue={dayjs(new Date())}
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
    </TableRow>
  )
}

export default TableTransactionForm