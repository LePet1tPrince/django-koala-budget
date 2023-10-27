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
import useSnackbar from '../../global/customHooks/useSnackbar';

export default function AccountForm(props) {
    const {setAccounts, accounts, formData, setFormData, open, toggleOpen, accountTypes, handleSubmit, formTitle} = props;

  
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

  



  return (
    <div>
      

      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>{formTitle}</DialogTitle>
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
          <Button onClick={toggleOpen} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
          {/* <Button onClick={handleSubmit} variant="contained">Submit & Add Another</Button> */}

        </DialogActions>
      </Dialog>
    </div>
  );
}
