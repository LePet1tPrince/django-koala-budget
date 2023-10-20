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
import dayjs from 'dayjs';
import { postAccount } from '../../global/apiRequests/account';
import { postTransaction } from '../../global/apiRequests/transaction';
import { sortAccounts } from '../../global/functions/AccountsFunctions';
import useSnackbar from '../../global/customHooks/useSnackbar';
import useTransactionForm from './useTransactionForm';

export default function TransactionForm(props) {
const {accounts, activeAccountId, formData, setFormData, open, toggleOpen, handleSubmit, action} = props;
// const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()
  
  // const [formData, setFormData] = useState(formInputIntialState);
  // const [formData, setFormData, open, toggleOpen] = useTransactionForm(formInputIntialState);

  const activeAccount = accounts?.filter(acc => acc.id === activeAccountId)[0]

  let selectAccountsList = []
  sortAccounts(accounts)?.map((currentValue,index,array) => {
    const previousValue = array[index-1]
    if (index !== 0 && previousValue.type === currentValue.type) {
      selectAccountsList.push(currentValue)

      
    } else {
      selectAccountsList.push(currentValue)
      selectAccountsList.push(currentValue)
    }
  })

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

  


  return (
    <div>
      <Button variant="outlined" onClick={toggleOpen} sx={{margin: "10px"}}>
        + Add new Transaction
      </Button>
      {/* {JSON.stringify(myList)} */}
      {/* <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} /> */}

      <Dialog open={open} onClose={toggleOpen}>
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
                // margin="normal"
                onChange={e => handleChange(e,"category")}
                value={formData.category}

            >
                <MenuItem value='default'></MenuItem>

                <MenuItem label='None' value="" />


                {selectAccountsList.map((currentValue,index,array) => {
                  const previousValue = array[index-1]
                  if (index !== 0 && previousValue.type === currentValue.type) {
                    return (
                        <MenuItem key={currentValue.id} value={currentValue.id}>{currentValue.num} - {currentValue.name} </MenuItem>

                    )
                  } else {
                    return ( <div>
                        <ListSubheader key={currentValue.type}>{currentValue.type}</ListSubheader>

                    </div>)
                  }
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
          <Button onClick={toggleOpen} variant="outlined">Cancel</Button>
          <Button onClick={() => handleSubmit(formData)} variant="contained">{action} Transaction</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
