import react, { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import TextField from '@mui/material/TextField';
import TransactionForm from './TransactionForm';
import TransactionsPostForm from '../transactionsTable/TransactionsPostForm';
import dayjs from 'dayjs';
import { postAccount } from '../../global/apiRequests/account';
import { postTransaction } from '../../global/apiRequests/transaction';
import { sortAccounts } from '../../global/functions/AccountsFunctions';
import useSnackbar from '../../global/customHooks/useSnackbar';
import useTransactionForm from './useTransactionForm';

export default function TransactionPost(props) {
    const {accounts, activeAccountId, setTransactions } = props;
    const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()

    
    // const [open, setOpen] = useState(false);
    
    const formInputIntialState = {
        date:dayjs(new Date()),
        category : 'default',
        inflow : '',
        outflow : '',
        notes : ''
    }; 

    const [formData, setFormData, open, toggleOpen] = useTransactionForm(formInputIntialState);

    

      async function submitPost(data) {
        const response = await postTransaction(data);
        if (response.status === 201) {
          openSnackbar("Post Successful", 'success')
    
          setFormData(formInputIntialState)
          const responsejson = await response.json()
          console.log("success", JSON.stringify(responsejson))
          setTransactions(prev => [...prev, responsejson])
    
      } else {
        openSnackbar("Error " + response.status + ' - ' + response.statusText, 'error')
      
    
      }}
    
    
      //translates the form into proper api post form.
      async function handleTransactionPost(formData) {
        if (formData.inflow > 0) {
          const transaction = {
            "date": formData.date.format("YYYY-MM-DD"),
            "amount": formData.inflow,
            "debit": activeAccountId,
            "credit": formData.category,
            "notes": formData.notes
        };
      // console.log(JSON.stringify(transaction))
      // postTransaction(transaction)
      submitPost(transaction)
    
    
        } else if (formData.outflow >0) {
          const transaction = {
            "date": formData.date.format("YYYY-MM-DD"),
            "amount": formData.outflow,
            "debit": formData.category,
            "credit": activeAccountId,
            "notes": formData.notes
        }; 
      // console.log(JSON.stringify(transaction))
      // postTransaction(transaction)
      submitPost(transaction)
    
        
      } else {
        console.log("else logged")
        openSnackbar("Error Posting Transaction", "error")
      
      }
      }

  return (
    <div>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

        <TransactionForm
        accounts={accounts}
        activeAccountId={activeAccountId}
        formInputIntialState={formInputIntialState}
        handleTransactionPost={handleTransactionPost}
        formData={formData}
        setFormData={setFormData}
        open={open}
        toggleOpen={toggleOpen}
        action="Post"
        />

    </div>
  );
}
