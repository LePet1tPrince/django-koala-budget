import react, { useEffect, useState } from 'react';

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
import dayjs from 'dayjs';
import { putTransaction } from '../../global/apiRequests/transaction';
import useSnackbar from '../../global/customHooks/useSnackbar';

// import { postTransaction } from '../../global/apiRequests/transaction';


export default function TransactionsPutForm(props) {
const { accounts, activeAccountId, setTransactions, selectedTransactionIds, transactions} = props;
const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()
const debugSetting = localStorage.getItem('debugSetting')


const activeAccount = accounts?.filter(acc => acc.id === activeAccountId)[0]
const selectedTransaction = transactions?.filter(trxn => trxn.id === selectedTransactionIds[0])

const formInputIntialState = {
    date:dayjs(new Date()),
    category : 'default',
    inflow : '',
    outflow : '',
    notes : ''
  }; 
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(formInputIntialState);


  useEffect(() => {
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

  }, [selectedTransactionIds, activeAccountId, selectedTransaction]);


  if (debugSetting === 'true') {

    console.log(activeAccountId)
    console.log("selected Transactions", selectedTransactionIds)
    console.log("selected Transaction", selectedTransaction)
    console.log(formInputIntialState)
    console.log("Form Data:", JSON.stringify(formData))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(event, field) {
    const updatedFormData = { ...formData };
    if (field === "date") {
        setFormData({...updatedFormData, date : event});
        console.log(event);

    } else {
        if (field === "inflow") {
            updatedFormData['outflow'] = '';
        
            } else if (field === "outflow") {
                updatedFormData['inflow'] = '';
        
            };
    updatedFormData[field] = event.target.value;
    setFormData(updatedFormData);

    }
    console.log(updatedFormData)

  }

  async function submitPut(data) {
    const response = await putTransaction(data, selectedTransactionIds[0]);
    if (response.status === 200) {
      openSnackbar("Update Successful", 'success')

      setFormData(formInputIntialState)
      const responsejson = await response.json()
      console.log("success", JSON.stringify(responsejson))
      setTransactions(prev => [...prev, responsejson])

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
       onClick={handleClickOpen}
        sx={{margin: "10px"}}
        disabled={selectedTransactionIds.length !== 1}
        >
        <EditIcon/> Update Transaction
      </Button>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create A New Transaction for {activeAccount?.name} - {activeAccount?.num}</DialogTitle>
        <DialogContent>
          
          <Grid container spacing={2}>
            <Grid item margin={2} xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                <DatePicker 
                value={formData.date}
                label="Date"
                onChange={e => handleChange(e, "date")}
                /> 
                </LocalizationProvider>
                
            </Grid>
        
            
            <Grid item xs={8} margin={2}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Account</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                margin="normal"
                onChange={e => handleChange(e,"category")}
                value={formData.category}

            >
                <MenuItem value='default'></MenuItem>

                {accounts?.sort((a,b) => a.type - b.type).map(acc => {
                return (
                    <MenuItem value={acc.id}>{acc.num} - {acc.name} ({acc.type})</MenuItem>
                )
                })}
            
            </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4} margin={2}>
                <TextField
                autoFocus
                id="inflow"
                label="Inflow"
                type="number"
                variant="outlined"
                margin="normal"
                onChange={e => handleChange(e,"inflow")}
                value={formData.inflow}
                />
            </Grid>
            <Grid item xs={4} margin={2}>
                <TextField
                autoFocus
                id="outflow"
                label="Outflow"
                type="number"
                variant="outlined"
                margin="normal"
                onChange={e => handleChange(e,"outflow")}
                value={formData.outflow}
                />
            </Grid>
            <Grid item xs={4} margin={2}>
                <TextField
                autoFocus
                id="notes"
                label="Notes"
                type="text"
                variant="outlined"
                margin="normal"
                onChange={e => handleChange(e,"notes")}
                value={formData.notes}
                multiline
                maxRows={4}
                />
            </Grid>
            {/* <Grid item xs={4}>
                <FormControlLabel 
            control={<Checkbox checked={formData.inBankFeed} onChange={e => handleChange(e, "inBankFeed")} inputProps={{ 'aria-label': 'controlled' }}/>} 
            label="Appear in Bank Feed" />
            </Grid> */}
            
        </Grid>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleTransactionPut} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
