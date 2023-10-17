import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


export default function SimpleSnackbar({snackbarData, setSnackbarData}) {


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarData({...snackbarData, isOpen: false});
  };

  const action = (
    <React.Fragment>
  
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={snackbarData.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarData.message}
        action={action}
      >
        <Alert onClose={handleClose} severity={snackbarData.severity} sx={{ width: '100%' }}> {snackbarData.message}</Alert>
        </Snackbar>
    </div>
  );
}
