import React, { useState } from 'react'
import { api_endpoint } from '../global/apiRequests/global.jsx';
import { DatePicker } from '@mui/x-date-pickers';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function TransactionPoster() {
    const [date, setDate] = useState(dayjs(new Date()))

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
  return (
    <div>
           <Button variant="outlined" onClick={handleTransactionPost}>Post Transaction</Button>
           <LocalizationProvider dateAdapter={AdapterDayjs}>

         <DatePicker 
         value={date}
         label="Basic date picker" 
         onChange={handleDateChange}
         />
         </LocalizationProvider>
         {JSON.stringify(date)}
    </div>
  )
}

export default TransactionPoster