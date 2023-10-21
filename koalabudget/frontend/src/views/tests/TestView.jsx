import React, { useState } from 'react';

import Button from '@mui/material/Button'
import ColourToggleButton from './ColourToggleButton';
import SimpleSnackbar from '../global/components/SimpleSnackbar';
import { ToggleButton } from '@mui/material';
import ToggleButtonExample from './ToggleButtonExample';
import { useSearchParams } from 'react-router-dom';
import useSnackbar from '../global/customHooks/useSnackbar';

// import TestFetchThen from './TestFetchThen';


function TestView() {
  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()
  const [otherData, setOtherData] = useState()
  // const [alignment, setAlignment] = useState('web');
  const [alignment, setAlignment] = useSearchParams({view: 'web'})

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
        <ColourToggleButton alignment={alignment} setAlignment={setAlignment}/>
        {/* <ColourToggleButton alignment={searchParams} setAlignment={setSearchParams}/> */}
        <ToggleButtonExample/>
        
    </div>
  )
}

export default TestView