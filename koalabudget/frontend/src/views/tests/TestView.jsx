import React, { useState } from 'react';
import TestFetchThen from './TestFetchThen';
import useSnackbar from '../global/apiRequests/useSnackbar';
import Button from '@mui/material/Button'
import SimpleSnackbar from '../global/SimpleSnackbar';

function TestView() {
  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()
  const [otherData, setOtherData] = useState()

  function handleChange(e) {
    setOtherData(e.target.value)
  }

 
  return (
    <div>
        {/* <TestFetchThen/> */}
        {/* <SnackbarComponent/> */}
        <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />
        <Button variant="outlined" onClick={() =>openSnackbar("This is my message","success")}>setOpen</Button>
        <input onChange={e => handleChange(e)} value={otherData}></input>
        
    </div>
  )
}

export default TestView