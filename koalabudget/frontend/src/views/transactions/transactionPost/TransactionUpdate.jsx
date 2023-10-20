import { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import useSnackbar from '../../global/customHooks/useSnackbar';
import useTransactionForm from './useTransactionForm';

// import { postTransaction } from '../../global/apiRequests/transaction';


export default function TransactionUpdate(props) {
const { accounts, activeAccountId, setTransactions, selectedTransactionIds, transactions} = props;
const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()

const debugSetting = localStorage.getItem('debugSetting')


const activeAccount = accounts?.filter(acc => acc.id === activeAccountId)[0]
const selectedTransaction = transactions?.filter(trxn => trxn.id === selectedTransactionIds[0])

const formInputIntialState = {
    date:dayjs(Date()),
    category : 'default',
    inflow : '',
    outflow : '',
    notes : ''
}; 

// const formInputIntialState = () => {
//     if (selectedTransaction[0]?.debit.id === activeAccountId)
//     {return(
//     {
//         "date": dayjs(selectedTransaction[0].date),
//         "inflow": selectedTransaction[0].amount,
//         "outflow" : 0,
//         "category": `${selectedTransaction[0].credit.id}`,
//         "notes": selectedTransaction[0].notes
//     })} else if (selectedTransaction[0]?.credit.id === activeAccountId)
//     { return({
//         "date": dayjs(selectedTransaction[0].date),
//         "inflow": 0,
//         "outflow" : selectedTransaction[0].amount,
//         "category": `${selectedTransaction[0].debit.id}`,
//         "notes": selectedTransaction[0].notes

//     }) } else {
//         return(formInputBlankState)
//     } 

// }

const [formData, setFormData, open, toggleOpen] = useTransactionForm(formInputIntialState);
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState(formInputIntialState);


  useEffect(() => {
    if (open) {return }
    if (selectedTransaction[0]?.debit.id === activeAccountId)
    {setFormData(
    {
        "date": dayjs(selectedTransaction[0].date),
        "inflow": selectedTransaction[0].amount,
        "outflow" : 0,
        "category": `${selectedTransaction[0].credit.id}`,
        "notes": selectedTransaction[0].notes
    })} else if (selectedTransaction[0]?.credit.id === activeAccountId)
    { setFormData({
        "date": dayjs(selectedTransaction[0].date),
        "inflow": 0,
        "outflow" : selectedTransaction[0].amount,
        "category": `${selectedTransaction[0].debit.id}`,
        "notes": selectedTransaction[0].notes

    }) } else {
        setFormData(formInputIntialState)
    } 

  }, [selectedTransactionIds, activeAccountId]);


  if (debugSetting === 'true') {

    console.log(activeAccountId)
    console.log("selected Transactions", selectedTransactionIds)
    console.log("selected Transaction", selectedTransaction)
    console.log(formInputIntialState)
    console.log("Form Data:", JSON.stringify(formData))
  }

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   function handleChange(event, field) {
//     const updatedFormData = { ...formData };
//     if (field === "date") {
//         setFormData({...updatedFormData, date : event});
//         console.log(event);

//     } else {
//         if (field === "inflow") {
//             updatedFormData['outflow'] = '';
        
//             } else if (field === "outflow") {
//                 updatedFormData['inflow'] = '';
        
//             };
//     updatedFormData[field] = event.target.value;
//     setFormData(updatedFormData);

//     }
//     console.log(updatedFormData)

//   }

  async function submitPut(data) {
    const response = await putTransaction(data, selectedTransactionIds[0]);
    if (response.status === 200) {
      openSnackbar("Update Successful", 'success')

    //   setFormData(formInputIntialState)
      const responsejson = await response.json()
      console.log("success", JSON.stringify(responsejson))
      const newTransaction = transactions.map(line => {
        if (responsejson.id === line.id) {
            return (
            {
                // ...line, 
                id: responsejson.id,
                date: responsejson.date,
                amount: responsejson.amount,
                credit: accounts?.find(acc => acc.id === responsejson.credit),
                debit: accounts?.find(acc => acc.id === responsejson.debit),
                notes: responsejson.notes

            })
        } else {
            return line
        }})

        
      setTransactions([...newTransaction])

  } else {
    openSnackbar("Error " + response.status + ' - ' + response.statusText, 'error')


  }
}


  //translates the form into proper api post form.
  async function handleTransactionPut() {
    if (formData.inflow > 0) {
      const transaction = {
        "id": selectedTransactionIds[0],
        "date": formData.date.format("YYYY-MM-DD"),
        "amount": formData.inflow,
        "debit": activeAccountId,
        "credit": formData.category,
        "notes": formData.notes
    };
  console.log(JSON.stringify(transaction))
  // postTransaction(transaction)
  submitPut(transaction)


    } else if (formData.outflow >0) {
      const transaction = {
        "id": selectedTransactionIds[0],
        "date": formData.date.format("YYYY-MM-DD"),
        "amount": formData.outflow,
        "debit": formData.category,
        "credit": activeAccountId,
        "notes": formData.notes
    }; 
  console.log(JSON.stringify(transaction))
  // postTransaction(transaction)
  submitPut(transaction)

    
  } else {
    console.log("else logged")
    openSnackbar("Error updating Transaction", 'error')
   
   
  }
  }




  return (
    <div>

    <Button variant="outlined"
        onClick={toggleOpen}
            sx={{margin: "10px"}}
            disabled={selectedTransactionIds.length !== 1}
            >
            <EditIcon/> Update Transaction
        </Button>
        {/* Debit: 
        {JSON.stringify(selectedTransaction[0]?.debit.id === activeAccountId)}
        <br/>
        Credit: 
        {JSON.stringify(selectedTransaction[0]?.credit.id === activeAccountId)}
        <br/>
        {JSON.stringify( {
        "date": dayjs(selectedTransaction[0]?.date),
        "inflow": selectedTransaction[0]?.amount,
        "outflow" : 0,
        "category": `${selectedTransaction[0]?.credit.id}`,
        "notes": selectedTransaction[0]?.notes
    })}
    FORMDATA
    {JSON.stringify(formData)} */}
        {/* ActiveAccount:  */}
        {/* {JSON.stringify(activeAccountId))} */}

        <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

        <TransactionForm
        accounts={accounts}
        activeAccountId={activeAccountId}
        formInputIntialState={formInputIntialState}
        handleSubmit={handleTransactionPut}
        formData={formData}
        setFormData={setFormData}
        open={open}
        toggleOpen={toggleOpen}
        action="Update"
        />
     
    </div>
  );
}
