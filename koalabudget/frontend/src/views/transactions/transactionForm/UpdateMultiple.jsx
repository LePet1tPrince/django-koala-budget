import { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BatchUpdateTransactions } from '../../global/apiRequests/transaction';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import TextField from '@mui/material/TextField';
import TransactionForm from './TransactionForm';
import dayjs from 'dayjs';
import { putTransaction } from '../../global/apiRequests/transaction';
import useFormData from '../../global/customHooks/useFormData';
import useSnackbar from '../../global/customHooks/useSnackbar';

function UpdateMultiple(props) {
const { accounts, activeAccountId, setTransactions, selectedTransactionIds, transactions} = props;
const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()

const debugSetting = localStorage.getItem('debugSetting')

const formInputIntialState = {
    date:'',
    category : 'default',
    inflow : '',
    outflow : '',
    notes : ''
}; 

const [formData, setFormData, open, toggleOpen] = useFormData(formInputIntialState);

async function handleSubmit() {
    const updatedTransactions = transactions.map(trxn => {
        if (selectedTransactionIds.includes(trxn.id)) {
            if (trxn.debit.id === activeAccountId) {
                return {
                    ...trxn,
                    notes: formData.notes, 
                    credit: formData.category, 
                    debit: trxn.debit.id
                }
            } else if (trxn.credit.id === activeAccountId) {
                return {
                    ...trxn, 
                    notes: formData.notes, 
                    debit: formData.category, 
                    credit: trxn.credit.id
                }
            }
        }

    }).filter(n => n)

    const response = await BatchUpdateTransactions(updatedTransactions)

    if (response.status === 200) { //onsuccess
        openSnackbar("Transactions updated", "success")
        
        toggleOpen();

        //change the transactions objects
        const newTransactions = transactions.map(trxn => {
            if (selectedTransactionIds.includes(trxn.id)) {
                const updatedTrxn = updatedTransactions.find(t => t.id === trxn.id)
                return {...trxn, 
                    "debit": accounts.find(acc => acc.id === updatedTrxn.debit),
                    "credit": accounts.find(acc => acc.id === updatedTrxn.credit),
                    "notes": updatedTrxn.notes
                }
                
            } else {
                return {...trxn}
            }
        })
        setTransactions([...newTransactions])


    } else {
        openSnackbar("Error " + response.status + ' - ' + response.statusText + '. Could not delete transaction.', 'error')

    }

    // console.log('newTransactions',JSON.stringify(newTransactions))
}


  return (
    <div>
        <Button variant="outlined"
        onClick={toggleOpen}
            sx={{margin: "10px"}}
            // disabled={selectedTransactionIds.length !== 1}
            >
            <EditIcon/> Batch Update
        </Button>

        <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

        <TransactionForm
        accounts={accounts}
        activeAccountId={activeAccountId}
        formInputIntialState={formInputIntialState}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        open={open}
        toggleOpen={toggleOpen}
        action="Update"
        formTitle="Update Multiple Transactions"
        batch={true} 
        />

    </div>
  )
}

export default UpdateMultiple