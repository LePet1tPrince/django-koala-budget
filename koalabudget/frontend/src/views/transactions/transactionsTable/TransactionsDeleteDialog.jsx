import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteTransaction } from '../../global/apiRequests/transaction';
import SimpleSnackbar from '../../global/SimpleSnackbar';

export default function TransactionDeleteDialog(props) {
  const {selectedTransactionIds, transactions, setTransactions} = props;
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

  const selectedTransactionObject = transactions?.filter(acc =>  (acc.id === selectedTransactionIds[0])
    )


  async function handleDelete() {
    const response = await deleteTransaction(selectedTransactionObject[0].id)
    if (response.status === 204) {
      setOpen(false);
      setSnackbarData({
        message: "Transaction Deleted",
        severity: 'success',
        isOpen: true
      })
      setTransactions(transactions.filter(acc => acc.id !== selectedTransactionObject[0].id))
    
      // const responsejson = await response.json()

  } else {
        setSnackbarData({
        message: "Error " + response.status + ' - ' + response.statusText + '. Could not delete account.',
        severity: 'error',
        isOpen: true
      })}
    console.log(response.status)
  }
if (selectedTransactionIds) {


  return (
    <div>
      <Button
        disabled={selectedTransactionIds.length !== 1}
         variant='contained'
          color='error'
          onClick={handleClickOpen}
          sx={{margin: "10px"}}
          > <DeleteIcon/> Delete Transaction</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Transaction?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you use you want to delete this transaction? This cannot be undone.
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
