import React, { useState, useEffect} from 'react';
import SimpleSnackbar from '../SimpleSnackbar';

function useSnackbar() {
    const [snackbarData, setSnackbarData] = useState({
      })


    function openSnackbar(message, severity) {
        setSnackbarData({ message: message, severity: severity, isOpen: true})
    }



    // const SnackbarComponent = () => {
    // return <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />}
    
    
  return {snackbarData, setSnackbarData, openSnackbar}
}

export default useSnackbar