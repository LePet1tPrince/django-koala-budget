import * as React from 'react';
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
import { postAccount } from '../global/apiRequests/account';
import SimpleSnackbar from '../global/SimpleSnackbar';
import Checkbox from '@mui/material/Checkbox';




const accountTypes = [
    {value:''},
    {value:'Asset'},
    {value:'Liability'},
    {value:'Income'},
    {value: 'Expense'}
]

export default function AccountsPostForm(props) {
  const {title} = props;
  const initialFormData = {
    name: '',
    num: '',
    type: accountTypes[0].value,
    inBankFeed: false
  }
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(initialFormData);

  const [snackbarData, setSnackbarData] = React.useState({
    isOpen: false,
    severity: 'info',
    message: ''
  })

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
    console.log(updatedFormData)

  }

  async function handleSubmit() {
    const response = await postAccount(formData);
    if (response.status === 201) {
        setSnackbarData({
          message: "Post Successful",
          severity: 'success',
          isOpen: true
      })
        setFormData(initialFormData)
        console.log("success")

    } else {
          setSnackbarData({
          message: "Error " + response.status + ' - ' + response.statusText,
          severity: 'error',
          isOpen: true
        })

    }
    console.log("formdata: ", JSON.stringify(formData))
    console.log("response: ", response)


  }



  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        + Add new Account
      </Button>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
        <Box>
          <TextField
            autoFocus
            id="name"
            label="Account Name"
            type="text"
            variant="standard"
            margin="normal"
            onChange={e => handleChange(e,"name")}
            value={formData.name}
          />
          <TextField
            autoFocus
            id="number"
            label="Account Number"
            type="number"
            variant="standard"
            margin="normal"
            onChange={e => handleChange(e,"num")}
            value={formData.num}


          />

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
        </Box>
        <FormControlLabel 
        control={<Checkbox checked={formData.inBankFeed} onChange={e => handleChange(e, "inBankFeed")} inputProps={{ 'aria-label': 'controlled' }}/>} 
         label="Appear in Bank Feed" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Account</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
