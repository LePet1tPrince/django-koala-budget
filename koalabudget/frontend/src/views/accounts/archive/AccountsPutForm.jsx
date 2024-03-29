import react, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import TextField from '@mui/material/TextField';
import { ifDebug } from '../../global/functions/LocalStorageFunctions';
import { putAccount } from '../../global/apiRequests/account';
import useSnackbar from '../../global/customHooks/useSnackbar';

const accountTypes = [
    {value:''},
    {value:'Asset'},
    {value:'Liability'},
    {value:'Income'},
    {value: 'Expense'}
]

export default function AccountsPutForm({accounts, setAccounts, selectedAccountId}) {
  const initialFormData = {
    name: '',
    num: '',
    type: accountTypes[0].value,
    inBankFeed: false
  }
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()


  const selectedAccount = accounts?.filter(acc => acc.id === selectedAccountId[0])[0];


  
  
  useEffect(() => {
    ifDebug(() => console.log("selected Account", JSON.stringify(selectedAccount)))
    
    if (selectedAccountId.length === 1) {

        setFormData({
            "name": selectedAccount.name,
            "num": selectedAccount.num,
            "type": selectedAccount.type,
            "inBankFeed": selectedAccount.inBankFeed
            
        })
    } else {
        setFormData(initialFormData)
    }
  },[selectedAccountId, accounts])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(event, field) {
    const updatedFormData = { ...formData };
    if (field === "inBankFeed") {
        updatedFormData[field] = event.target.checked;
        setFormData(updatedFormData);

    } else {
        updatedFormData[field] = event.target.value;
        setFormData(updatedFormData);

    }

  }

  async function handleSubmit() {
    const response = await putAccount(formData, selectedAccountId[0]);
    if (response.status === 200) {
      openSnackbar("Update Successful", 'success')
  
        setFormData(initialFormData)
        const responsejson = await response.json()
        setAccounts([...accounts, responsejson])
        setOpen(false);

        ifDebug(() => console.log("success", responsejson))

    } else {
      openSnackbar("Error " + response.status + ' - ' + response.statusText, 'error')
    

    }
    ifDebug(() => console.log("formdata: ", JSON.stringify(formData)))
    ifDebug(() => console.log("response: ", response))

  }



  return (
    <div>
      <Button 
      variant="outlined" 
      onClick={handleClickOpen} 
      sx={{margin: "10px"}}
      disabled={selectedAccountId.length !== 1}>
        <EditIcon/> Edit Account
      </Button>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create A New Account</DialogTitle>
        <DialogContent>
        
          <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField
                autoFocus
                id="name"
                label="Account Name"
                type="text"
                variant="outlined"
                margin="normal"
                onChange={e => handleChange(e,"name")}
                value={formData.name}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                autoFocus
                id="number"
                label="Account Number"
                type="number"
                variant="outlined"
                margin="normal"
                onChange={e => handleChange(e,"num")}
                value={formData.num}
                />
            </Grid>
            
            <Grid item xs={8}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Account Type"
                margin="normal"
                onChange={e => handleChange(e,"type")}
                value={formData.type}

            >
                {accountTypes.map(acc => {
                return (
                    <MenuItem value={acc.value}>{acc.value}</MenuItem>
                )
                })}
            
            </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel 
            control={<Checkbox checked={formData.inBankFeed} onChange={e => handleChange(e, "inBankFeed")} inputProps={{ 'aria-label': 'controlled' }}/>} 
            label="Appear in Bank Feed" />
            </Grid>
            
        </Grid>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
