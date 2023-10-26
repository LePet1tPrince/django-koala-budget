import React, { useState } from 'react';

import { BatchUpdateTransactions } from '../global/apiRequests/transaction';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DollarFormat } from '../global/apiRequests/global';
import SimpleSnackbar from '../global/components/SimpleSnackbar';
import { alignmentToggle } from './TransactionToggle';
import useSnackbar from '../global/customHooks/useSnackbar';

function ReconcileTransactions(props) {
    const {alignment, selectedTransactionIds, transactions, setTransactions, activeAccountId, accounts} = props;
    const [open, setOpen] = useState(false);
    const [changedData, setChangedData] = useState([...transactions])
    const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()


    // const activeAccount = accounts.find(acc => acc.id === activeAccountId)
    const selectedTransactions = transactions.filter(trxn => selectedTransactionIds.includes(trxn.id))
    let selectedTransactionsSum = 0
    selectedTransactions.map(trxn => {
        if (activeAccountId === trxn.debit.id) {
            selectedTransactionsSum += parseFloat(trxn.amount)

        } else if (activeAccountId === trxn.credit.id) {
            selectedTransactionsSum += -parseFloat(trxn.amount)

        }
    })

    function toggleOpen() {
        setOpen(!open)
    }

    const newRecBalance = parseFloat(accounts?.find(acc => acc.id === activeAccountId).reconciled_balance) + selectedTransactionsSum
    const newUnRecBalance = parseFloat(accounts?.find(acc => acc.id === activeAccountId).reconciled_balance) - selectedTransactionsSum

    async function handleSubmit() {
        const newData = transactions.map((trxn) => {
            if (selectedTransactionIds.includes(trxn.id)) {
                return {...trxn, "is_reconciled": alignment === alignmentToggle.CATEGORIZED}
            } 
        }).filter(n => n)
        setChangedData(newData)
        const response = await BatchUpdateTransactions(newData);
        if (response.status === 200) {
            {alignment == alignmentToggle.CATEGORIZED?
            openSnackbar("Transactions reconciled", "success"):
            openSnackbar("Transactions unreconciled", "success")
            }
            toggleOpen();

            const newtransactions = transactions.map(trxn => {
                if (selectedTransactionIds.includes(trxn.id)) {
                    return {...trxn, "is_reconciled": alignment === alignmentToggle.CATEGORIZED}
                    
                } else {
                    return {...trxn}
                }
            })
            setTransactions([...newtransactions])


        } else {
            openSnackbar("Error " + response.status + ' - ' + response.statusText + '. Could not delete transaction.', 'error')

        }
        console.log('response', response)


        
    }


  return (
    <div>
        {/* {JSON.stringify(transactions)} */}
        {/* {JSON.stringify(changedData)} */}
        {alignment === alignmentToggle.CATEGORIZED?
        <Button
        disabled={selectedTransactionIds.length === 0}
        variant='outlined'
        onClick={toggleOpen}
        >Reconcile</Button>:

        <Button
        disabled={selectedTransactionIds.length === 0}
        variant='outlined'
        onClick={toggleOpen}
        >Unreconcile</Button>
    }

        <Dialog
        open={open}
        onClose={toggleOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {alignment === alignmentToggle.CATEGORIZED?
          <p>Reconcile Transactions?</p>: 
          <p>
              Undo Reconciliation?

          </p>
            }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alignment === alignmentToggle.CATEGORIZED?
            `Your new reconciled balance is ${DollarFormat.format(newRecBalance)}`:
            `You will be unreconciling ${DollarFormat.format(selectedTransactionsSum)}. 
            Your new reconciled balance will be ${DollarFormat.format(newUnRecBalance)}. Continue?`
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={toggleOpen} autoFocus> Cancel</Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            {alignment === alignmentToggle.CATEGORIZED?
            "Reconcile":"Unreconcile"
}</Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

    </div>
  )
}

export default ReconcileTransactions