import * as React from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import TextField from '@mui/material/TextField';
import { ifDebug } from '../../global/functions/LocalStorageFunctions';
import { postAccount } from '../../global/apiRequests/account';
import useSnackbar from '../../global/customHooks/useSnackbar';

const accountTypes = [
    {value:''},
    {value:'Asset'},
    {value:'Liability'},
    {value:'Income'},
    {value: 'Expense'}
]

export default function AccountsPostForm({setAccounts, accounts}) {
  const initialFormData = {
    name: '',
    num: '',
    type: accountTypes[0].value,
    inBankFeed: false
  }
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(initialFormData);
  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()




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

    ifDebug(() => console.log(updatedFormData))

  }

  async function handleSubmit() {
    const response = await postAccount(formData);
    if (response.status === 201) {
      openSnackbar("Post Successful",'success')
      
        setFormData(initialFormData)
        const responsejson = await response.json()
        setAccounts([...accounts, responsejson])
        setOpen(false);

    } else {
      openSnackbar("Error " + response.status + ' - ' + response.statusText,'error')

    }
    ifDebug(() => {
      console.log("formdata: ", JSON.stringify(formData))
      console.log("response: ", response)

    })


  }



  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{margin: "10px"}}>
        + Add new Account
      </Button>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create A New Account</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
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
          <Button onClick={handleSubmit} variant="contained">Create Account</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
