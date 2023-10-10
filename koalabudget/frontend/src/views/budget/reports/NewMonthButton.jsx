import React from 'react';
import Button  from '@mui/material/Button';

function NewMonthButton({selectedMonth}) {

    function handleClick() {
        console.log("selectedMonth", selectedMonth)

    }
  return (
    <div>
        <Button variant="contained" onClick={handleClick}>Add new Month</Button>
    </div>
  )
}

export default NewMonthButton