import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { TextField } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SnackbarTest() {
  const [open, setOpen] = React.useState(false);
  const [snackbardata, setSnackbarData] = React.useState({
    isOpen: false,
    severity: 'info',
    message: 'Here is the message'
  })

  const handleClick = () => {
    setSnackbarData({...snackbardata, isOpen: true});
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
    setSnackbarData({...snackbardata, isOpen: false});

  };
  const handleChange = (event) => {
    setSnackbarData({...snackbardata, message: event.target.value})

  }
  
//   const message = "Test things"

  const action = (
    <React.Fragment style={{Color: "#238756"}}>
    
      {/* <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton> */}
    </React.Fragment>
  );

  return (
    <div>
      <Button onClick={handleClick}>Open simple snackbar</Button>
      <TextField label="Outlined" variant="outlined" onChange={handleChange} />
      <Snackbar
        // open={open}
        open={snackbardata.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        // message={message}
        // message={snackbardata.message}
        // action={action}
      >
        <Alert onClose={handleClose} severity={snackbardata.severity} sx={{ width: '100%' }}> {snackbardata.message}</Alert>
      </Snackbar>
    </div>
  );
}
