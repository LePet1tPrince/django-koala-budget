import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteAccount } from '../../global/apiRequests/account';
import SimpleSnackbar from '../../global/SimpleSnackbar';

export default function AccountDeleteDialogue(props) {
  const {selectedAccount, accounts, setAccounts} = props;
  const [open, setOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    isOpen: false,
    severity: 'info',
    message: ''
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectedAccountObject = accounts?.filter(acc =>  (acc.id === selectedAccount[0])
    )


  async function handleDelete() {
    const response = await deleteAccount(selectedAccountObject[0].id)
    if (response.status === 204) {
      setOpen(false);
      setSnackbarData({
        message: "Account Deleted",
        severity: 'success',
        isOpen: true
      })
      setAccounts(accounts.filter(acc => acc.id !== selectedAccountObject[0].id))
    
      // const responsejson = await response.json()

  } else {
        setSnackbarData({
        message: "Error " + response.status + ' - ' + response.statusText + '. Could not delete account.',
        severity: 'error',
        isOpen: true
      })}
    console.log(response.status)
  }
if (selectedAccount) {


  return (
    <div>
      <Button
        disabled={selectedAccount.length !== 1}
         variant='contained'
          color='error'
          onClick={handleClickOpen}
          sx={{margin: "10px"}}
          >Delete Selected Account</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you use you want to delete {selectedAccountObject[0]?.num} - {selectedAccountObject[0]?.name}? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} autoFocus> Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

    </div>
  );}
}
