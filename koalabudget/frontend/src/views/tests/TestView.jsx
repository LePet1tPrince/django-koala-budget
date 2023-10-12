import React from 'react';
import TestFetchThen from './TestFetchThen';
import useSnackbar from '../global/apiRequests/useSnackbar';
import Button from '@mui/material/Button'

function TestView() {
  const {SnackbarComponent, openSnackbar} = useSnackbar()

 
  return (
    <div>
        {/* <TestFetchThen/> */}
        <SnackbarComponent/>
        <Button variant="outlined" onClick={() =>openSnackbar("This is my message","success")}>setOpen</Button>
        
    </div>
  )
}

export default TestView