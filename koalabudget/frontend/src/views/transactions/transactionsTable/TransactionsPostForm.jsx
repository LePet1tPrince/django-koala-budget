import react, { useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import { postAccount } from '../../global/apiRequests/account';
import SimpleSnackbar from '../../global/SimpleSnackbar';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers';
import { TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { postTransaction } from '../../global/apiRequests/transaction';
import useSnackbar from '../../global/apiRequests/useSnackbar';


const formInputIntialState = {
          date:dayjs(new Date()),
          category : 'default',
          inflow : '',
          outflow : '',
          notes : ''
        }; 


export default function TransactionsPostForm(props) {
const {setAccounts, accounts, activeAccountId, setTransactions} = props;
const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(formInputIntialState);
  const activeAccount = accounts?.filter(acc => acc.id === activeAccountId)[0]

  // const [snackbarData, setSnackbarData] = useState({
  //   isOpen: false,
  //   severity: 'info',
  //   message: ''
  // })

  console.log("Form Data", JSON.stringify(formData))
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

  async function submitPost(data) {
    const response = await postTransaction(data);
    if (response.status === 201) {
      openSnackbar("Post Successful", 'success')
    //   setSnackbarData({
    //     message: "Post Successful",
    //     severity: 'success',
    //     isOpen: true
    // })
      setFormData(formInputIntialState)
      const responsejson = await response.json()
      console.log("success", JSON.stringify(responsejson))
      setTransactions(prev => [...prev, responsejson])

  } else {
    openSnackbar("Error " + response.status + ' - ' + response.statusText, 'error')
      //   setSnackbarData({
      //   message: "Error " + response.status + ' - ' + response.statusText,
      //   severity: 'error',
      //   isOpen: true
      // })

  }}


  //translates the form into proper api post form.
  async function handleTransactionPost() {
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
    // setSnackbarData({
    //   message: "Error Posting Transaction",
    //   severity: 'error',
    //   isOpen: true
    // })
   
  }
  }




  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{margin: "10px"}}>
        + Add new Transaction
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
            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
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
          <Button onClick={handleTransactionPost} variant="contained">Create Transaction</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
