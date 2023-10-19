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
    
    // const [open, setOpen] = useState(false);
    
    const formInputIntialState = {
        date:dayjs(new Date()),
        category : 'default',
        inflow : '',
        outflow : '',
        notes : ''
    }; 

    const [formData, setFormData, open, toggleOpen] = useTransactionForm(formInputIntialState);

  return (
    <div>
        <TransactionForm
        accounts={accounts}
        activeAccountId={activeAccountId}
        setTransactions={setTransactions}
        formInputIntialState={formInputIntialState}
        open={open}
        toggleOpen={toggleOpen}
        formData={formData}
        setFormData={setFormData}
        />

    </div>
  );
}
