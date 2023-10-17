import { useState } from 'react';

function useSnackbar() {
    const [snackbarData, setSnackbarData] = useState({
      })


    function openSnackbar(message, severity) {
        setSnackbarData({ message: message, severity: severity, isOpen: true})
    }



    
    
  return {snackbarData, setSnackbarData, openSnackbar}
}

export default useSnackbar