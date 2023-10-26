import React, { useState } from 'react';

import { BatchUpdateTransactions } from '../global/apiRequests/transaction';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DollarFormat } from '../global/apiRequests/global';
import SaveIcon from '@mui/icons-material/Save';
import SimpleSnackbar from '../global/components/SimpleSnackbar';
import UndoIcon from '@mui/icons-material/Undo';
import { alignmentToggle } from './TransactionToggle';
import useSnackbar from '../global/customHooks/useSnackbar';

function ReconcileTransactions(props) {
    const {alignment, selectedTransactionIds, transactions, setTransactions, activeAccountId, accounts, setAccounts} = props;
    const [open, setOpen] = useState(false);
    // const [changedData, setChangedData] = useState([...transactions])
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

        const newData = transactions.map((trxn) => { //create an array with the correct reconciliation status
            if (selectedTransactionIds.includes(trxn.id)) {
                return {...trxn, "is_reconciled": alignment === alignmentToggle.CATEGORIZED}
            } 
        })
        // setChangedData(newData)
        const response = await BatchUpdateTransactions(newData);
        
        if (response.status === 200) { //onsuccess
            {alignment === alignmentToggle.CATEGORIZED?
            openSnackbar("Transactions reconciled", "success"):
            openSnackbar("Transactions unreconciled", "success")
            }
            toggleOpen();

            //change the transactions objects
            const newtransactions = transactions.map(trxn => {
                if (selectedTransactionIds.includes(trxn.id)) {
                    return {...trxn, "is_reconciled": alignment === alignmentToggle.CATEGORIZED}
                    
                } else {
                    return {...trxn}
                }
            })
            setTransactions([...newtransactions])

            //adjust the reconciliation balance on the cards.
            const newAccounts = accounts.map(acc => {
                if (acc.id === activeAccountId) {
                    return {...acc, reconciled_balance: alignment === alignmentToggle.CATEGORIZED?newRecBalance:newUnRecBalance}
                } else {
                    return {...acc}
                }
            })
            setAccounts([...newAccounts])


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
        sx={{margin: "10px"}}
        >
            <SaveIcon/> Reconcile</Button>:

        <Button
        disabled={selectedTransactionIds.length === 0}
        variant='outlined'
        onClick={toggleOpen}
        sx={{margin: "10px"}}
        >
            <UndoIcon/>Unreconcile</Button>
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
            `You are about to reconcile ${DollarFormat.format(selectedTransactionsSum)} of new transactions.
            Your new reconciled balance is ${DollarFormat.format(newRecBalance)}`:
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